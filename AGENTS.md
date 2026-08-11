# LabXR.art - AI Agent System Rules

## 1. Project Context

LabXR.art is a B2B portfolio site for a creative technology lab in CDMX. It bridges "Code and Cinema," offering white-label interactive installations and WebGL experiences to top-tier agencies. The site itself must serve as a technical demonstration of high-performance media delivery.

## 2. Core Tech Stack

- **Framework:** Astro 4+ (TypeScript Strict)
- **UI Islands:** React 18 (for interactive components)
- **Styling:** Tailwind CSS (Mobile-First) + CSS Variables
- **Components:** shadcn/ui (New York style, customized for dark cinematic theme)
- **3D:** Three.js via @react-three/fiber (R3F) & @react-three/drei
- **Animation:** GreenSock (GSAP) + ScrollTrigger
- **State:** Nano Stores (for cross-framework state) or React Context (inside islands)
- **Infrastructure:** Cloudflare Pages, Cloudflare R2 (Video CDN), Cloudflare Workers (Forms)

## 3. Architectural Rules (Astro & React)

- **Zero JS by Default:** Use `.astro` components for all layout, typography, and static structure.
- **Islands Architecture:** Only use React (`.tsx`) for components requiring state, event listeners, or WebGL.
- **Hydration Directives:** Never use `client:load` unless absolutely critical for above-the-fold interactivity. Prefer `client:visible` or `client:idle` for below-the-fold components to save main-thread resources.
- **No SSR for Heavy Logic:** Three.js and complex media players must use `client:only="react"` or be dynamically imported on the client side to prevent SSR crashes (e.g., `window is not defined`).

## 4. Styling & UI Rules (Tailwind & shadcn)

- **Mobile-First Mandate:** Write base CSS for mobile. Use `md:`, `lg:`, and `xl:` breakpoints for desktop enhancements.
- **Dark Theme Default:** The site is inherently dark and cinematic. Ensure contrast ratios meet WCAG AA standards.
- **shadcn/ui Integration:** Use shadcn components for forms, buttons, and modals. Customize them via `tailwind.config.js` and global CSS variables, do not hardcode colors.
- **No Layout Shift (CLS):** All images, videos, and canvases MUST have explicit aspect ratios or dimensions reserved in the DOM before loading.

## 5. Media & Video Rules (Cloudflare R2)

- **Lazy Loading:** Videos must never load immediately. Use `IntersectionObserver` to load the `src` only when entering the viewport.
- **iOS Safari Restrictions:** NEVER rely on `autoplay` for mobile. Always provide a poster image and a tap-to-play fallback. Use `playsinline` and `muted` attributes for desktop backgrounds.
- **Memory Management:** When a video leaves the viewport or a modal closes, pause the video and remove the `src` attribute to free up browser memory.

## 6. WebGL & Three.js Rules

- **Mobile Fallback:** Check device capabilities before rendering WebGL. If the device is mobile or lacks WebGL2 support, render a static optimized image or CSS fallback instead of the Canvas.
- **Performance:** Limit particle counts on mobile. Use custom shaders instead of heavy standard materials when possible.
- **Memory Leaks:** ALWAYS dispose of geometries, materials, and textures when a React component unmounts. Use `useEffect` cleanup functions rigorously.

## 7. Animation Rules (GSAP)

- **Reduced Motion:** ALL GSAP animations must check `prefers-reduced-motion`. If enabled, disable animations and show content immediately.
- **Performance:** Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`. Use `will-change` sparingly.
- **ScrollTrigger:** Ensure ScrollTriggers are properly killed/cleaned up on route changes or component unmounts to prevent ghost animations.

## 8. Accessibility & Edge Cases

- **Semantic HTML:** Use proper `<header>`, `<main>`, `<section>`, and `<footer>` tags.
- **Focus Trapping:** Modals (shadcn Dialog) must trap focus and close on the `Escape` key.
- **Error Boundaries:** Wrap React Islands in Error Boundaries. If a 3D canvas fails to load, the rest of the page must still function.
