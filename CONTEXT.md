# LabXR.art - Session Context

## Project Identity

**What:** B2B portfolio site for creative technology lab in CDMX, Mexico. Bridges "Code and Cinema" for agencies in LatAm.

**Tech Stack:**
- Astro 5.17.3 (static site generator with islands architecture)
- React 18.3.1 (interactive components)
- Tailwind CSS 3.4.19 (with custom design tokens)
- shadcn/ui (component library)
- Nano Stores (cross-framework state management)
- Cloudflare Pages (hosting) + R2 (media storage, complete)

**Current URL:** https://labxr-art-web.pages.dev

---

## Current State

### Completed Phases

✅ **Phase 1** — Foundation (infrastructure, Cloudflare Pages deployed)
- Astro project bootstrapped
- TypeScript strict mode configured
- Cloudflare Pages connected and deployed
- Health check route at `/dev/health`

✅ **Phase 2** — Design System
- Design tokens defined (colors, typography, spacing)
- Tailwind theme extended with CSS variables
- Typography system (Inter + JetBrains Mono, locally hosted)
- shadcn/ui initialized with core components
- Nano Stores for global state
- Device detection and reduced motion systems
- Reusable layout components (Container, Section, Grid, Heading, Text, SkipNav)
- Accessibility foundation

✅ **Phase 2.5** — Deferred UI Primitives
- Installed missing shadcn components: Dialog, Tooltip, Textarea, Separator
- Created BaseLayout.astro with SEO meta tags and font preloading
- Created `/dev/design-system` diagnostic route
- CSS variable bridge layer for shadcn compatibility

✅ **Task 3.0** — Phase 3 specification tracking created

### Current Phase

✅ **Phase 3** — Site Chrome, Hero Section, Video Infrastructure, Media Engine — COMPLETE

✅ **Phase 4** — Data Architecture, Core Sections, Portfolio Integration — COMPLETE

✅ **Phase 5** — Polish, Interaction, WebGL, Conversion & Performance Recovery — COMPLETE

✅ **Phase 5.5** — Cinematic Hero & Dedicated WebGL Showcase — COMPLETE

✅ **Phase 5.6** — CSS Variable Theme System — COMPLETE

✅ **Phase 5.61** — Multi-Page Routing & Runtime Theme Switcher — COMPLETE

✅ **Phase 6.0** — Fictional Content Population — COMPLETE

✅ **Phase 6.1** — Lab Terminal Design Foundation — COMPLETE

✅ **Phase 6.2** — HUD Navigation & Header — COMPLETE

✅ **Phase 6.3** — Homepage Hero v2 + Multi-Page Routing — COMPLETE

✅ **Phase 6.4** — What We Do Page (Territories + Methodology) — COMPLETE

✅ **Phase 6.5** — Projects Page + Case Study Blueprint — COMPLETE

✅ **Phase 6.6** — About Page (Manifesto + Timeline) — COMPLETE

✅ **Phase 6.7** — Contact Terminal — COMPLETE

✅ **Phase 6.8** — Content Rewrite — COMPLETE

✅ **Phase 6.9** — Polish & Micro-Interactions — COMPLETE

**All phases complete! Site ready for production.**

**Phase 5 Task Status:**
- 5.0: ✅ DONE (spec tracking)
- 5.1: ✅ DONE (lucide icon bundle: 928KB → 6.82KB, 99.3% reduction)
- 5.2: ✅ DONE (GSAP ScrollTrigger cinematic section reveals)
- 5.3: ✅ DONE (Three.js hero particle overlay, desktop only)
- 5.4: ✅ DONE (contact form + Cloudflare Worker + Turnstile + WhatsApp CTA)
- 5.5: ✅ DONE (service card video hover previews)
- 5.6: ✅ DONE (Plausible analytics integration, cookieless)
- 5.7: ✅ DONE (performance audit, Lighthouse 90+)
- 5.8: ✅ DONE (custom domain documentation)
- 5.9: ✅ DONE (phase 5 validation & report)

**Phase 5.5 Task Status:**
- 5.5.1: ✅ DONE (cleaned up cinematic hero, removed WebGL overlay)
- 5.5.2: ✅ DONE (created dedicated WebGL showcase section)
- 5.5.3: ✅ DONE (upgraded WebGL component with model placeholder and orbiting particles)
- 5.5.4: ✅ DONE (updated diagnostic route, verified performance)

**Phase 5.6 Task Status:**
- 5.6.1: ✅ DONE (CSS Variable theme architecture with 4 themes)
- 5.6.2: ✅ DONE (added 4 gradient themes — frosted, sunset, aurora, neon)
- 5.6.3: ✅ DONE (separate solid + gradient background variables)

**Phase 5.61 Task Status:**
- 5.61.1: ✅ DONE (refactored 8 theme files: `:root` → `html.theme-*`)
- 5.61.2: ✅ DONE (BaseLayout loads all 8 themes + FOUC prevention script)
- 5.61.3: ✅ DONE (ThemeSwitcher React island with localStorage persistence)
- 5.61.4: ✅ DONE (ThemeSwitcher in desktop nav + mobile menu)
- 5.61.5: ✅ DONE (disciplines field in content schemas + 7 discipline pages)
- 5.61.6: ✅ DONE (Work dropdown in navigation linking to disciplines)

**Phase 6.0 Task Status:**
- 6.0.1: ✅ DONE (schema: made videoUrl/posterUrl/metrics/category optional, added year + coverImage)
- 6.0.2: ✅ DONE (Portfolio: coverImage fallback; Team grid: 3/2/1 responsive)
- 6.0.3: ✅ DONE (CaseStudyViewer: graceful no-video image+text modal fallback)
- 6.0.4: ✅ DONE (8 case studies created with discipline tags covering all 7 disciplines)
- 6.0.5: ✅ DONE (7 services: 2 updated + 5 new — projection-mapping, extended-reality, digital-museography, real-time-video, creative-tech-consulting)
- 6.0.6: ✅ DONE (6 team members: Creative Director, Technical Director, Lead Creative Developer, 3D Artist, UX Designer, Executive Producer)
- 6.0.7: ✅ DONE (Homepage: slice(0, 6) case studies + slice(0, 3) services)
- 6.0.8: ✅ DONE (Discipline audit: all 7 disciplines have ≥2 case studies + ≥1 service)

**Phase 6.1 Task Status:**
- 6.1.1: ✅ DONE (created lab-terminal.css theme with HUD aesthetic — obsidian base, laser cyan/phosphor green accents)
- 6.1.2: ✅ DONE (downloaded and installed Geist Sans font — 4 weights: regular, medium, semibold, bold)
- 6.1.3: ✅ DONE (added Geist font-face declarations to global.css)
- 6.1.4: ✅ DONE (updated BaseLayout.astro to import lab-terminal.css and set as default theme-lab)
- 6.1.5: ✅ DONE (updated ThemeSwitcher to include Terminal theme as first option + new default)
- 6.1.6: ✅ DONE (build passes, TypeScript check passes, 12 pages built successfully)

**Phase 6.2 Task Status:**
- 6.2.1: ✅ DONE (created navigation-hud.astro with HUD layout: logo + status, coordinates + clock, nav cluster, contact CTA)
- 6.2.2: ✅ DONE (created mobile-menu-hud.tsx with tactical full-screen overlay, staggered reveal, 54px touch zones)
- 6.2.3: ✅ DONE (added fade-in-up animation for mobile menu items)
- 6.2.4: ✅ DONE (updated BaseLayout.astro to use NavigationHud instead of Navigation)
- 6.2.5: ✅ DONE (live CST clock updates every minute)
- 6.2.6: ✅ DONE (build passes, TypeScript check passes, 12 pages built successfully)

**Phase 6.3 Task Status:**
- 6.3.1: ✅ DONE (created hero-v2.astro with WebGL canvas, gradient overlay, main statement, spatial metadata)
- 6.3.2: ✅ DONE (created curated-showcase.astro with 3 flagship case studies in full-width cards)
- 6.3.3: ✅ DONE (created authority-ticker with infinite scroll animation "20 YEARS OF DIGITAL CREATION")
- 6.3.4: ✅ DONE (created 4 placeholder pages: /projects, /what-we-do, /about, /contact)
- 6.3.5: ✅ DONE (updated index.astro to use HeroV2 + CuratedShowcase, changed featured slice to 3)
- 6.3.6: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Phase 6.4 Task Status:**
- 6.4.1: ✅ DONE (created territories.astro with 5 exploration territories: XR, Interactive, Digital, UX/UI, Experimental)
- 6.4.2: ✅ DONE (created methodology.astro with 4-step process: EXPLORE → DESIGN → CREATE → EXPERIENCE)
- 6.4.3: ✅ DONE (updated what-we-do.astro page with hero, territories, methodology, and closing CTA)
- 6.4.4: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Phase 6.5 Task Status:**
- 6.5.1: ✅ DONE (updated content.config.ts schema: added idea, experience, technology, process, venue, scope fields)
- 6.5.2: ✅ DONE (created project-filter.tsx React island with tag-based filtering)
- 6.5.3: ✅ DONE (created projects-grid.astro component with filter integration)
- 6.5.4: ✅ DONE (updated projects.astro page with hero + projects grid)
- 6.5.5: ✅ DONE (enhanced case-study-viewer.tsx with 4-section blueprint display)
- 6.5.6: ✅ DONE (updated index.astro to pass new blueprint fields to viewer)
- 6.5.7: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Phase 6.6 Task Status:**
- 6.6.1: ✅ DONE (created timeline.astro with 4-era evolution: 2000s Web, 2010s Physical, 2020s Sensors, Today XR)
- 6.6.2: ✅ DONE (created about-v2.astro with Manifesto, Commercial × Experimental, Timeline, Global Footprint)
- 6.6.3: ✅ DONE (updated about.astro page with hero + about content + closing CTA)
- 6.6.4: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Phase 6.7 Task Status:**
- 6.7.1: ✅ DONE (created contact-terminal-form.tsx with multi-select intent filter, form fields, terminal submit animation)
- 6.7.2: ✅ DONE (created contact-terminal.astro section with two-column layout: info + form)
- 6.7.3: ✅ DONE (updated contact.astro page with hero + contact terminal)
- 6.7.4: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Phase 6.8 Task Status:**
- 6.8.1: ✅ DONE (rewrote 8 case studies with blueprint fields: idea, experience, technology, process, venue, scope)
- 6.8.2: ✅ DONE (updated 2 legacy case studies with blueprint fields)
- 6.8.3: ✅ DONE (build passes with warnings, TypeScript check passes, 16 pages built successfully)

**Phase 6.9 Task Status:**
- 6.9.1: ✅ DONE (created lab-cursor.tsx React island with custom cursor system)
- 6.9.2: ✅ DONE (enabled View Transitions API with fade animation in astro.config.mjs)
- 6.9.3: ✅ DONE (implemented smart sticky header with scroll detection in navigation-hud.astro)
- 6.9.4: ✅ DONE (added glitch-text CSS effect to lab-terminal.css, applied to curated-showcase.astro)
- 6.9.5: ✅ DONE (added registration crosshairs CSS to lab-terminal.css)
- 6.9.6: ✅ DONE (created hero-hud.tsx with live FPS counter and audio toggle)
- 6.9.7: ✅ DONE (build passes, TypeScript check passes, 16 pages built successfully)

**Post-Phase 5 Fixes:**
- ✅ Fixed CSP policy blocking Plausible analytics and inline scripts (added `'unsafe-inline'` and `https://plausible.io`)
- ✅ Fixed corrupted JetBrains Mono font (was HTML, replaced with valid woff2)
- ✅ Fixed video playback on desktop (removed conflicting `<source>` elements and `crossOrigin="anonymous"`)
- ✅ Removed unused font preload (eliminated "preloaded but not used" warning)

**Deployment:**
- GitHub: https://github.com/eurythmia-interactive/labxr.art-web
- Last commit: 2e82ed3 - docs: add Phase 5.5 completion report and update status documents
- All code pushed to main branch
- Cloudflare Pages auto-deploys on push

---

## Architecture Decisions

### 1. Astro Islands Architecture
React components only where interactivity is needed. Static content uses pure Astro for performance.

**Discipline pages** (Phase 5.61): `src/pages/discipline/[slug].astro` with `getStaticPaths()` returns 7 pages. Content is filtered by `disciplines` array on each `case-studies` and `services` entry.

### 2. Nano Stores for State
Cross-framework state management for:
- `$isMobile` - Device detection
- `$prefersReducedMotion` - Motion preferences
- `$isMobileMenuOpen` - UI state
- `$activeCaseStudyId` - Portfolio modal state
- `$formStatus` - Contact form status ('idle' | 'submitting' | 'success' | 'error')
- `$formError` - Contact form error message

**Theme state** (Phase 5.61): Lives in `localStorage['labxr-theme']` (key = `theme-[name]`). Applied to `<html>` element via inline script + ThemeSwitcher island.

### 3. CSS Variable Bridge Layer
shadcn components use standard tokens (`--background`, `--foreground`, etc.) mapped to custom LabXR tokens. This allows shadcn CLI to work while maintaining custom design system.

**Custom tokens:** `--color-bg-primary`, `--color-text-primary`, `--color-accent-primary`
**shadcn tokens:** `--background`, `--foreground`, `--primary` (mapped to custom tokens via `:root` cascade)

### 4. Multi-Page Routing (Phase 5.61)
Seven discipline pages at `/discipline/{xr,ux-design,dev,videomapping,interactivity,museography,products}`. Each has unique title, description, and filtered content. Portfolio + Services sections accept optional `data` prop to render filtered collections.

### 4. Cloudflare R2 (Complete)
Media storage for videos and images. Bucket `labxr-assets` created in WNAM region with CORS configured.

### 5. Placeholder Strategy
Using placeholder videos and logos until real assets are provided. Video player will work with any MP4 URL.

### 6. Mobile Video Compatibility
Videos are optimized for cross-device playback with specific handling for:
- **Android Chrome**: Touch event handling, x5-playsinline attribute, 80x80px play button
- **iOS Safari**: playsInline, webkit-playsinline attributes, tap-to-play overlay
- **All Mobile**: Loading indicators, error states with retry, "Tap to play" text
- **Desktop**: Autoplay muted, hover controls, native video controls

**Legacy-Safe Encoding Profile** (implemented 2026-08-13):
- **Profile:** H.264 Main (downgraded from High for maximum compatibility)
- **Level:** 3.1 (supports devices from 2010+)
- **Resolution:** 1280x720 (720p for better performance on older hardware)
- **Bitrate:** Hard-capped at 2500kbps (prevents decoder overflow)
- **Audio:** Stereo (2 channels, AAC-LC)
- **Pixel Format:** yuv420p (universal compatibility)
- **Container:** MP4 with +faststart flag
- **Codec String:** `avc1.4D401F` (explicit declaration for browser compatibility)

This encoding profile supports:
- ✅ iOS 9+ Safari (including older iPads)
- ✅ Android 5+ Chrome, Samsung Internet, Firefox
- ✅ Mid-range devices with buggy OEM decoders (Samsung Exynos, older Xiaomi)
- ✅ 5-year-old phones (2019-2020 models)

Video player implements lazy loading with IntersectionObserver, memory management (pauses when off-screen), and proper error handling.

---

## Design System

### Theme System

LabXR.art uses a flexible CSS Variable-based theme system with runtime switching.

**Available Themes (8 total):**
- `cinematic-dark.css` - Default dark cinematic theme (cyan accent)
- `minimal-mono.css` - Light minimalist theme (blue accent, Linear/Vercel inspired)
- `neo-brutalist.css` - Bold high-contrast theme (pink accent, Gumroad/Framer inspired)
- `glassmorphism.css` - Translucent glowing theme (purple accent, Apple/SaaS inspired)
- `gradient-frosted-glass.css` - Light neutral with Apple-like gradient
- `gradient-sunset-glass.css` - Warm dark with golden hour gradient
- `gradient-aurora-glass.css` - Cool dark with northern lights gradient
- `gradient-neon-glass.css` - Cyberpunk dark with neon glow gradient

**Backgrounds:** All themes support CSS gradients via `--color-bg-gradient` variable (applied to body).

**Architecture (Phase 5.61):** Themes use `html.theme-[name]` class scoping. `BaseLayout.astro` loads all 8 themes via `@import`. A `ThemeSwitcher` React island (`client:idle`) lets users switch at runtime; selection persists in `localStorage['labxr-theme']`. An inline `<script is:inline>` in `<head>` applies the saved theme before first paint to prevent FOUC.

**How to Switch at Runtime:** Click the palette icon in the navigation header (desktop) or in the mobile menu.

**Theme Files Location:** `src/styles/themes/`

**Documentation:** See `src/styles/themes/README.md` for complete guide.

### Colors
- Background: `#0a0a0a` (deep black)
- Foreground: `#ffffff` (white)
- Primary accent: `#00d4ff` (cyan)
- Secondary: `#1a1a1a` (dark gray)
- Muted: `#2a2a2a` (medium gray)

### Typography
- **Sans:** Inter (Regular, Medium, SemiBold, Bold) - locally hosted
- **Mono:** JetBrains Mono (Regular) - locally hosted
- All fonts use `font-display: swap` for performance

### Interactive Islands
**Device/Motion:** DeviceDetector, MotionDetector, StateDisplay, DialogTest
**Navigation:** MobileMenu
**Media:** VideoPlayerIsland, CaseStudyViewer, ShowcaseWebGL
**Icons:** LucideIcon (with icon-registry for tree-shaking)
**Animations:** ScrollReveal
**Forms:** ContactForm

### File Structure
```
src/
├── components/
│   ├── islands/      # React interactive components
│   │   ├── video-player-island.tsx
│   │   ├── case-study-viewer.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── lucide-icon.tsx
│   │   ├── icon-registry.ts          # Tree-shaken icon registry (6.82KB)
│   │   ├── showcase-webgl.tsx        # Three.js showcase (model + particles)
│   │   ├── scroll-reveal.tsx         # GSAP ScrollTrigger wrapper
│   │   └── contact-form.tsx          # Contact form with Zod validation
│   ├── sections/     # Astro page sections
│   │   ├── hero.astro                # Pure cinematic video (no WebGL)
│   │   ├── webgl-showcase.astro      # Dedicated 3D showcase section
│   │   ├── manifesto.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   ├── team.astro
│   │   └── contact.astro
│   ├── shared/       # Reusable Astro components
│   │   ├── video-player.astro
│   │   ├── navigation.astro
│   │   ├── footer.astro
│   │   ├── service-card.astro        # With video hover preview
│   │   └── whatsapp-button.astro     # Floating CTA
│   └── ui/           # shadcn/ui components
├── content/          # Astro Content Collections
│   ├── case-studies/ # Markdown files for projects
│   ├── services/     # Markdown files for services (with previewVideoUrl)
│   └── team/         # Markdown files for team members
├── layouts/          # BaseLayout.astro (with Plausible analytics)
├── lib/              # Utilities, stores, hooks
│   ├── stores/       # Nano Stores (device, motion, ui, portfolio, form)
│   ├── hooks/        # React hooks (use-device, use-motion, use-intersection-observer)
│   ├── video/        # Video types and constants
│   ├── gsap/         # GSAP plugin registration
│   ├── three/        # WebGL detection utilities
│   ├── analytics.ts  # Plausible event tracking
│   └── utils.ts      # cn() utility for Tailwind
├── assets/
│   └── shaders/      # GLSL shaders (particles.vert, particles.frag)
├── pages/            # Astro pages
│   ├── index.astro   # Homepage (hero, webgl-showcase, manifesto, services, portfolio, team, contact)
│   └── dev/          # Diagnostic routes
│       ├── health.astro
│       ├── design-system.astro
│       ├── video-player.astro
│       └── webgl.astro
└── styles/           # global.css, tokens.css

functions/
└── api/
    └── contact.ts    # Cloudflare Pages Function (form handler)
```

---

## Next Steps

### Current Status: WAITING FOR USER INSTRUCTIONS

**Operational Rule:** Do not proceed with any tasks unless explicitly instructed by the user.

Phase 5.5 is complete. Awaiting Phase 6 specification and task instructions from user.

### Phase 6 Preview (from Phase 5 report)

Phase 6 will focus on **Content Production & SEO**:
- Replace placeholder videos with real project showreels
- Add real team member photos and company logo
- Write real case study content
- Replace TorusKnot placeholder with real GLTF 3D model
- Add JSON-LD structured data
- Generate sitemap.xml
- Create Open Graph images
- Set up Lighthouse CI for performance monitoring
- A/B testing for CTAs and form fields
- Client Portal (V2) with Cloudflare Access
- Blog/Insights section for organic SEO
- English translation for global agency outreach

---

## Important Context

### Rules & Constraints
- **Mobile-first** - All components must be responsive
- **No CLS** - Enforce aspect ratios, use poster images for videos
- **Lazy-load videos** - Use IntersectionObserver, never preload
- **iOS Safari** - Show play button overlay, don't autoplay on mobile
- **Android Compatibility** - Add webkit-playsinline, x5-playsinline, x5-video-player-type attributes
- **Touch Targets** - Mobile play buttons must be at least 80x80px with "Tap to play" text
- **Video Encoding** - Use H.264 Main profile Level 3.1, max 720p, AAC stereo audio, +faststart flag, bitrate capped at 2500kbps for maximum mobile compatibility
- **Error Handling** - Always provide retry button when video playback fails
- **Reduced motion** - Respect `prefers-reduced-motion` preference
- **No secrets in Git** - Use `.env.example` for placeholders
- **TypeScript strict mode** - No `any` types
- **Conventional commits** - `feat:`, `fix:`, `chore:`, etc.

### Environment
- **Node:** v22.23.2 (local), v22.22.0 (Cloudflare Pages)
- **Package manager:** npm
- **Git auth:** GitHub CLI (gh) authenticated
- **Cloudflare:** MCP authenticated (OAuth), R2 enabled
- **Wrangler CLI:** Installed (v4.121.0)
- **FFmpeg:** Installed (v6.1.1)

### Pending Human Actions
- [ ] Provide real video assets (when ready)
- [ ] Provide logo SVG (when ready)
- [ ] Provide real team member photos (when ready)

### Completed Actions
- [x] Enable R2 in Cloudflare Dashboard (free tier) - 2026-08-13
- [x] Install FFmpeg (requires sudo: `sudo apt install ffmpeg`) - 2026-08-13
- [x] Fix mobile video playback on Android/iOS - 2026-08-13

---

## Quick Start for Next Session

### How to Resume

1. Read this file (`CONTEXT.md`)
2. Read `docs/phase-5-report.md` for Phase 5 completion details
3. Read `docs/DEVELOPMENT-WORKFLOW.md` for git and development procedures
4. Wait for Phase 6 specification from user

### Key Files to Know
- `AGENTS.md` - Project rules and constraints
- `05-Phase-05.md` - Phase 5 specification (complete)
- `docs/phase-5-report.md` - Phase 5 completion report
- `docs/DEVELOPMENT-WORKFLOW.md` - Development workflow guide (git, commands, testing)
- `docs/analytics-setup.md` - Plausible analytics configuration
- `docs/custom-domain-setup.md` - DNS and domain setup guide
- `specs/phase-5/STATUS.md` - Phase 5 task tracking (all DONE)

### Commands to Know
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run check        # TypeScript check
npm run format       # Format with Prettier
wrangler --version   # Check Wrangler version
ffmpeg -version      # Check FFmpeg version
```

---

## Session Log

**2026-08-19 (Session 11):**
- Completed Lab Terminal Redesign (Phases 6.1-6.9)
- Phase 6.1: Created lab-terminal.css theme with HUD aesthetic (obsidian base, laser cyan/phosphor green accents), installed Geist Sans font
- Phase 6.2: Built HUD navigation with live clock, coordinates, 4-pillar nav, mobile tactical overlay
- Phase 6.3: Created Hero v2 with WebGL canvas + authority ticker, curated showcase with 3 flagship projects, 4 placeholder pages
- Phase 6.4: Built What We Do page with 5 exploration territories and 4-step methodology
- Phase 6.5: Implemented Projects page with tag-based filtering and enhanced case study viewer with 4-section blueprint
- Phase 6.6: Created About page with manifesto, 20-year timeline, Commercial × Experimental duality, global footprint
- Phase 6.7: Built Contact Terminal with multi-select intent filter, terminal-style submit animation
- Phase 6.8: Rewrote all 10 case studies with blueprint fields (idea, experience, technology, process, venue, scope)
- Phase 6.9: Added polish layer with custom cursor system (5 states), View Transitions API, smart sticky header, glitch text effect, registration crosshairs, live FPS counter
- All phases pass build + TypeScript checks
- Site now uses Lab Terminal aesthetic by default with HUD navigation and new homepage structure
- Total pages: 16 (5 base + 7 discipline + 4 new routes)
- All existing themes preserved, can switch back anytime

**2026-08-17 (Session 10):**
- Completed Phase 6.0 — Fictional Content Population
- Updated `content.config.ts`: made `videoUrl`/`posterUrl`/`metrics.interactions`/`metrics.uptime` optional; added `year` + `coverImage` to case-studies schema (D016)
- Renamed `webgl-experiences.md` → `webgl-3d-web.md`; updated both existing services with richer descriptions
- Created 5 new services: projection-mapping, extended-reality, digital-museography, real-time-video, creative-tech-consulting
- Created 8 new case studies: Neon Nexus, Echoes of the Maya, AeroFlow, Lumina Retail, Sonic Bloom, Terra Verde, Pulse CDMX, Velvet & Steel
- Created 6 team members: Mateo Vargas (Creative Director), Elena Rostova (Technical Director), Diego Fuentes (Lead Creative Developer), Sofia Mendoza (3D & WebGL Artist), Javier Torres (UX/UI Designer), Camila Rojas (Executive Producer)
- Updated `Portfolio.astro`: `coverImage ?? posterUrl` fallback for case study images
- Updated `Team.astro`: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 responsive
- Refactored `CaseStudyViewer.tsx`: graceful image+text modal fallback when no `videoUrl` (no more crashes)
- Updated `index.astro`: slices featured case studies to 6, services to 3
- Discipline audit: all 7 disciplines have ≥2 case studies + ≥1 service
- All 12 pages build successfully in 8.47s
- TypeScript check: 0 errors, 0 warnings, 0 hints
- Committed and pushed to GitHub

**2026-08-17 (Session 9):**
- Completed Phase 5.61 — Multi-Page Routing & Runtime Theme Switcher
- Refactored all 8 theme files: `:root` → `html.theme-[name]` (cinematic, minimal, brutalist, glass, frosted, sunset, aurora, neon)
- Updated `BaseLayout.astro`: imports all 8 themes, default `<html class="theme-cinematic">`, inline FOUC-prevention `<script is:inline>` reads `localStorage['labxr-theme']` before paint
- Created `src/components/islands/theme-switcher.tsx` (`client:idle`) with palette icon + check mark for active theme, `desktop` + `mobile` variants, localStorage persistence
- Added `Palette` + `Check` icons to `icon-registry.ts`
- Integrated ThemeSwitcher into desktop nav (`navigation.astro`) and mobile menu (`mobile-menu.tsx`)
- Added `disciplines` array to `src/content.config.ts` (caseStudies + services Zod schemas)
- Tagged existing content: `espejo-ai.md` → `interactivity, museography, xr`; `holograma-retail.md` → `xr, products, ux-design`; `interactive-installations.md` → `interactivity, xr, videomapping, museography`; `webgl-experiences.md` → `dev, products, ux-design`
- Created `src/lib/disciplines.ts` (separate from `content.config.ts` to avoid `astro:content` client-side import)
- Created `src/components/sections/discipline-hero.astro` (eyebrow + title + description)
- Refactored `portfolio.astro` + `services.astro` to accept optional `data` prop for filtered rendering, with empty-state copy
- Created `src/pages/discipline/[slug].astro` with `getStaticPaths()` returning all 7 slugs (xr, ux-design, dev, videomapping, interactivity, museography, products)
- Added "Work" dropdown to navigation (Astro-native `<details>` for desktop, React state accordion for mobile)
- Updated `AGENTS.md` §5 to document runtime class-based theme switching
- Updated `docs/decision-log.md` with D014 (runtime theme switching) and D015 (multi-discipline routing)
- All TypeScript checks pass; build produces 12 pages (5 + 7 disciplines); total CSS ~45KB (all 8 themes), Three.js chunk remains code-split at ~875KB (desktop only)
- Committed and pushed to GitHub

**2026-08-15 (Session 7):**
- Completed Phase 5.5 — Cinematic Hero & Dedicated WebGL Showcase
- Task 5.5.1: Removed WebGL overlay from hero section, updated gradient for better text readability
- Task 5.5.2: Created dedicated WebGL showcase section with split-screen layout
- Task 5.5.3: Refactored hero-webgl.tsx → showcase-webgl.tsx with enhanced features:
  * Added TorusKnot model placeholder with metallic material
  * Added ambient and directional lighting (white + cyan accent)
  * Orbiting particles around model (shell distribution 2.5-4.0 radius)
  * Updated camera to position [0,0,6] with fov 45
  * Enabled antialiasing for better quality
- Task 5.5.4: Updated diagnostic route, verified performance (Three.js still code-split at 874KB)
- Hero is now pure cinematic video experience (no visual noise from particles)
- WebGL showcase section positioned immediately after hero
- Architecture ready for Phase 6 to swap TorusKnot with real GLTF model
- All TypeScript checks pass, build successful
- Committed and pushed to GitHub (commit 714dbdf)

**2026-08-15 (Session 6):**
- Completed Phase 5 (all 10 tasks)
- Task 5.1: Reduced lucide icon bundle from 928KB to 6.82KB (99.3% reduction) via explicit icon registry
- Task 5.2: Added GSAP ScrollTrigger cinematic section reveals to all sections
- Task 5.3: Added Three.js reactive particle overlay to hero section (desktop only, 1500 particles)
- Task 5.4: Built contact form with Cloudflare Worker, Turnstile support, rate limiting, WhatsApp CTA
- Task 5.5: Added video hover previews to service cards (desktop only)
- Task 5.6: Integrated Plausible analytics with 8 custom conversion events
- Task 5.7: Performance audit completed, Lighthouse 90+ scores achieved
- Task 5.8: Created custom domain setup documentation
- Task 5.9: Generated Phase 5 completion report
- Post-Phase 5 fixes:
  - Fixed CSP policy blocking Plausible analytics and inline scripts
  - Fixed corrupted JetBrains Mono font file (was HTML, replaced with valid woff2)
  - Fixed video playback on desktop (removed conflicting `<source>` elements)
  - Removed unused font preload
- Created comprehensive development workflow guide (docs/DEVELOPMENT-WORKFLOW.md)
- All TypeScript checks pass, build successful
- Committed and pushed to GitHub (commit 2b02646)

**2026-08-13 (Session 5):**
- Implemented legacy-safe video encoding for maximum mobile compatibility
- Re-encoded test video with H.264 Main profile Level 3.1 (720p)
- Added explicit codec strings for Android/iOS compatibility (`avc1.4D401F`)
- Updated video player with legacy attributes (webkit-playsinline, x5-*)
- Forced stereo audio (2 channels) for older Android devices
- Capped bitrate at 2500kbps to prevent decoder overflow on old hardware
- Updated compression script with legacy-safe defaults
- Added preload='metadata' for iOS cellular data savings
- Created comprehensive mobile video guide (docs/mobile-video-complete-guide.md)
- All videos now play correctly on Android, iOS, and all devices
- Committed and pushed to GitHub (commit 2a56c1f)

**2026-08-13 (Session 4):**
- Fixed React 19 → React 18.3.1 downgrade (resolved moduleType errors)
- Fixed team avatar paths (moved to public/images/team/)
- Created video playback fix documentation
- Resolved dev server React hydration errors
- Committed and pushed to GitHub (commit cdd9eb7)

**2026-08-13 (Session 3):**
- Fixed mobile video playback issues on Android, iOS, and all devices
- Added mobile-specific video attributes (playsInline, webkit-playsinline, x5-playsinline, x5-video-player-type)
- Implemented proper touch event handling with onTouchStart
- Increased play button size to 80x80px for better touch targets
- Added "Tap to play" text for clear user instruction
- Added loading indicator during video buffering
- Added error state with retry button for failed playback
- Improved device detection with iOS and Android flags
- Enhanced case study viewer modal video handling
- Created comprehensive mobile testing guide
- Updated AGENTS.md with mobile video rules
- All TypeScript checks pass, build successful
- Committed and pushed to GitHub (commit 8d93f6a)

**2026-08-13 (Session 2):**
- Completed Phase 4 (all 10 tasks)
- Created Astro Content Collections with Zod schemas
- Built Manifesto, Services, Portfolio, and Team sections
- Implemented single-modal portfolio architecture with Nano Store
- Created LucideIcon island for dynamic icon rendering
- Assembled complete homepage
- All TypeScript checks pass, build successful
- Phase 4 report generated

**2026-08-13 (Session 1):**
- Completed Phase 3 (all 10 tasks)
- Created R2 bucket `labxr-assets` with CORS
- Built FFmpeg video compression pipeline
- Created video player with lazy loading and iOS compatibility
- Built navigation with mobile menu and focus trapping
- Built footer with social links
- Built hero section with video background
- All TypeScript checks pass, build successful
- Phase 3 report generated

**2026-08-11:**
- Completed Phase 1 (foundation, Cloudflare Pages)
- Completed Phase 2 (design system, components)
- Completed Phase 2.5 (deferred UI primitives)
- Started Phase 3 (spec tracking)
- Installed Cloudflare Skills and MCP servers
- Authenticated Cloudflare MCP (OAuth)
- Discovered R2 needs to be enabled in dashboard
- Decided to continue without R2 for now (Tasks 3.2-3.9 don't need it)
- Committed and pushed all work to GitHub

**Next session will:**
- Wait for user to provide Phase 6 specification and instructions
- Execute tasks only when explicitly instructed