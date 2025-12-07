# 🐟 fishAttack

A lightweight, dependency-free Web Animations API effect that sends a swarm of colorful animated fish swimming across the screen.  
Perfect for celebrations, easter eggs, loading screens, or surprising your coworkers.

---

## ✨ Features

- 🐠 SVG fish with smooth swimming animation
- 🎨 Multiple vibrant color palettes
- 🎞️ Powered by the Web Animations API — no canvas required
- 📦 Zero dependencies & tiny bundle size
- 🌈 Randomized depth, size, movement, tilt, and direction
- ⚡ Works in any modern framework (React, Vue, Svelte, Vanilla JS)
- ♻️ Supports continuous looping

---

## 📦 Installation

```bash
npm install fishattack
```

## 🖱️ Example: Triggering `fishAttack()` With a Button

You can easily hook fishAttack into a button click:

```html
<button id="fish-btn">Release the Fish 🐟</button>

<script type="module">
  import { fishAttack } from "fishattack";

  document.getElementById("fish-btn").addEventListener("click", () => {
    fishAttack();
  });
</script>

---
```
