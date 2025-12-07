const defaultFishColor = "#84A332";
const defaultLightFishColor = "#C0F381";
const defaultWidth = 100;
const defaultHeight = 100;

const fishColorProperty = "--fish-color";
const lightColorProperty = "--light-color";
const widthProperty = "--fish-width";
const heightProperty = "--fish-height";

export const fishDefaultSize = {
  width: defaultWidth,
  height: defaultHeight,
};

interface fishProps {
  defaultColor: string;
  lightColor: string;
  width: number;
}

export const createFishElement = ({
  defaultColor,
  lightColor,
  width,
}: fishProps) => {
  const fish = document.createElement("fish");

  fish.innerHTML = fishSvgHTML;

  const filters = [
    "url(#fish_blur)",
    "url(#fish_shadow)",
    "url(#fish_glow_shadow)",
  ];

  Object.assign(fish.style, {
    position: "absolute",
    overflow: "hidden",
    top: "0",
    left: "0",
    display: "inline-block",
    isolation: "isolate",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    opacity: "0.001",
    transformOrigin: `50% 50%`,
    willChange: "transform",
    filter: filters.join(" "),
  });

  fish.style.setProperty(fishColorProperty, defaultColor);
  fish.style.setProperty(lightColorProperty, lightColor);
  fish.style.setProperty(widthProperty, width + "px");
  fish.style.setProperty(heightProperty, (width * 600) / 200 + "px");

  return fish;
};

export const fishSvgHTML = `
<svg
 style="width: var(${widthProperty}); height: var(${heightProperty});"
  viewBox="-51.2 -51.2 614.40 614.40"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill="var(${fishColorProperty}, ${defaultFishColor})"
      stroke="var(${lightColorProperty}, ${defaultLightFishColor})"
      stroke-width="32"
      stroke-linejoin="round"
      d="M240,152c-50.71,12.21-94.15,52.31-120.3,73.43a261.14,261.14,0,0,0-23.81-19.58C59.53,179.29,16,176,16,176s11.37,51.53,41.36,79.83C27.37,284.14,16,335.67,16,335.67s43.53-3.29,79.89-29.85a259.18,259.18,0,0,0,23.61-19.41C145.6,307.55,189.24,347.75,240,360l-16,56c39.43-6.67,78.86-35.51,94.72-48.25C448,362,496,279,496,256c0-22-48-106-176.89-111.73C303.52,131.78,263.76,102.72,224,96Z"
    ></path>
    <circle
      cx="416"
      cy="239.99"
      r="16"
      fill="var(${lightColorProperty}, ${defaultLightFishColor})"
    ></circle>
    <path
      fill="none"
      stroke="var(${lightColorProperty}, ${defaultLightFishColor})"
      stroke-width="32"
      stroke-linecap="round"
      stroke-miterlimit="20"
      d="M378.37,356a199.22,199.22,0,0,1,0-200"
    ></path>
  </g>
</svg>
`;

export const svgFiltersHtml = `
<svg style="display:none;">
  <defs>
    <!-- Subtle blur for soft edges -->
    <filter id="fish_blur" x="-1%" y="-1%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.15" />
    </filter>

    <!-- Soft drop shadow for depth -->
    <filter id="fish_shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)" />
    </filter>

    <!-- Radial gradient highlight for shiny effect -->
    <radialGradient id="fish_highlight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.5" />
      <stop offset="100%" stop-color="white" stop-opacity="0" />
    </radialGradient>

    <!-- Optional: combine shadow + blur into one filter -->
    <filter id="fish_glow_shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
      <feOffset dx="1" dy="1" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>
`;
