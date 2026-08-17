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

🔄 **Awaiting Phase 6 specification from user**

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

**Post-Phase 5 Fixes:**
- ✅ Fixed CSP policy blocking Plausible analytics and inline scripts (added `'unsafe-inline'` and `https://plausible.io`)
- ✅ Fixed corrupted JetBrains Mono font (was HTML, replaced with valid woff2)
- ✅ Fixed video playback on desktop (removed conflicting `<source>` elements and `crossOrigin="anonymous"`)
- ✅ Removed unused font preload (eliminated "preloaded but not used" warning)

**Deployment:**
- GitHub: https://github.com/eurythmia-interactive/labxr.art-web
- Last commit: 714dbdf - feat: separate cinematic hero from WebGL showcase (Phase 5.5)
- All code pushed to main branch
- Cloudflare Pages auto-deploys on push

---

## Architecture Decisions

### 1. Astro Islands Architecture
React components only where interactivity is needed. Static content uses pure Astro for performance.

### 2. Nano Stores for State
Cross-framework state management for:
- `$isMobile` - Device detection
- `$prefersReducedMotion` - Motion preferences
- `$isMobileMenuOpen` - UI state
- `$activeCaseStudyId` - Portfolio modal state
- `$formStatus` - Contact form status ('idle' | 'submitting' | 'success' | 'error')
- `$formError` - Contact form error message

### 3. CSS Variable Bridge Layer
shadcn components use standard tokens (`--background`, `--foreground`, etc.) mapped to custom LabXR tokens. This allows shadcn CLI to work while maintaining custom design system.

**Custom tokens:** `--color-bg-primary`, `--color-text-primary`, `--color-accent-primary`
**shadcn tokens:** `--background`, `--foreground`, `--primary` (mapped to custom tokens)

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