# Decision Log

This document records architectural and technical decisions for the LabXR.art project.

---

## Decision 001: Use Astro as the base framework

**Date:** 2026-08-11  
**Status:** Accepted

### Context

LabXR.art requires a fast, SEO-friendly portfolio site with interactive components. The site must serve as a technical demonstration of high-performance media delivery.

### Decision

Use Astro 4+ as the base framework with static site generation.

### Rationale

- **Zero JavaScript by default** — Pages load instantly without client-side hydration overhead
- **Islands architecture** — Interactive components hydrate only where needed
- **Multi-framework support** — Can use React, Vue, or Svelte for specific components
- **Built-in optimizations** — Image optimization, asset hashing, code splitting out of the box
- **TypeScript-first** — Strict mode enabled by default
- **Static output** — Pre-rendered HTML for maximum performance and SEO

### Consequences

**Positive:**

- Excellent performance scores (Lighthouse 95+)
- SEO-friendly static HTML
- Reduced hosting costs (static files on CDN)
- Clear separation between static and interactive content

**Negative:**

- Cannot use server-side rendering for dynamic content (not needed for this project)
- Learning curve for team unfamiliar with Astro (minimal, similar to other SSGs)

---

## Decision 002: Use React islands for interactivity

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The site requires interactive components: video players, portfolio modals, contact forms, and WebGL canvases.

### Decision

Use React 18 for interactive islands, hydrated only where needed.

### Rationale

- **Component ecosystem maturity** — Largest ecosystem for UI components
- **Three.js integration** — @react-three/fiber provides excellent React-Three.js bridge
- **Team familiarity** — React is widely known and documented
- **TypeScript support** — Strong typing for complex components
- **Islands architecture** — Only hydrate what needs interactivity

### Consequences

**Positive:**

- Access to React ecosystem (shadcn/ui, Radix UI, etc.)
- Excellent Three.js integration
- Clear mental model for interactive components
- Strong community support

**Negative:**

- Additional bundle size for React runtime (~40KB gzipped)
- Hydration overhead for complex components
- Need to manage client/server boundary carefully

---

## Decision 003: Use Tailwind CSS for styling

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The site requires a mobile-first, dark cinematic theme with consistent design tokens.

### Decision

Use Tailwind CSS with mobile-first responsive design.

### Rationale

- **Utility-first** — Rapid development with consistent spacing/colors
- **Mobile-first** — Base styles for mobile, breakpoints for larger screens
- **PurgeCSS** — Only ships used CSS (minimal bundle size)
- **Customizable** — Extend theme via `tailwind.config.mjs`
- **Dark mode** — Built-in dark mode support via CSS variables

### Consequences

**Positive:**

- Fast development velocity
- Consistent design system
- Minimal CSS bundle size
- Easy to maintain and update

**Negative:**

- Verbose class names in HTML (trade-off for maintainability)
- Learning curve for team unfamiliar with utility-first CSS
- Need to configure custom theme for brand colors

---

## Decision 004: Use Cloudflare Pages for hosting

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The site requires fast, global hosting with automatic deployments and preview environments.

### Decision

Use Cloudflare Pages for static site hosting.

### Rationale

- **Free tier sufficient** — No cost for launch and early traffic
- **Global edge network** — Fast worldwide delivery
- **Automatic HTTPS** — SSL certificates managed automatically
- **Preview deployments** — Every PR gets a preview URL
- **Zero-config deployment** — Connect GitHub repo, auto-deploy on push
- **Integrated with Cloudflare ecosystem** — Easy R2 and Workers integration

### Consequences

**Positive:**

- Zero hosting cost
- Global CDN delivery
- Automatic preview deployments
- Easy rollback to previous versions
- Integrated analytics

**Negative:**

- Vendor lock-in to Cloudflare (mitigated by static output)
- Limited server-side logic (not needed for this project)

---

## Decision 005: Use Cloudflare R2 for media storage

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The site requires video and image storage with global CDN delivery and no egress fees.

### Decision

Use Cloudflare R2 for media asset storage.

### Rationale

- **No egress fees** — Critical for video-heavy site
- **S3-compatible API** — Familiar tooling and migration path
- **Global CDN delivery** — Fast worldwide asset delivery
- **Public bucket option** — Direct asset access via CDN
- **Integrated with Cloudflare** — Same account and billing

### Consequences

**Positive:**

- No bandwidth costs for video delivery
- Fast global CDN
- S3-compatible for future migration
- Integrated with Cloudflare Pages

**Negative:**

- Newer service (less community documentation)
- Need to manage bucket structure and cache headers manually

---

## Decision 006: Use mobile-first responsive strategy

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The target audience includes mobile users in LatAm with varying network conditions.

### Decision

Use mobile-first responsive design with Tailwind breakpoints.

### Rationale

- **Performance** — Mobile users get minimal CSS/JS
- **Touch-first** — Design for touch interactions before mouse
- **Network constraints** — Optimize for 3G/4G networks
- **Battery-conscious** — Reduce animations and heavy operations on mobile
- **Thumb-friendly** — Navigation and interactions within thumb zone

### Consequences

**Positive:**

- Better mobile performance
- Touch-optimized interactions
- Reduced data usage for mobile users
- Progressive enhancement for desktop

**Negative:**

- Desktop experience may feel "scaled up" initially
- Need to test on multiple device sizes
- More complex responsive logic

---

## Decision 007: Use progressive enhancement for WebGL

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The site will feature WebGL experiences, but not all devices support WebGL or have sufficient GPU power.

### Decision

Use progressive enhancement: check device capabilities before rendering WebGL, fallback to static images on mobile or unsupported devices.

### Rationale

- **Accessibility** — Core content accessible to all devices
- **Performance** — Don't force heavy 3D on low-end devices
- **Battery life** — Reduce GPU usage on mobile
- **Graceful degradation** — Site still works without WebGL

### Consequences

**Positive:**

- Broader device support
- Better mobile battery life
- Faster load times on low-end devices
- Accessible to users with WebGL disabled

**Negative:**

- Need to maintain fallback assets
- Additional complexity in component logic
- Testing on multiple device categories

---

## Decision 008: Do not install Three.js until required

**Date:** 2026-08-11  
**Status:** Accepted

### Context

Phase 1 focuses on foundation and infrastructure. Three.js is a large dependency (~600KB) not needed until Phase 3+.

### Decision

Do not install Three.js, @react-three/fiber, or @react-three/drei until Phase 3 (Hero section).

### Rationale

- **Bundle size** — Keep initial bundle small
- **Phase discipline** — Focus on foundation first
- **Dependency management** — Add dependencies only when needed
- **Performance** — Avoid loading unused libraries

### Consequences

**Positive:**

- Smaller initial bundle
- Faster build times
- Clear phase boundaries
- Easier debugging

**Negative:**

- Cannot prototype WebGL experiences early (acceptable trade-off)

---

## Decision 009: Do not install shadcn/ui until design system phase

**Date:** 2026-08-11  
**Status:** Accepted

### Context

Phase 1 focuses on infrastructure. shadcn/ui components are not needed until Phase 2 (Design System).

### Decision

Do not install shadcn/ui dependencies until Phase 2.

### Rationale

- **Phase discipline** — Focus on infrastructure first
- **Customization** — Plan design system before adding components
- **Dependency management** — Add dependencies only when needed

### Consequences

**Positive:**

- Clear phase boundaries
- Time to plan design system properly
- Avoid premature component creation

**Negative:**

- Cannot use shadcn components for health route (acceptable, use basic HTML)

---

## Decision 010: Do not commit secrets

**Date:** 2026-08-11  
**Status:** Accepted

### Context

The project requires environment variables for Cloudflare API tokens, R2 keys, and other secrets.

### Decision

Never commit secrets to Git. Use `.env.example` for placeholders, `.env` for local development (gitignored), and Cloudflare Pages dashboard for production secrets.

### Rationale

- **Security** — Prevent accidental exposure of API keys
- **Best practice** — Industry standard for secret management
- **Compliance** — Meet security audit requirements

### Consequences

**Positive:**

- No secret leaks in Git history
- Clear separation of public/private config
- Easy to rotate secrets without code changes

**Negative:**

- Need to manually configure secrets in Cloudflare dashboard
- New developers need to copy `.env.example` to `.env`

---

## Decision 011: Defer ESLint configuration

**Date:** 2026-08-11  
**Status:** Accepted (Deferred)

### Context

Phase 1 requires linting and formatting. ESLint setup with Astro can be complex and may block progress.

### Decision

Use Prettier for formatting. Defer ESLint configuration to a later phase if needed.

### Rationale

- **Phase discipline** — Don't let tooling block progress
- **Prettier sufficient** — Code formatting covered
- **Astro compatibility** — ESLint + Astro requires careful configuration
- **TypeScript checking** — `astro check` provides type safety

### Consequences

**Positive:**

- Faster Phase 1 completion
- No tooling conflicts
- Prettier handles formatting consistently

**Negative:**

- No linting for code quality issues (acceptable for now)
- May need to add ESLint in later phase

---

## Decision 012: Use CSS Variable-based theme system

**Date:** 2026-08-17  
**Status:** Accepted

### Context

The site uses CSS variables for design tokens but was locked to a single theme. We needed the ability to switch the entire visual design (colors, typography, spacing, backgrounds) without changing components.

### Decision

Implement a CSS Variable-based theme system where each theme is a separate CSS file defining the same variables in `:root`. The active theme is selected via a single `@import` line in `src/styles/global.css`.

### Rationale

- **Zero JS overhead** — No runtime theme-switching logic, no FOUC
- **Build-time** — Theme is baked into the CSS bundle
- **Tailwind-native** — Config already uses `var()` so no changes needed
- **shadcn-compatible** — Bridge layer maps to standard tokens
- **8 themes available** — 4 original + 4 gradient themes, demonstrating the system
- **Zero breaking changes** — Existing components continue to work

### Consequences

**Positive:**

- Complete visual redesign with one line change
- New themes can be added by copying any existing file
- shadcn, Tailwind, and components all work without modification
- GPU-accelerated gradients, no JS overhead
- Documentation in `src/styles/themes/README.md`

**Negative:**

- Only one theme is active at a time (build-time selection)
- Theme files must be kept in sync (all define same variable set)

---

## Decision 013: Separate solid and gradient backgrounds

**Date:** 2026-08-17  
**Status:** Accepted

### Context

The original 4 themes used solid `--color-bg-primary` colors throughout components, Tailwind classes, and the shadcn bridge. We wanted to add CSS gradients to themes for visual depth without breaking the existing architecture.

### Decision

Use two separate background variables:
- `--color-bg-primary` — Solid color (always required, used by components)
- `--color-bg-gradient` — Optional CSS gradient (applied to `body` only via `background-image`)

In `global.css`:

```css
body {
  background-color: var(--color-bg-primary);  /* always solid fallback */
  background-image: var(--color-bg-gradient); /* optional gradient overlay */
}
```

### Rationale

- **Zero breaking changes** — Components keep using solid `--color-bg-primary`
- **Optional gradients** — Themes without `--color-bg-gradient` work as before
- **shadcn bridge intact** — `--background` still maps to solid color
- **GPU-accelerated** — CSS gradients have no JS overhead
- **Static only** — No `background-attachment: fixed` (iOS Safari incompatibility)

### Consequences

**Positive:**

- All 8 themes now have gradients (subtle on originals, dramatic on glass themes)
- Components continue to use solid colors via Tailwind/shadcn
- Gradients render fast via GPU
- Architecture is future-proof for additional gradient variants

**Negative:**

- Two variables to manage per theme (minor)
- Gradient design is constrained to body-level only (could be extended to sections later)

---

## Decision 014: Allow runtime theme switching via class-based scoping

**Date:** 2026-08-17  
**Status:** Accepted

### Context

Phase 5.6 introduced a build-time theme system using `:root { --color-* }` definitions. The README documented runtime switching as a future enhancement. Users couldn't switch themes without rebuilding the site. Phase 5.61 introduced a `ThemeSwitcher` React island requiring multiple themes to coexist in the browser without conflicts.

### Decision

Refactor theme selectors from `:root` to `html.theme-[name]`. All 8 theme files are loaded eagerly via `@import` in `BaseLayout.astro`. A default `class="theme-cinematic"` on `<html>` provides initial paint. An inline `<script is:inline>` in `<head>` reads `localStorage['labxr-theme']` and applies the saved theme before first paint to prevent FOUC. The `ThemeSwitcher` island persists selections to `localStorage` and applies the new class on click.

### Rationale

- **Class-based isolation** — Multiple themes coexist without selector conflicts (specificity equal, last-load wins on `:root` cascade)
- **FOUC-free** — Inline script runs synchronously before body renders
- **Build-time still works** — A single theme can still be selected at build time by setting the html class; the runtime layer is opt-in
- **Zero JS overhead for build-time users** — If runtime switching is not used, the same architecture works
- **Tailwind/shadcn unchanged** — The shadcn bridge layer (`global.css`) still uses `:root { --background: var(--color-bg-primary) }`; the variable resolves via cascade

### Consequences

**Positive:**

- Users can switch themes instantly without page reload
- Theme preference persists across sessions (localStorage)
- Glassmorphism `rgba()` backgrounds render correctly when layered on the body
- All 8 themes coexist; no build-time choice required
- Single-line `@import` in BaseLayout replaces the need for the build-time `@import` in `global.css`

**Negative:**

- Eager loading of all 8 theme files adds ~5KB gzipped to initial CSS bundle
- ThemeSwitcher island adds ~2KB gzipped to initial JS bundle
- Theme classes on `<html>` can interfere with prefers-color-scheme detection (handled by using class instead of media query)

---

## Decision 015: Multi-discipline routing via [slug].astro

**Date:** 2026-08-17  
**Status:** Accepted

### Context

The homepage was the only entry point for portfolio + services content. Agencies visiting from search engines or social shares had no per-discipline landing pages for SEO or contextual entry. The team needed a way to expose XR, UX, Dev, and other disciplines as first-class pages.

### Decision

Add a `disciplines` array field to the `case-studies` and `services` Zod schemas (7 values: `xr`, `ux-design`, `dev`, `videomapping`, `interactivity`, `museography`, `products`). Create `src/pages/discipline/[slug].astro` with `getStaticPaths()` returning all 7 slugs. Filter content by `disciplines.includes(slug)`. Refactor `portfolio.astro` and `services.astro` to accept optional `data` prop (filtered collection) — fallback to full collection when omitted (homepage behavior unchanged). Add a "Work" dropdown to navigation linking to all 7 discipline pages.

### Rationale

- **SEO-friendly** — Each discipline has a unique title, description, and filtered content (no duplicate-content penalty because content differs per slug)
- **Reuses existing sections** — `Portfolio` and `Services` accept filtered data; no duplication of section markup
- **Type-safe** — Zod enum ensures only valid disciplines are tagged
- **Lightweight routing** — Static generation, no server-side runtime
- **Astro-native nav** — `<details>`/`<summary>` for desktop dropdown, React state for mobile accordion — no Radix UI dependency added

### Consequences

**Positive:**

- 7 new SEO landing pages (5 → 12 total pages)
- Agencies can deep-link to specific discipline content
- Content schema is now discipline-aware for future filtering (e.g., search, related content)
- Empty discipline pages gracefully show "No projects available in this discipline yet" copy

**Negative:**

- 5 of 7 discipline pages will be sparse until more content is tagged (espejo-ai + holograma-retail cover 4 disciplines; 3 disciplines currently empty)
- Duplicate hero/contact patterns across 7 pages (mitigated by reusing Portfolio/Services with filtered data)
- Content tagging maintenance burden — every new case study needs `disciplines` array

---

## Decision 016: Mark video/poster/metrics optional in case-studies schema

**Date:** 2026-08-17  
**Status:** Accepted

### Context

Phase 6.0 introduced 8 fictional case studies with `coverImage` placeholders but no video assets. The existing schema required `videoUrl`, `posterUrl`, and `metrics` fields. Either all 8 files would need fabricated video URLs (deceptive) OR the schema needed relaxation.

### Decision

Mark the following fields as optional in `case-studies` Zod schema:
- `videoUrl: z.string()` → `z.string().optional()`
- `posterUrl: z.string()` → `z.string().optional()`
- `metrics.interactions: z.string()` → `z.string().optional()`
- `metrics.uptime: z.string()` → `z.string().optional()`
- `metrics` itself: `z.object({...})` → `z.object({...}).optional()`

Add two new optional fields:
- `year: z.number().optional()` — explicit publication year (vs. `pubDate` which is full ISO date)
- `coverImage: z.string().optional()` — marketing/marketing image distinct from video poster

Add fallback chain in `Portfolio.astro`: `<img src={coverImage ?? posterUrl}>`. Refactor `CaseStudyViewer.tsx` to detect missing video and render image + text modal (no video player).

### Rationale

- **Spec faithfulness** — Phase 6.0 spec uses placehold.co images, not videos; requiring videoUrl would force fabrication
- **Forward compatible** — When real videos arrive (Phase 6.1+), they can be added to the existing 8 case studies without schema changes
- **Two image roles** — `coverImage` is the marketing hero (used in grids); `posterUrl` is the video poster (used in modal). Distinction allows different image strategies
- **Backward compatible** — The 2 existing case studies (espejo-ai, holograma-retail) keep working with their videoUrl/posterUrl/metrics
- **Modal fallback** — Without graceful handling, opening a no-video case study in the modal would crash

### Consequences

**Positive:**

- 8 new case studies can be added with image-only placeholders
- Future content can ship progressively (image first, video later)
- CaseStudyViewer renders gracefully for both video and image-only case studies
- No data fabrication required

**Negative:**

- Schema is less strict — content authors can publish incomplete case studies
- Modal fallback is image+text only; less rich than video experience
- 2 fields now exist for similar purposes (coverImage vs posterUrl) — content authors must choose

---

## How to Add New Decisions

Copy this template:

```markdown
## Decision XXX: [Title]

**Date:** YYYY-MM-DD  
**Status:** Proposed / Accepted / Deprecated / Superseded

### Context

[What is the issue or situation?]

### Decision

[What was decided?]

### Rationale

[Why was this decision made?]

### Consequences

**Positive:**

- [Positive consequence 1]
- [Positive consequence 2]

**Negative:**

- [Negative consequence 1]
- [Negative consequence 2]
```

---

**Last updated:** 2026-08-17 (Phase 6.0 — D016)
