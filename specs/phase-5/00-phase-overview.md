# Phase 5 — Polish, Interaction, WebGL, Conversion & Performance Recovery

## Phase Overview

**Phase Name:** Phase 5 — Polish, Interaction, WebGL, Conversion & Performance Recovery  
**Duration:** Estimated 8-10 hours  
**Dependencies:** Phase 4 complete  
**Next Phase:** Phase 6 — Content Production & SEO

---

## 1. Phase Objectives

Transform the LabXR website from a structurally complete portfolio into a cinematic, interactive experience that converts B2B leads while recovering critical performance debt accumulated in Phase 4.

### Primary Goals

1. **Fix Lucide Icon Bundle** — Reduce from 928KB to <50KB via explicit registry
2. **Add GSAP ScrollTrigger** — Cinematic section reveals on scroll
3. **Add Three.js/WebGL** — Reactive particle overlay in Hero (desktop only)
4. **Build Contact Form** — UI + Cloudflare Worker + Turnstile CAPTCHA
5. **Add Service Card Video Hover** — Video previews on card hover (desktop)
6. **Integrate Analytics** — Privacy-focused, cookieless event tracking
7. **Performance Audit** — Achieve Lighthouse 90+ across all categories
8. **Custom Domain Docs** — Document DNS setup for human execution
9. **Phase 5 Validation** — Comprehensive testing and documentation

### Success Criteria

- [ ] Lucide icon chunk reduced from 928KB to <50KB
- [ ] All sections animate cinematically on scroll (respecting reduced motion)
- [ ] Three.js particle field renders in Hero (desktop only)
- [ ] Mobile/no-WebGL devices show static gradient fallback
- [ ] Contact form submits qualified B2B leads through spam-protected Worker
- [ ] Conversion events tracked without cookies
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Custom domain setup documented
- [ ] `npm run check` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] No console errors on any page
- [ ] Homepage loads in <2.5 seconds on 4G

---

## 2. Non-Goals

- Do not rebuild or restructure existing sections (Hero, Manifesto, Services, Portfolio, Team)
- Do not modify the video encoding pipeline or FFmpeg scripts
- Do not change Content Collection Zod schemas
- Do not implement the Webcam Mirror (deferred to V2)
- Do not implement adaptive bitrate streaming (HLS/DASH)
- Do not implement Picture-in-Picture
- Do not add AV1 codec support
- Do not modify the BaseLayout SEO meta tag structure
- Do not install or configure a CMS
- Do not set up the custom domain DNS (human action — document only)

---

## 3. Required Human Inputs

Before OPENCODE AI can fully complete Phase 5, the human developer must provide:

1. **Cloudflare Turnstile Site Key** — Required for the contact form CAPTCHA
2. **Cloudflare Turnstile Secret Key** — Required for the Worker (stored in Cloudflare, never in Git)
3. **Webhook URL** — Discord/Slack webhook endpoint for form submissions
4. **WhatsApp Number** — For the floating CTA button (with country code, e.g., `5215512345678`)
5. **Analytics Preference** — Plausible or Umami (default: Plausible)
6. **Real Logo SVG** — If available (otherwise continue with placeholder)
7. **Custom Domain Registrar Access** — For DNS documentation (human-only action)

*If Turnstile keys are not yet available, OPENCODE must build the form UI and Worker with a `TURNSTILE_ENABLED=false` flag that can be toggled later.*

---

## 4. Task Breakdown

### Task 5.0 — Phase 5 Specification Tracking
**Status:** IN_PROGRESS  
**Objective:** Create tracking files for Phase 5 tasks

**Deliverables:**
- `specs/phase-5/00-phase-overview.md`
- `specs/phase-5/STATUS.md`

**Definition of Done:**
- Both files exist
- All tasks listed with status `NOT_STARTED`
- No application code written

---

### Task 5.1 — Lucide Icon Bundle Optimization (CRITICAL)
**Status:** NOT_STARTED  
**Objective:** Reduce the `lucide-icon.tsx` chunk from 928KB to <50KB

**Deliverables:**
- `src/components/islands/icon-registry.ts` — Explicit named imports
- Refactored `src/components/islands/lucide-icon.tsx` — Uses registry

**Definition of Done:**
- `icon-registry.ts` exists with explicit named imports
- `lucide-icon.tsx` uses the registry
- Build output shows icon chunk < 50KB
- All existing icons still render correctly
- No visual regressions

---

### Task 5.2 — GSAP Foundation & Section Reveals
**Status:** NOT_STARTED  
**Objective:** Add cinematic scroll-triggered animations to all sections

**Deliverables:**
- `src/lib/gsap/register-plugins.ts` — Single GSAP registration
- `src/components/islands/scroll-reveal.tsx` — GSAP wrapper island
- Updated section components with ScrollReveal wrappers

**Definition of Done:**
- GSAP is installed and registered
- `ScrollReveal` island works correctly
- All sections animate on scroll
- Reduced motion preference disables all animations
- No ghost animations after navigation
- Build size increase from GSAP is < 30KB gzipped

---

### Task 5.3 — Three.js Hero Particle Overlay
**Status:** NOT_STARTED  
**Objective:** Add a reactive WebGL particle field to the Hero section (desktop only)

**Deliverables:**
- `src/lib/three/webgl-detect.ts` — WebGL capability check
- `src/assets/shaders/particles.vert` — Vertex shader
- `src/assets/shaders/particles.frag` — Fragment shader
- `src/components/islands/hero-webgl.tsx` — Three.js particle canvas
- Updated `src/components/sections/hero.astro` — Add WebGL layer
- `src/pages/dev/webgl.astro` — WebGL diagnostic route

**Definition of Done:**
- Particles render and react to mouse on desktop
- Mobile shows no canvas (video background only)
- Reduced motion shows no canvas
- WebGL fallback works (no console errors if WebGL unavailable)
- Memory is freed when navigating away
- Build does not include Three.js in the initial page load chunk
- `/dev/webgl` diagnostic route works

---

### Task 5.4 — Contact Form UI + Cloudflare Worker + Turnstile
**Status:** NOT_STARTED  
**Objective:** Build a spam-protected B2B lead capture form with serverless processing

**Deliverables:**
- `src/lib/stores/form.ts` — Form submission state
- `src/components/islands/contact-form.tsx` — Form island
- `src/components/sections/contact.astro` — Contact section
- `src/components/shared/whatsapp-button.astro` — Floating CTA
- `functions/api/contact.ts` — Form submission handler
- Updated `.env.example` — Add Turnstile keys
- Updated `public/_headers` — CSP for Turnstile

**Definition of Done:**
- Form renders with all fields and validation
- Form submits to `/api/contact`
- Worker validates, checks Turnstile, enforces rate limit
- Webhook receives formatted submission
- Honeypot blocks bots silently
- Success/error states display correctly
- WhatsApp floating button works
- No secrets in Git

---

### Task 5.5 — Service Card Video Hover Previews
**Status:** NOT_STARTED  
**Objective:** Add lightweight video previews that play on hover for service cards

**Deliverables:**
- Updated `src/content/config.ts` — Add optional previewVideoUrl fields
- Updated `src/components/shared/service-card.astro` — Video hover logic
- Updated placeholder service content

**Definition of Done:**
- Desktop hover plays the preview video
- Mouse leave stops and unloads the video
- Mobile shows static cards (no hover behavior)
- No console errors
- Memory is freed after hover ends

---

### Task 5.6 — Analytics Integration
**Status:** NOT_STARTED  
**Objective:** Add privacy-focused, cookieless analytics with conversion tracking

**Deliverables:**
- Updated `src/layouts/BaseLayout.astro` — Add Plausible script
- `src/lib/analytics.ts` — Event tracking function
- Updated components with `trackEvent()` calls
- `docs/analytics-setup.md` — Analytics documentation

**Definition of Done:**
- Analytics script loads with `defer`
- Custom events fire correctly
- No console errors
- Documentation is complete
- No cookies are set

---

### Task 5.7 — Performance Audit & Optimization
**Status:** NOT_STARTED  
**Objective:** Achieve Lighthouse 90+ on all categories

**Deliverables:**
- Lighthouse audit results
- Performance optimizations
- Bundle size documentation

**Definition of Done:**
- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 90
- Lighthouse Best Practices ≥ 90
- Lighthouse SEO ≥ 90
- All bundle sizes documented
- No render-blocking resources
- Results recorded in Phase 5 report

---

### Task 5.8 — Custom Domain Documentation
**Status:** NOT_STARTED  
**Objective:** Document the DNS setup process for the human to execute

**Deliverables:**
- `docs/custom-domain-setup.md` — Step-by-step DNS instructions
- Updated `public/_redirects` — www to non-www redirect

**Definition of Done:**
- Documentation is complete and actionable
- Redirect rules are in place
- Human can follow the guide without additional research

---

### Task 5.9 — Phase 5 Validation & Report
**Status:** NOT_STARTED  
**Objective:** Document completion and validate all Phase 5 deliverables

**Deliverables:**
- Updated `specs/phase-5/STATUS.md`
- `docs/phase-5-report.md` — Comprehensive completion report

**Definition of Done:**
- All Phase 5 tasks marked `DONE`
- `npm run check` passes with 0 errors
- `npm run build` completes successfully
- Lighthouse scores documented
- Phase 5 report generated
- Code committed and pushed to GitHub

---

## 5. Execution Sequence

```
Task 5.0 (5 min) ← Spec tracking
  ↓
Task 5.1 (30 min) ← Lucide bundle optimization (CRITICAL)
  ↓
Task 5.2 (45 min) ← GSAP foundation & reveals
  ↓
Task 5.3 (60 min) ← Three.js hero particles
  ↓
Task 5.4 (90 min) ← Contact form + Worker + Turnstile
  ↓
Task 5.5 (30 min) ← Service card video hover
  ↓
Task 5.6 (30 min) ← Analytics integration
  ↓
Task 5.7 (45 min) ← Performance audit
  ↓
Task 5.8 (20 min) ← Custom domain docs
  ↓
Task 5.9 (30 min) ← Validation & report
```

**Total estimated time:** ~6-7 hours

---

## 6. Prerequisites

- [x] Phase 4 complete (content collections, portfolio modal, all core sections)
- [x] Astro 5.17.3 installed
- [x] React 18.3.1 installed
- [x] Nano Stores installed
- [x] shadcn/ui components (Card, Dialog, Input, Textarea, Button) installed
- [x] lucide-react installed
- [x] Mobile video playback optimized
- [x] TypeScript strict mode configured

---

## 7. Global Rules for Phase 5

### 7.1 Performance Recovery Rules (CRITICAL)
- **No new JS may be added until the Lucide bundle is fixed.** Task 5.1 is a hard prerequisite.
- **Total page JS budget:** < 200KB gzipped for the initial page load.
- **Three.js must be code-split.** It must load ONLY when the Hero is visible, never in the initial bundle.
- **GSAP must be code-split.** Load it after First Contentful Paint.
- **All new dependencies must be React 18.3.1 compatible.** Do NOT install packages that require React 19.

### 7.2 GSAP Rules
- **Register plugins once.** Use `gsap.registerPlugin(ScrollTrigger)` in a single shared module.
- **Use `@gsap/react` `useGSAP` hook** for automatic cleanup in React islands.
- **In Astro components**, use `<script>` tags with manual `ScrollTrigger.getAll().forEach(t => t.kill())` cleanup.
- **Animate ONLY `transform` and `opacity`.** Never animate `top`, `left`, `width`, `height`, `margin`, or `padding`.
- **Respect `$prefersReducedMotion`.** If true, skip all GSAP animations and show content immediately.
- **Use `will-change: transform` sparingly** — only on elements about to animate, remove after animation completes.

### 7.3 Three.js / WebGL Rules
- **NEVER render Three.js server-side.** Use `client:only="react"` exclusively.
- **Detect WebGL2 support before rendering.** If unsupported, render a CSS gradient fallback.
- **Detect mobile via `$isMobile` store.** If mobile, render CSS fallback instead of Canvas.
- **Limit particle count:** Desktop max 2000 particles. No particles on mobile.
- **Use custom shaders** (vertex + fragment) instead of heavy materials.
- **Dispose ALL resources on unmount:** geometries, materials, textures, render targets.
- **Cap pixel ratio at 1.5** to prevent GPU overload on high-DPI screens.
- **Use `requestAnimationFrame` with visibility check.** Pause rendering when tab is hidden.

### 7.4 Contact Form Rules
- **Client-side validation with Zod** before submission.
- **Server-side validation in the Worker** (never trust the client).
- **Turnstile verification in the Worker** before processing the payload.
- **Rate limiting:** Max 3 submissions per IP per 10 minutes.
- **Honeypot field:** Hidden input that bots fill but humans don't see.
- **No secrets in Git.** Worker secrets live in Cloudflare dashboard environment variables.

### 7.5 Analytics Rules
- **No cookies.** Use Plausible or Umami in cookieless mode.
- **Track custom events:** video plays, form submissions, WhatsApp clicks, modal opens.
- **Defer analytics script.** Load with `defer` attribute, never blocking render.

### 7.6 React 18 Compatibility Rules
- **@react-three/fiber:** Use v8.x (NOT v9 which requires React 19).
- **@react-three/drei:** Use v9.x (compatible with R3F v8).
- **three:** Use latest stable (0.16x+).
- **@gsap/react:** Use v2.x.
- **Verify all package.json entries** are compatible with `"react": "^18.3.1"`.

---

## 8. Dependency Version Lock

To prevent installing React 19-only packages:

```json
{
  "dependencies": {
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.114.0",
    "gsap": "^3.12.0",
    "@gsap/react": "^2.1.0"
  }
}
```

**DO NOT install:**
- `@react-three/fiber@9` (requires React 19)
- `@react-three/drei@10` (requires R3F v9)
- Any package with `peerDependencies: { "react": ">=19" }`

---

## 9. Phase 5 Definition of Done

Phase 5 is complete only when ALL of the following are true:

### Performance Recovery
- [ ] Lucide icon chunk is < 50KB (was 928KB)
- [ ] Initial page JS is < 150KB gzipped
- [ ] Three.js is code-split and NOT in initial bundle
- [ ] GSAP is code-split and loaded after FCP

### GSAP Animations
- [ ] All sections animate on scroll
- [ ] Animations use only `transform` and `opacity`
- [ ] `$prefersReducedMotion` disables all animations
- [ ] No ghost animations after navigation
- [ ] ScrollTrigger cleanup works correctly

### Three.js / WebGL
- [ ] Particles render on desktop
- [ ] Particles react to mouse movement
- [ ] Mobile shows NO canvas (video background only)
- [ ] Reduced motion shows NO canvas
- [ ] WebGL unavailable shows NO canvas (no errors)
- [ ] Memory is freed on unmount (no leaks)
- [ ] Pixel ratio capped at 1.5
- [ ] `/dev/webgl` diagnostic route works

### Contact Form
- [ ] Form renders with all fields
- [ ] Client-side Zod validation works
- [ ] Server-side Worker validation works
- [ ] Turnstile renders (if key provided)
- [ ] Honeypot blocks bots silently
- [ ] Rate limiting works (max 3 per 10 min)
- [ ] Webhook receives formatted submission
- [ ] Success/error states display correctly
- [ ] WhatsApp floating button works

### Service Card Hover
- [ ] Desktop hover plays preview video
- [ ] Mouse leave pauses and unloads video
- [ ] Mobile shows static cards
- [ ] No console errors

### Analytics
- [ ] Plausible script loads with `defer`
- [ ] Custom events fire correctly
- [ ] No cookies are set
- [ ] Documentation is complete

### Lighthouse Scores
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

### Documentation
- [ ] Custom domain setup guide exists
- [ ] Analytics setup guide exists
- [ ] Phase 5 report is generated
- [ ] All STATUS.md tasks marked DONE

---

**Phase 5 created:** 2026-08-15  
**Estimated duration:** 6-7 hours  
**Ready to start:** YES
