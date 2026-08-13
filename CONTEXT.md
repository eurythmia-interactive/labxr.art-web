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

🔄 **Awaiting Phase 5 specification from user**

**Phase 4 Task Status:**
- 4.0: ✅ DONE (spec tracking)
- 4.1: ✅ DONE (content collections with Zod schemas)
- 4.2: ✅ DONE (portfolio Nano Store)
- 4.3: ✅ DONE (manifesto section)
- 4.4: ✅ DONE (services section & cards)
- 4.5: ✅ DONE (portfolio grid)
- 4.6: ✅ DONE (case study viewer modal)
- 4.7: ✅ DONE (team section)
- 4.8: ✅ DONE (homepage assembly)
- 4.9: ✅ DONE (validation and report)

**Post-Phase 4 Fixes:**
- ✅ React 19.2.8 → 18.3.1 downgrade (fixed moduleType errors)
- ✅ Mobile video playback fixes (Android, iOS, all devices)
- ✅ Added mobile-specific video attributes (playsInline, webkit-playsinline, x5-playsinline)
- ✅ Enhanced touch event handling with onTouchStart
- ✅ Increased play button size to 80x80px for better touch targets
- ✅ Added "Tap to play" text for clear user instruction
- ✅ Implemented loading indicator during video buffering
- ✅ Added error state with retry button for failed playback
- ✅ Improved device detection with iOS and Android flags
- ✅ Enhanced case study viewer modal video handling
- ✅ Legacy-safe video encoding (H.264 Main profile Level 3.1, 720p, 2500kbps cap)
- ✅ Explicit codec strings for Android/iOS compatibility
- ✅ Stereo audio forcing for older Android devices
- ✅ Created comprehensive mobile video guide (docs/mobile-video-complete-guide.md)

**Deployment:**
- GitHub: https://github.com/eurythmia-interactive/labxr.art-web
- Last commit: 2a56c1f - fix: implement legacy-safe video encoding for maximum mobile compatibility
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
**Media:** VideoPlayerIsland, CaseStudyViewer
**Icons:** LucideIcon

### File Structure
```
src/
├── components/
│   ├── islands/      # React interactive components
│   │   ├── video-player-island.tsx
│   │   ├── case-study-viewer.tsx
│   │   ├── mobile-menu.tsx
│   │   └── lucide-icon.tsx
│   ├── sections/     # Astro page sections
│   │   ├── hero.astro
│   │   ├── manifesto.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   └── team.astro
│   ├── shared/       # Reusable Astro components
│   │   ├── video-player.astro
│   │   ├── navigation.astro
│   │   ├── footer.astro
│   │   └── service-card.astro
│   └── ui/           # shadcn/ui components
├── content/          # Astro Content Collections
│   ├── case-studies/ # Markdown files for projects
│   ├── services/     # Markdown files for services
│   └── team/         # Markdown files for team members
├── layouts/          # BaseLayout.astro
├── lib/              # Utilities, stores, hooks
│   ├── stores/       # Nano Stores (device, motion, ui, portfolio)
│   ├── hooks/        # React hooks (use-device, use-motion, use-intersection-observer)
│   ├── video/        # Video types and constants
│   └── utils.ts      # cn() utility for Tailwind
├── pages/            # Astro pages
│   ├── index.astro   # Homepage (hero, manifesto, services, portfolio, team)
│   └── dev/          # Diagnostic routes
│       ├── health.astro
│       ├── design-system.astro
│       └── video-player.astro
└── styles/           # global.css, tokens.css
```

---

## Next Steps

### Current Status: WAITING FOR USER INSTRUCTIONS

**Operational Rule:** Do not proceed with any tasks unless explicitly instructed by the user.

Phase 4 is complete. Awaiting Phase 5 specification and task instructions from user.

### Deferred (Phase 5+)
- GSAP ScrollTrigger animations
- Three.js / WebGL particle systems
- Contact form with Cloudflare Worker + Turnstile
- Service card video hover previews
- Lucide icon bundle optimization
- Custom domain setup
- Analytics integration

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
2. Read `docs/phase-4-report.md` for Phase 4 completion details
3. Read `docs/mobile-video-fix.md` for mobile video compatibility details
4. Wait for Phase 5 specification from user

### Key Files to Know
- `AGENTS.md` - Project rules and constraints (includes mobile video rules)
- `03-Phase-04.md` - Phase 4 specification (complete)
- `docs/phase-4-report.md` - Phase 4 completion report
- `docs/mobile-video-complete-guide.md` - Comprehensive mobile video guide (codecs, encoding, browser quirks)
- `docs/mobile-video-fix.md` - Mobile video compatibility fixes
- `docs/mobile-video-testing.md` - Mobile testing guide
- `docs/media-pipeline.md` - Video pipeline documentation
- `specs/phase-4/STATUS.md` - Phase 4 task tracking (all DONE)

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
- Wait for user to provide Phase 5 specification and instructions
- Execute tasks only when explicitly instructed