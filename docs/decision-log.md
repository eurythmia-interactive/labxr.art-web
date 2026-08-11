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

**Last updated:** 2026-08-11
