# LabXR.art — Technical Architecture

## Overview

LabXR.art uses a **static-first, islands-based architecture** optimized for performance, maintainability, and progressive enhancement.

## Core Framework: Astro

**Why Astro?**

- **Zero JavaScript by default** — Pages load instantly without client-side hydration overhead
- **Islands architecture** — Interactive components hydrate only where needed
- **Multi-framework support** — React, Vue, Svelte in the same project
- **Built-in optimizations** — Image optimization, asset hashing, code splitting
- **TypeScript-first** — Strict mode enabled by default

**Astro Configuration:**

- Output mode: `static` (pre-rendered HTML)
- Site URL: `https://labxr.art`
- Trailing slash: `never`
- Build output: `dist/`

## UI Islands: React 18

**Why React for islands?**

- Component ecosystem maturity
- Three.js integration via @react-three/fiber
- Familiar mental model for team
- Strong TypeScript support

**When to use React:**

- Interactive components requiring state
- WebGL/Three.js canvases
- Complex event handlers
- Portfolio modal with video playback

**When NOT to use React:**

- Static content sections
- Typography and layout
- Simple hover effects (use CSS)

**Hydration directives:**

- `client:visible` — Hydrate when component enters viewport (preferred)
- `client:idle` — Hydrate after main thread is idle
- `client:only="react"` — Skip SSR, client-only rendering (for WebGL)
- `client:load` — Hydrate immediately (avoid unless critical)

## Styling: Tailwind CSS

**Why Tailwind?**

- Utility-first for rapid development
- Mobile-first responsive design
- PurgeCSS for minimal bundle size
- Consistent design tokens via config

**Tailwind Configuration:**

- Content paths: `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`
- Custom theme extensions via `tailwind.config.mjs`
- CSS variables for dynamic theming

**Mobile-First Approach:**

```astro
<!-- Base styles for mobile -->
<div class="text-sm md:text-base lg:text-xl">
  <!-- Responsive breakpoints -->
</div>
```

## Theme System

The site uses a **CSS Variable-based theme system with runtime switching** (Phase 5.61).

**Architecture:**

- `src/styles/themes/` — Directory containing 8 theme files
- `src/styles/themes/cinematic-dark.css` — Default theme (active on first paint)
- `src/styles/themes/{minimal-mono,neo-brutalist,glassmorphism}.css` — Original 4 themes
- `src/styles/themes/gradient-{frosted,sunset,aurora,neon}-glass.css` — 4 gradient themes
- `src/layouts/BaseLayout.astro` — Loads all 8 themes via `@import`; inline FOUC-prevention `<script is:inline>`; `<html class="theme-cinematic">` default
- `src/components/islands/theme-switcher.tsx` — React island for runtime switching
- `src/styles/global.css` — shadcn bridge layer (no theme import)

**How it works:**

1. Each theme file defines the same CSS variables under `html.theme-[name]` selector
2. `BaseLayout.astro` imports all 8 themes in the frontmatter
3. The inline `<script is:inline>` in `<head>` reads `localStorage['labxr-theme']` and sets `document.documentElement.className` synchronously before paint
4. The `ThemeSwitcher` island (`client:idle`) writes the chosen theme class on click and persists to `localStorage`
5. `tailwind.config.mjs` reads CSS variables via `var(...)` — no theme-specific config needed
6. shadcn bridge layer in `global.css` maps LabXR tokens to shadcn standard names via the `:root` cascade (`--background: var(--color-bg-primary)`)
7. Each theme may define `--color-bg-gradient` for an optional CSS gradient on the body

**Theme IDs (for `className`):** `theme-cinematic`, `theme-minimal`, `theme-brutalist`, `theme-glass`, `theme-frosted`, `theme-sunset`, `theme-aurora`, `theme-neon`

**Why class-based (not `:root`)?** All themes can coexist in the same bundle. Class scoping avoids specificity conflicts; the active theme is whichever class matches `document.documentElement.className`.

---

## Multi-Page Routing (Phase 5.61)

**Why discipline pages?**

- SEO: Each discipline (XR, UX, Dev, etc.) becomes a first-class landing page
- Contextual entry: Agencies can deep-link from search engines or social shares
- Content organization: Forces explicit discipline tagging in content collections

**Architecture:**

- `src/pages/discipline/[slug].astro` — Dynamic route with `getStaticPaths()` returning 7 slugs
- `src/content.config.ts` — Adds `disciplines: z.array(z.enum(DISCIPLINES))` to `case-studies` and `services` schemas
- `src/lib/disciplines.ts` — Discipline constants + labels + descriptions (separate from `content.config.ts` to avoid `astro:content` client-side imports)
- `src/components/sections/discipline-hero.astro` — Reusable hero for discipline pages
- `src/components/sections/portfolio.astro` + `services.astro` — Accept optional `data` prop for filtered rendering

**Navigation:** Astro-native `<details>` dropdown for desktop; React state accordion for mobile. Links to all 7 discipline pages.

**SEO:** Each discipline has unique `<title>`, `<meta description>`, hero copy, and filtered content (no duplicate-content penalty).

**Background Architecture:**

The theme system separates solid and gradient backgrounds into two distinct variables:

- `--color-bg-primary` — Solid color (used by components, shadcn bridge, Tailwind classes)
- `--color-bg-gradient` — **Optional** CSS gradient applied to `body` via `background-image`

In `global.css`:

```css
body {
  background-color: var(--color-bg-primary);  /* solid fallback always present */
  background-image: var(--color-bg-gradient); /* gradient overlay if theme defines one */
}
```

This design ensures:
- Components keep using solid colors (no breaking changes)
- Body gets a gradient overlay for visual depth
- Themes without `--color-bg-gradient` work as solid colors only
- GPU-accelerated rendering, no JS overhead
- Static gradients only (no `background-attachment: fixed` for iOS Safari compatibility)

**Adding a new theme:**

1. Copy any existing theme file
2. Modify the CSS variable values
3. Optionally define `--color-bg-gradient` for a gradient background
4. Update the import in `global.css`

See `src/styles/themes/README.md` for the complete guide and `docs/phase-5.6-report.md` for implementation details.

---

## Future UI Primitives: shadcn/ui

**Why shadcn/ui?**

- Copy-paste components (no dependency lock-in)
- Built on Radix UI (accessible primitives)
- Tailwind-native styling
- Customizable via CSS variables

**When to add shadcn:**

- Phase 2: Design system initialization
- Components needed: Button, Input, Dialog, Form, Card

**Customization strategy:**

- Extend Tailwind theme in `tailwind.config.mjs`
- Define CSS variables in `src/styles/global.css`
- Dark cinematic theme by default

## 3D Graphics: Three.js (Planned)

**Why Three.js?**

- Industry standard for WebGL
- React integration via @react-three/fiber
- Helper utilities via @react-three/drei
- Strong community and documentation

**When to use Three.js:**

- Hero section interactive experience
- Portfolio piece 3D previews
- Product configurators
- Particle systems

**Performance considerations:**

- Check device capabilities before rendering
- Mobile fallback to static images
- Limit particle counts on mobile
- Use custom shaders instead of heavy materials
- ALWAYS dispose geometries, materials, textures on unmount

**Memory management:**

```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

## Animation: GreenSock GSAP (Planned)

**Why GSAP?**

- Industry-standard animation library
- ScrollTrigger for scroll-based animations
- Performance-optimized (animates transform/opacity only)
- Reduced motion support

**When to use GSAP:**

- Scroll-triggered section reveals
- Parallax effects
- Complex timeline sequences
- Text animations

**Rules:**

- ALWAYS check `prefers-reduced-motion`
- Animate only `transform` and `opacity`
- Never animate `top`, `left`, `width`, `height`
- Kill ScrollTriggers on unmount

**Reduced motion support:**

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations, show content immediately
}
```

## Infrastructure: Cloudflare

### Cloudflare Pages

**Why Pages?**

- Free tier sufficient for launch
- Global edge network (fast worldwide)
- Automatic HTTPS
- Preview deployments for PRs
- Zero-config deployment from Git

**Configuration:**

- Project name: `labxr-web`
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20

### Cloudflare R2

**Why R2?**

- No egress fees (critical for video delivery)
- S3-compatible API
- Global CDN delivery
- Public bucket option for assets

**Bucket structure:**

```
labxr-assets/
├── videos/
│   ├── posters/
│   └── [video files]
├── images/
│   ├── og/
│   ├── team/
│   └── case-studies/
└── [other assets]
```

**CDN subdomain:** `cdn.labxr.art`

**Cache control:**

- Videos: `Cache-Control: public, max-age=31536000, immutable`
- Images: `Cache-Control: public, max-age=2592000`
- Posters: `Cache-Control: public, max-age=86400`

### Cloudflare Workers (Planned)

**Why Workers?**

- Serverless functions at the edge
- No cold starts
- Integrated with Pages and R2
- Pay-per-request pricing

**Use cases:**

- Contact form handler
- Turnstile validation
- Discord/email webhook delivery
- Rate limiting
- Future API endpoints

## Environment Variables

**Public variables (browser-accessible):**

- Prefixed with `PUBLIC_`
- Examples: `PUBLIC_SITE_URL`, `PUBLIC_CDN_URL`

**Private variables (server-only):**

- No `PUBLIC_` prefix
- Examples: `CLOUDFLARE_API_TOKEN`, `R2_SECRET_ACCESS_KEY`
- Never committed to Git
- Stored in Cloudflare Pages dashboard for production

## Deployment Strategy

**Development:**

```bash
npm run dev
```

Local server at `http://localhost:4321`

**Production:**

1. Push to `main` branch
2. Cloudflare Pages auto-deploys
3. Preview deployments for PRs
4. Custom domain: `labxr.art`

**Build process:**

```bash
npm run build
```

Outputs static HTML/CSS/JS to `dist/`

## File Organization

```
src/
├── assets/          # Images, videos, shaders
├── components/
│   ├── islands/     # Interactive React components
│   ├── sections/    # Astro page sections
│   ├── shared/      # Reusable presentational components
│   └── ui/          # shadcn/ui components
├── config/          # Configuration files
├── layouts/         # Page layouts
├── lib/             # Utilities and helpers
├── pages/           # Astro pages (routes)
└── styles/          # Global styles
```

## Path Aliases

TypeScript path aliases for clean imports:

```typescript
import { Button } from '@components/ui/button';
import { siteConfig } from '@config/site';
import { formatDate } from '@lib/date';
```

Aliases defined in `tsconfig.json`.

## Performance Budgets

**Targets:**

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 3s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Total bundle size: < 200KB (initial)

**Strategies:**

- Lazy-load videos with IntersectionObserver
- Optimize images with Astro's `<Image />` component
- Code-split React islands
- Preload critical assets
- Use `font-display: swap` for web fonts

## Accessibility

**Standards:**

- WCAG 2.1 AA compliance
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- Keyboard navigation support
- Focus trapping in modals
- ARIA labels where needed
- Reduced motion support

**Testing:**

- Lighthouse accessibility audit
- Keyboard-only navigation test
- Screen reader testing (VoiceOver, NVDA)
- Color contrast checker

## Security

**Practices:**

- No secrets in Git
- Environment variables for sensitive data
- Content Security Policy headers
- HTTPS-only in production
- Subresource Integrity for CDN assets

**Headers (planned):**

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Strict-Transport-Security`

## Monitoring (Future)

**Planned:**

- Cloudflare Analytics
- Lighthouse CI for performance regression
- Error tracking (Sentry or similar)
- Uptime monitoring

## Decision Log

See `docs/decision-log.md` for architecture decisions and rationale.

---

**Last updated:** 2026-08-17
