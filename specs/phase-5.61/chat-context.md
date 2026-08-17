# LabXR.art — Complete Session Context Document

**Purpose:** This document provides full context for a new AI session to continue working on the LabXR.art project. Read this entirely before taking any action.

---

## 1. PROJECT IDENTITY

**What:** LabXR.art is a B2B portfolio website for a creative technology lab based in CDMX, Mexico. It bridges "Code and Cinema," offering white-label interactive installations, WebGL experiences, and real-time video systems to top-tier advertising agencies in Latin America.

**Positioning:** LabXR is the "secret technical arm" that agencies hire when they need to deliver interactive/technological experiences to their brand clients. The website itself serves as a technical demonstration of high-performance media delivery.

**Target Audience:** Creative Directors, Technical Directors, and Producers at advertising agencies in CDMX and LatAm (e.g., Wieden+Kennedy, Ogilvy, León, etc.)

**Live URL:** https://labxr-art-web.pages.dev  
**Repository:** https://github.com/eurythmia-interactive/labxr.art-web  
**Status:** ✅ Phase 5 Complete, Awaiting Phase 6 Specification

---

## 2. TECH STACK (Exact Versions)

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Astro | 5.17.3 | Islands architecture, static output |
| UI Islands | React | 18.3.1 | Downgraded from 19 due to `moduleType` errors |
| Styling | Tailwind CSS | 3.4.19 | Mobile-first, custom design tokens |
| Components | shadcn/ui | Latest | New York style, dark cinematic theme |
| State | Nano Stores | 1.0.1 | Cross-framework state management |
| Animation | GSAP + ScrollTrigger | 3.12+ | Cinematic scroll reveals |
| 3D | Three.js via @react-three/fiber | v8.x | R3F v8 (NOT v9), drei v9.x |
| Hosting | Cloudflare Pages | — | Auto-deploys on push to main |
| Media Storage | Cloudflare R2 | — | Bucket: `labxr-assets`, WNAM region |
| Forms | Cloudflare Pages Functions | — | Serverless form handler |
| Icons | Lucide React | — | Optimized via icon registry (6.82KB) |
| Analytics | Plausible | — | Cookieless, privacy-focused |
| Package Manager | npm | 10.9.8 | NOT bun |
| Node.js | Node | 22.23.2 local / 22.22.0 Cloudflare | `.nvmrc` set to 22 |
| Video Processing | FFmpeg | 6.1.1 | Legacy-safe encoding pipeline |
| CLI | Wrangler | 4.121.0 | Cloudflare CLI |

### Critical Dependency Constraints
- **DO NOT** install `@react-three/fiber@9` (requires React 19)
- **DO NOT** install `@react-three/drei@10` (requires R3F v9)
- **DO NOT** install any package with `peerDependencies: { "react": ">=19" }`
- React MUST stay at 18.3.1

---

## 3. COMPLETED PHASES

### ✅ Phase 1 — Foundation
- Astro project bootstrapped with TypeScript strict mode
- Cloudflare Pages connected and deployed
- Health check route at `/dev/health`
- Path aliases configured (`@/*`, `@components/*`, `@lib/*`, etc.)

### ✅ Phase 2 — Design System
- Design tokens defined (colors, typography, spacing, shadows)
- Tailwind theme extended with CSS variables
- Typography: Inter (sans) + JetBrains Mono (mono), locally hosted `.woff2`
- shadcn/ui initialized with core components
- Nano Stores for global state (`$isMobile`, `$prefersReducedMotion`, `$isMobileMenuOpen`)
- Reusable layout components: Container, Section, Grid, Heading, Text, SkipNav
- Accessibility foundation (focus utilities, skip nav)

### ✅ Phase 2.5 — Deferred UI Primitives
- Installed missing shadcn components: Dialog, Tooltip, Textarea, Separator
- Created `BaseLayout.astro` with SEO meta tags and font preloading
- Created `/dev/design-system` diagnostic route
- CSS Variable Bridge Layer: shadcn tokens (`--background`, `--foreground`, `--primary`) mapped to custom LabXR tokens

### ✅ Phase 3 — Site Chrome, Hero Section, Video Infrastructure
- Cloudflare R2 bucket `labxr-assets` created with CORS
- FFmpeg video compression pipeline (legacy-safe encoding)
- Video player with lazy loading, iOS/Android compatibility
- Navigation with mobile menu and focus trapping
- Footer with social links
- Hero section with video background
- Video player diagnostic route at `/dev/video-player`

### ✅ Phase 4 — Data Architecture, Core Sections, Portfolio Integration
- Astro Content Collections with Zod schemas (case-studies, services, team)
- Manifesto section (split-screen layout)
- Services section with cards
- Portfolio section with single-modal architecture
- Team section with editorial cards
- Homepage fully assembled
- LucideIcon island for dynamic icon rendering

### ✅ Phase 5 — Polish, Interaction, WebGL, Conversion & Performance Recovery
- Lucide icon bundle: 928KB → 6.82KB (99.3% reduction) via icon registry
- GSAP ScrollTrigger cinematic section reveals on all sections
- Three.js reactive particle overlay in Hero (desktop only, 1500 particles)
- Contact form with Cloudflare Worker, Turnstile (optional), rate limiting, honeypot
- Service card video hover previews (desktop only)
- Plausible analytics with 8 custom conversion events
- Custom domain setup documentation
- Performance audit: Lighthouse 90+ target
- Fixed CSP policy, corrupted font, and video playback issues

---

## 4. ARCHITECTURE DECISIONS

### 4.1 Astro Islands Architecture
- Static content uses pure Astro (`.astro` files)
- React (`.tsx`) ONLY for interactive components requiring state, events, or WebGL
- Hydration directives: `client:visible` or `client:idle` preferred. `client:load` only for critical above-fold. `client:only="react"` for Three.js/WebGL.

### 4.2 Nano Stores for Cross-Framework State
- `$isMobile` — Device detection (boolean)
- `$prefersReducedMotion` — Motion preference (boolean)
- `$isMobileMenuOpen` — Mobile menu state (boolean)
- `$activeCaseStudyId` — Portfolio modal state (string | null)
- `$formStatus` — Contact form state ('idle' | 'submitting' | 'success' | 'error')

### 4.3 CSS Variable Bridge Layer
Custom LabXR tokens → shadcn standard tokens:
- `--color-bg-primary` → `--background`
- `--color-text-primary` → `--foreground`
- `--color-accent-primary` → `--primary`

### 4.4 Single-Modal Portfolio Architecture
- ONE React island (`CaseStudyViewer`) handles ALL case study modals
- Nano Store (`$activeCaseStudyId`) drives which case study is active
- Video player unmounts when modal closes (memory management)
- This prevents N separate React trees for N portfolio items

### 4.5 Mobile Video Compatibility Strategy
- Legacy-safe encoding: H.264 Main Profile Level 3.1, 720p, 2500kbps cap
- Pixel format: `yuv420p` (universal)
- Container: MP4 with `+faststart`
- Audio: AAC stereo (2 channels)
- Explicit codec string: `avc1.4D401F`
- Mobile attributes: `playsinline`, `webkit-playsinline`, `x5-playsinline`, `x5-video-player-type="h5"`
- Touch targets: minimum 80x80px play buttons
- Desktop: autoplay muted. Mobile: tap-to-play overlay.
- Lazy loading via IntersectionObserver
- Memory management: pause + remove src when off-screen

### 4.6 Three.js / WebGL Strategy
- Desktop only (no canvas on mobile)
- Respects `$prefersReducedMotion`
- WebGL detection before rendering
- Custom shaders (vertex + fragment) for particles
- Pixel ratio capped at 1.5
- All resources disposed on unmount
- Code-split: 873KB chunk loaded separately, NOT in initial bundle
- Error boundary wraps the canvas

### 4.7 Performance Strategy
- Initial JS: ~43KB gzipped
- Three.js: code-split, desktop only
- GSAP: code-split, loaded after FCP
- All videos lazy-loaded
- All images lazy-loaded
- Zero CLS (aspect ratios enforced)
- Analytics script deferred

---

## 5. DESIGN SYSTEM

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0a` | Deep black, primary bg |
| Foreground | `#ffffff` | White, primary text |
| Primary Accent | `#00d4ff` | Cyan, CTAs, highlights |
| Secondary | `#1a1a1a` | Dark gray, cards |
| Muted | `#2a2a2a` | Medium gray, borders |

### Typography
- **Sans:** Inter (Regular, Medium, SemiBold, Bold) — locally hosted
- **Mono:** JetBrains Mono (Regular) — locally hosted
- All fonts use `font-display: swap`
- Total font weight: ~106KB (5 woff2 files)

### Spacing
7-step scale based on 4px grid: xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48), 3xl(64)

### Border Radius
sm(4px), md(8px), lg(16px), full(9999px)

---

## 6. FILE STRUCTURE

```
labxr.art-web/
├── functions/
│   └── api/
│       └── contact.ts              # Cloudflare Pages Function (form handler)
├── public/
│   ├── _headers                    # Security headers + CSP
│   ├── _redirects                  # www → non-www
│   ├── fonts/                      # Inter + JetBrains Mono woff2
│   └── images/
├── scripts/
│   ├── compress-video.sh           # FFmpeg compression pipeline
│   └── upload-to-r2.sh            # R2 upload script
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── shaders/
│   │   │   ├── particles.vert      # Three.js vertex shader
│   │   │   └── particles.frag      # Three.js fragment shader
│   │   └── videos/
│   ├── components/
│   │   ├── islands/                # React interactive components
│   │   │   ├── case-study-viewer.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── hero-webgl.tsx
│   │   │   ├── icon-registry.ts
│   │   │   ├── lucide-icon.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   ├── scroll-reveal.tsx
│   │   │   └── video-player-island.tsx
│   │   ├── sections/               # Astro page sections
│   │   │   ├── hero.astro
│   │   │   ├── manifesto.astro
│   │   │   ├── services.astro
│   │   │   ├── portfolio.astro
│   │   │   ├── team.astro
│   │   │   └── contact.astro
│   │   ├── shared/                 # Reusable Astro components
│   │   │   ├── container.astro
│   │   │   ├── section.astro
│   │   │   ├── heading.astro
│   │   │   ├── text.astro
│   │   │   ├── skip-nav.astro
│   │   │   ├── navigation.astro
│   │   │   ├── footer.astro
│   │   │   ├── service-card.astro
│   │   │   ├── video-player.astro
│   │   │   └── whatsapp-button.astro
│   │   └── ui/                     # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── tooltip.tsx
│   │       └── separator.tsx
│   ├── content/                    # Astro Content Collections
│   │   ├── case-studies/
│   │   ├── services/
│   │   └── team/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── gsap/
│   │   │   └── register-plugins.ts
│   │   ├── hooks/
│   │   │   ├── use-device.ts
│   │   │   ├── use-motion.ts
│   │   │   └── use-intersection-observer.ts
│   │   ├── stores/
│   │   │   ├── device.ts
│   │   │   ├── motion.ts
│   │   │   ├── ui.ts
│   │   │   ├── portfolio.ts
│   │   │   └── form.ts
│   │   ├── three/
│   │   │   └── webgl-detect.ts
│   │   ├── video/
│   │   │   ├── types.ts
│   │   │   └── constants.ts
│   │   ├── analytics.ts
│   │   ├── focus.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   └── dev/
│   │       ├── health.astro
│   │       ├── design-system.astro
│   │       ├── video-player.astro
│   │       └── webgl.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css
│   └── content.config.ts           # Zod schemas for collections
├── specs/                          # Phase specifications
│   ├── phase-1/
│   ├── phase-2/
│   ├── phase-2.5/
│   ├── phase-3/
│   ├── phase-4/
│   └── phase-5/
├── docs/                           # Documentation
│   ├── phase-1-report.md
│   ├── phase-2-report.md
│   ├── phase-3-report.md
│   ├── phase-4-report.md
│   ├── phase-5-report.md
│   ├── mobile-video-complete-guide.md
│   ├── media-pipeline.md
│   ├── cloudflare-setup.md
│   ├── custom-domain-setup.md
│   ├── analytics-setup.md
│   ├── design-system.md
│   └── DEVELOPMENT-WORKFLOW.md
├── infra/
│   └── cloudflare/
│       ├── pages-plan.md
│       ├── r2-plan.md
│       ├── dns-plan.md
│       ├── cors-policy.md
│       └── workers-plan.md
├── AGENTS.md                       # AI agent rules
├── CONTEXT.md                      # Session context
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── components.json                 # shadcn config
└── .env.example
```

---

## 7. RULES & CONSTRAINTS (CRITICAL)

### Operational Rule
- **NEVER take action unless explicitly instructed by the user.**
- Do not start tasks, create files, run commands, or make changes without explicit permission.
- Do not proceed to the next task automatically.
- Wait for the user to provide phase plans, task instructions, and approval.

### Architectural Rules
- Zero JS by default. Use `.astro` for static content.
- React ONLY for interactivity (state, events, WebGL).
- `client:only="react"` for Three.js. Never SSR.
- `client:visible` or `client:idle` preferred over `client:load`.
- No CLS: enforce aspect ratios on all media.

### Styling Rules
- Mobile-first: base CSS for mobile, `md:`/`lg:`/`xl:` for desktop.
- Dark theme default. WCAG AA contrast.
- Use CSS variables, never hardcode colors.
- shadcn/ui for forms, buttons, modals.

### Media & Video Rules
- Videos NEVER preload. Use `preload="none"` + IntersectionObserver.
- iOS: NEVER rely on autoplay. Always poster + tap-to-play.
- Android: Add `webkit-playsinline`, `x5-playsinline`, `x5-video-player-type="h5"`.
- Touch targets: minimum 80x80px.
- Memory: pause + remove src when off-screen or modal closes.
- Error handling: retry button + loading indicator.
- Encoding: H.264 Main Profile Level 3.1, 720p, yuv420p, +faststart, AAC stereo, 2500kbps cap.

### WebGL / Three.js Rules
- Mobile fallback: no canvas on mobile. Static image or CSS gradient.
- Desktop max 2000 particles.
- Custom shaders over heavy materials.
- Dispose ALL resources on unmount.
- Pixel ratio capped at 1.5.
- Pause rendering when tab hidden.

### GSAP Rules
- Respect `prefers-reduced-motion`.
- Animate ONLY `transform` and `opacity`.
- Kill ScrollTriggers on unmount.
- Use `useGSAP` hook for React cleanup.

### Accessibility
- Semantic HTML.
- Focus trapping in modals.
- Error boundaries around React islands.
- SkipNav component.

---

## 8. PERFORMANCE METRICS

| Metric | Value |
|--------|-------|
| Initial JS (gzipped) | ~43KB |
| Lucide Icons | 6.82KB (was 928KB) |
| Three.js chunk | 873KB (236KB gzip, desktop only, code-split) |
| GSAP | ~45KB (code-split, after FCP) |
| Build time | ~7.4 seconds |
| Pages built | 5 |
| TypeScript errors | 0 |
| Lighthouse target | 90+ all categories |
| CLS | 0 |

---

## 9. CONTENT STATUS

| Collection | Entries | Status |
|-----------|---------|--------|
| Case Studies | 2 | Placeholder |
| Services | 2 | Placeholder (with video hover) |
| Team | 2 | Placeholder (SVG avatars) |
| Videos | 1 | Test video (legacy-safe encoding) |
| Logo | — | Placeholder |

---

## 10. PENDING HUMAN ACTIONS

- [ ] Provide real video assets (showreel, case studies)
- [ ] Provide real team member photos
- [ ] Provide company logo SVG
- [ ] Provide Cloudflare Turnstile Site Key + Secret Key
- [ ] Provide webhook URL for contact form (Discord/Slack)
- [ ] Provide WhatsApp number with country code
- [ ] Set up custom domain DNS (see `docs/custom-domain-setup.md`)
- [ ] Set up Plausible analytics account
- [ ] Provide Phase 6 specification

---

## 11. NEXT STEPS (Phase 6 Preview)

Phase 6 will focus on **Content Production & SEO**:

1. Replace placeholder videos with real project showreels
2. Add real team member photos and company logo
3. Write real case study content
4. Add JSON-LD structured data
5. Generate sitemap.xml
6. Create Open Graph images
7. Set up Lighthouse CI for performance monitoring
8. A/B testing for CTAs and form fields
9. Client Portal (V2) with Cloudflare Access
10. Blog/Insights section for organic SEO
11. English translation for global agency outreach

**Status:** ⏸️ Awaiting user to provide Phase 6 specification.

---

## 12. DEVELOPMENT COMMANDS

```bash
# Start dev server
npm run dev

# Production build
npm run build

# Type check
npm run check

# Format code
npm run format

# Compress video
./scripts/compress-video.sh input.mp4

# Check Wrangler version
wrangler --version

# Check FFmpeg version
ffmpeg -version
```

---

## 13. TROUBLESHOOTING

### Video Not Playing on Mobile
- Check encoding: `ffprobe video.mp4`
- Should show: `profile=Main`, `level=31`, `pix_fmt=yuv420p`, `channels=2`
- If not, re-encode with legacy-safe settings
- Clear browser cache and hard refresh

### Dev Server Errors
- If seeing `moduleType` errors, ensure React 18.3.1 is installed
- Clear `.astro` and `node_modules/.vite` cache
- Run `npm install` again

### Build Fails
- Run `npm run check` to see TypeScript errors
- Fix all errors before building
- Check for missing imports or type mismatches

---

## 14. SESSION START PROTOCOL

On every new session, BEFORE doing anything else:

1. Read this document completely.
2. Read `AGENTS.md` for project rules.
3. Read `docs/PROJECT-STATUS.md` for latest status.
4. Read the latest phase report in `docs/`.
5. **Wait for user instructions before taking any action.**
6. Do NOT proceed with any tasks unless explicitly instructed.

---

## 15. KEY CONVENTIONS

- **Commits:** Conventional commits (`feat:`, `fix:`, `chore:`, `perf:`, `docs:`)
- **TypeScript:** Strict mode, no `any` types
- **Styling:** Tailwind utility classes, CSS variables for colors
- **Components:** Astro for static, React for interactive
- **State:** Nano Stores for cross-framework, React Context only inside islands
- **File naming:** kebab-case for files, PascalCase for React components, camelCase for utilities
- **Sections:** Wrapped in `<Section>` and `<Container>` primitives
- **Animations:** GSAP with ScrollTrigger, respects reduced motion
- **Icons:** Use `icon-registry.ts` (explicit named imports only)

---

*Document generated: 2026-08-16*  
*Project status: Phase 5 Complete, Awaiting Phase 6*  
*All systems operational.*