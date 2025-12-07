import {
  fishDefaultSize,
  createFishElement,
  svgFiltersHtml,
} from "./fishSvg.ts";

const easings = ["cubic-bezier(0.22, 1, 0.36, 1)"];

const colorPairs = [
  // yellow
  ["#ffec37ee", "#f8b13dff"],
  // red
  ["#f89640ee", "#c03940ff"],
  // blue
  ["#3bc0f0ee", "#0075bcff"],
  // green
  ["#b0cb47ee", "#3d954bff"],
  // purple
  ["#cf85b8ee", "#a3509dff"],
  // orange
  ["#ff9f43ee", "#ff6f00ff"],
  // pink
  ["#ff6ebbee", "#d81b60ff"],
  // teal
  ["#3ad1c3ee", "#00796bff"],
  // lime
  ["#d4e157ee", "#afb42bff"],
  // magenta
  ["#f062c0ee", "#8e24aaff"],
];

interface fishAnimationProps {
  fish: HTMLElement;
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  zIndex: number;
}

function createFishAnimation({
  fish,
  x,
  y,
  z,
  targetX,
  targetY,
  targetZ,
  zIndex,
}: fishAnimationProps) {
  const getAnimation = () => {
    const tiltAngle = 15; // max rotation in degrees
    const tiltDirection = Math.random() > 0.5 ? 1 : -1; // random tilt direction
    const direction = targetX < x ? -1 : 1; // -1 = left, 1 = right

    return fish.animate(
      [
        {
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotate3d(0, 0, 1, ${
            tiltDirection * -tiltAngle
          }deg)
          scaleX(${direction})`,
          opacity: 1,
        },

        {
          transform: `translate(-50%, -50%) translate3d(${targetX}px, ${
            y + (Math.random() - 0.5) * 500
          }px, ${z}px) rotate3d(0, 0, 1, ${tiltDirection * tiltAngle}deg)
          scaleX(${direction})`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(-50%, -50%) translate3d(${targetX}px, ${targetY}px, ${z}px) rotate3d(0, 0, 1, ${
            tiltDirection * -tiltAngle
          }deg)
          scaleX(${direction})`,
          opacity: 1,
        },
      ],
      {
        duration: (Math.random() * 1000 + 5000) * 5,
        easing: easings[Math.floor(Math.random() * easings.length)],
        delay: zIndex * 200,
      }
    );
  };

  return { fish, getAnimation };
}

export function fishAttack(): Promise<void> {
  return new Promise((resolve) => {
    const fishContainer = document.createElement("fishAnimation");

    Object.assign(fishContainer.style, {
      overflow: "hidden",
      position: "fixed",
      inset: "0",
      zIndex: "999",
      display: "inline-block",
      pointerEvents: "none",
    });

    document.documentElement.appendChild(fishContainer);

    const sceneSize = { width: window.innerWidth, height: window.innerHeight };
    const fishWidth = fishDefaultSize.width;

    let amount = Math.max(7, Math.round(window.innerWidth / (fishWidth / 2)));
    // make max dist depend on number of fish and their size for realistic effect
    // we dont want them to be too separated or too squeezed together
    const maxDist = Math.max((amount * fishWidth) / 2, (fishWidth / 2) * 1);

    type fishPosition = {
      x: number;
      y: number;
      z: number;
      targetX: number;
      targetY: number;
      targetZ: number;
    };

    let fishPositions: fishPosition[] = [];

    for (let i = 0; i < amount; i++) {
      // Randomly choose left or right side
      const startSide = Math.random() > 0.5 ? "left" : "right";
      const offScreenStart = 100;
      const offscreenEnd = 100;

      let x: number;
      let targetX: number;

      if (startSide === "left") {
        x = -offScreenStart; // start offscreen left
        targetX = sceneSize.width + offscreenEnd; // end offscreen right
      } else {
        x = sceneSize.width + offScreenStart; // start offscreen right
        targetX = -offscreenEnd; // end offscreen left
      }

      const y = Math.round(Math.random() * sceneSize.height);

      const z = Math.round(-1 * (Math.random() * maxDist));

      const targetY = Math.round(Math.random() * sceneSize.height);

      // fish don't move in the Z direction
      const targetZ = z;

      fishPositions.push({
        x,
        y,
        z,
        targetX,
        targetY,
        targetZ,
      });
    }

    fishPositions = fishPositions.sort((a, b) => a.z - b.z);
    const closestFishPosition = fishPositions[fishPositions.length - 1];

    fishPositions = fishPositions.map((pos) => ({
      ...pos,
      z: pos.z - closestFishPosition.z,
      targetZ: pos.z - closestFishPosition.z,
    }));

    const filtersElement = document.createElement("div");
    filtersElement.innerHTML = svgFiltersHtml;
    fishContainer.appendChild(filtersElement);

    let currentZIndex = 1;

    const animations = fishPositions.map((pos, index) => {
      const colorPair = colorPairs[index % colorPairs.length];

      const minWidth = fishWidth * 0.5; // half of default width
      const maxWidth = fishWidth * 1.5; // 1.5x default width
      const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;

      const fish = createFishElement({
        defaultColor: colorPair[1],
        lightColor: colorPair[0],
        width: randomWidth,
      });
      fishContainer.appendChild(fish);

      return createFishAnimation({
        fish,
        ...pos,
        zIndex: currentZIndex++,
      });
    });

    // Wait a bit for the fish  prerender
    requestAnimationFrame(() => {
      const animationPromises = animations.map(({ fish, getAnimation }) => {
        const a = getAnimation();
        return a.finished.then(() => {
          fish.remove();
        });
      });

      Promise.all(animationPromises).then(() => {
        fishContainer.remove();
        resolve();
      });
    });
  });
}
