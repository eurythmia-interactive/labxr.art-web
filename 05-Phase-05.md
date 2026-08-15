# OPENCODE AI — LABXR.ART PHASE 5 SPEC

## Phase Name

**Phase 5 — Polish, Interaction, WebGL, Conversion & Performance Recovery**

---

# 1. OPENCODE AI ROLE

You are acting as a **Senior Creative Technologist, Interaction Engineer, and Performance Specialist**.

Your responsibility is to transform the LabXR website from a structurally complete portfolio into a cinematic, interactive experience that converts B2B leads — while simultaneously recovering critical performance debt accumulated in Phase 4.

You are not rebuilding any existing sections.
You are not modifying the video encoding pipeline.
You are not changing the content collection schemas.
You are not implementing adaptive bitrate streaming (HLS/DASH).

Your job in Phase 5 is to:

1. **Fix the Lucide icon bundle debt** (928KB → <50KB).
2. **Add GSAP ScrollTrigger** cinematic section reveals.
3. **Add Three.js/WebGL** particle overlay to the Hero.
4. **Build the Contact Form** with Cloudflare Worker + Turnstile.
5. **Add service card video hover previews**.
6. **Integrate privacy-focused analytics**.
7. **Run a full performance audit** and achieve Lighthouse 90+.
8. **Document custom domain setup** for human execution.
9. **Generate the Phase 5 validation report**.

---

# 2. PRIMARY OBJECTIVE

Deliver the "magic layer" that makes agency Directors of Innovation stop scrolling and book a demo — without sacrificing the sub-3-second load time that proves LabXR's technical competence.

At the end of Phase 5, the project must be able to:

- Load the homepage in under 2.5 seconds on 4G.
- Animate sections cinematically on scroll (respecting reduced motion).
- Render a reactive WebGL particle field in the Hero (desktop only).
- Gracefully fall back to a static gradient on mobile/no-WebGL devices.
- Submit a qualified B2B lead through a spam-protected form.
- Track conversion events without cookies.
- Score 90+ on Lighthouse Performance, Accessibility, and Best Practices.

---

# 3. NON-GOALS FOR PHASE 5

OPENCODE AI must not do any of the following during Phase 5:

- Do not rebuild or restructure existing sections (Hero, Manifesto, Services, Portfolio, Team).
- Do not modify the video encoding pipeline or FFmpeg scripts.
- Do not change Content Collection Zod schemas.
- Do not implement the Webcam Mirror (deferred to V2).
- Do not implement adaptive bitrate streaming (HLS/DASH).
- Do not implement Picture-in-Picture.
- Do not add AV1 codec support.
- Do not modify the BaseLayout SEO meta tag structure.
- Do not install or configure a CMS.
- Do not set up the custom domain DNS (human action — document only).

---

# 4. REQUIRED HUMAN INPUTS

Before OPENCODE AI can fully complete Phase 5, the human developer must provide:

1. **Cloudflare Turnstile Site Key** — Required for the contact form CAPTCHA.
2. **Cloudflare Turnstile Secret Key** — Required for the Worker (stored in Cloudflare, never in Git).
3. **Webhook URL** — Discord/Slack webhook endpoint for form submissions.
4. **WhatsApp Number** — For the floating CTA button (with country code, e.g., `5215512345678`).
5. **Analytics Preference** — Plausible or Umami (default: Plausible).
6. **Real Logo SVG** — If available (otherwise continue with placeholder).
7. **Custom Domain Registrar Access** — For DNS documentation (human-only action).

*If Turnstile keys are not yet available, OPENCODE must build the form UI and Worker with a `TURNSTILE_ENABLED=false` flag that can be toggled later.*

---

# 5. GLOBAL OPENCODE RULES FOR PHASE 5

## 5.1 Performance Recovery Rules (CRITICAL)
- **No new JS may be added until the Lucide bundle is fixed.** Task 5.1 is a hard prerequisite.
- **Total page JS budget:** < 200KB gzipped for the initial page load.
- **Three.js must be code-split.** It must load ONLY when the Hero is visible, never in the initial bundle.
- **GSAP must be code-split.** Load it after First Contentful Paint.
- **All new dependencies must be React 18.3.1 compatible.** Do NOT install packages that require React 19.

## 5.2 GSAP Rules
- **Register plugins once.** Use `gsap.registerPlugin(ScrollTrigger)` in a single shared module.
- **Use `@gsap/react` `useGSAP` hook** for automatic cleanup in React islands.
- **In Astro components**, use `<script>` tags with manual `ScrollTrigger.getAll().forEach(t => t.kill())` cleanup.
- **Animate ONLY `transform` and `opacity`.** Never animate `top`, `left`, `width`, `height`, `margin`, or `padding`.
- **Respect `$prefersReducedMotion`.** If true, skip all GSAP animations and show content immediately.
- **Use `will-change: transform` sparingly** — only on elements about to animate, remove after animation completes.

## 5.3 Three.js / WebGL Rules
- **NEVER render Three.js server-side.** Use `client:only="react"` exclusively.
- **Detect WebGL2 support before rendering.** If unsupported, render a CSS gradient fallback.
- **Detect mobile via `$isMobile` store.** If mobile, render CSS fallback instead of Canvas.
- **Limit particle count:** Desktop max 2000 particles. No particles on mobile.
- **Use custom shaders** (vertex + fragment) instead of heavy materials.
- **Dispose ALL resources on unmount:** geometries, materials, textures, render targets.
- **Cap pixel ratio at 1.5** to prevent GPU overload on high-DPI screens.
- **Use `requestAnimationFrame` with visibility check.** Pause rendering when tab is hidden.

## 5.4 Contact Form Rules
- **Client-side validation with Zod** before submission.
- **Server-side validation in the Worker** (never trust the client).
- **Turnstile verification in the Worker** before processing the payload.
- **Rate limiting:** Max 3 submissions per IP per 10 minutes.
- **Honeypot field:** Hidden input that bots fill but humans don't see.
- **No secrets in Git.** Worker secrets live in Cloudflare dashboard environment variables.

## 5.5 Analytics Rules
- **No cookies.** Use Plausible or Umami in cookieless mode.
- **Track custom events:** video plays, form submissions, WhatsApp clicks, modal opens.
- **Defer analytics script.** Load with `defer` attribute, never blocking render.

## 5.6 React 18 Compatibility Rules
- **@react-three/fiber:** Use v8.x (NOT v9 which requires React 19).
- **@react-three/drei:** Use v9.x (compatible with R3F v8).
- **three:** Use latest stable (0.16x+).
- **@gsap/react:** Use v2.x.
- **Verify all package.json entries** are compatible with `"react": "^18.3.1"`.

---

# 6. PHASE 5 FOLDER STRUCTURE TARGET

OPENCODE AI must create or update the following:

```text
labxr-web/
├── functions/                          # Cloudflare Pages Functions (NEW)
│   └── api/
│       └── contact.ts                  # Form submission handler
├── src/
│   ├── assets/
│   │   └── shaders/
│   │       ├── particles.vert          # Vertex shader (NEW)
│   │       └── particles.frag          # Fragment shader (NEW)
│   ├── components/
│   │   ├── islands/
│   │   │   ├── hero-webgl.tsx          # Three.js particle canvas (NEW)
│   │   │   ├── contact-form.tsx        # Form island (NEW)
│   │   │   ├── scroll-reveal.tsx       # GSAP wrapper island (NEW)
│   │   │   └── lucide-icon.tsx         # REFACTORED (bundle fix)
│   │   ├── sections/
│   │   │   ├── contact.astro           # Contact section (NEW)
│   │   │   └── hero.astro              # MODIFIED (add WebGL layer)
│   │   └── shared/
│   │       ├── service-card.astro      # MODIFIED (video hover)
│   │       └── whatsapp-button.astro   # Floating CTA (NEW)
│   ├── lib/
│   │   ├── gsap/
│   │   │   └── register-plugins.ts     # Single GSAP registration (NEW)
│   │   ├── three/
│   │   │   ├── webgl-detect.ts         # WebGL capability check (NEW)
│   │   │   └── particle-shaders.ts     # Shader uniforms config (NEW)
│   │   └── stores/
│   │       └── form.ts                 # Form submission state (NEW)
│   └── pages/
│       ├── index.astro                 # MODIFIED (add Contact, WhatsApp)
│       └── dev/
│           └── webgl.astro             # WebGL diagnostic route (NEW)
├── public/
│   └── _headers                        # MODIFIED (CSP for Turnstile)
├── .env.example                        # MODIFIED (add Turnstile keys)
└── docs/
    ├── custom-domain-setup.md          # NEW
    └── analytics-setup.md              # NEW
```

---

# 7. PHASE 5 TASK BREAKDOWN

OPENCODE AI must execute the following tasks in strict order.

---

## TASK 5.0 — CREATE PHASE 5 SPEC TRACKING FILES

### Objective
Create specification tracking for Phase 5.

### Instructions
1. Create `specs/phase-5/00-phase-overview.md` with:
   - Phase name, objective, non-goals.
   - Required human inputs.
   - Definition of Done.
   - Task list with dependencies.
   - Validation checklist.
2. Create `specs/phase-5/STATUS.md` with task table.
   - All tasks start as `NOT_STARTED`.

### Definition of Done
- Both files exist.
- All tasks listed with status `NOT_STARTED`.
- No application code written.

---

## TASK 5.1 — LUCIDE ICON BUNDLE OPTIMIZATION (CRITICAL)

### Objective
Reduce the `lucide-icon.tsx` chunk from 928KB to <50KB by eliminating the full library import.

### Instructions
1. Audit `src/components/islands/lucide-icon.tsx`.
   - Identify how icons are currently imported (likely `import * as icons from 'lucide-react'`).
2. Create a new file `src/components/islands/icon-registry.ts`:
   - Export ONLY the specific icons used across the project.
   - Icons to include (based on Phase 4 content):
     - Services: `Monitor`, `Smartphone`, `Camera`, `Cpu`, `Sparkles`, `Box`
     - Team: `Github`, `Linkedin`, `Twitter`, `Mail`
     - UI: `Menu`, `X`, `Play`, `Pause`, `ChevronDown`, `ArrowRight`, `ExternalLink`
     - Contact: `Send`, `Loader2`, `CheckCircle`, `AlertCircle`
   - Use named imports: `import { Monitor, Smartphone, ... } from 'lucide-react'`.
3. Refactor `lucide-icon.tsx`:
   - Import from `icon-registry.ts` instead of the full library.
   - Use a `Record<string, LucideIcon>` map for lookup.
   - If an icon name is not in the registry, render a fallback `Circle` icon and log a console warning.
4. Verify bundle size:
   - Run `npm run build`.
   - Check the output chunk size for the icon component.
   - Target: < 50KB.

### Constraints
- Do NOT use dynamic `import()` per icon (adds network requests).
- Do NOT use `React.lazy()` for icons (causes layout shift).
- The registry approach ensures tree-shaking works while keeping a single chunk.

### Definition of Done
- `icon-registry.ts` exists with explicit named imports.
- `lucide-icon.tsx` uses the registry.
- Build output shows icon chunk < 50KB.
- All existing icons still render correctly on the homepage.
- No visual regressions.

---

## TASK 5.2 — GSAP FOUNDATION & SECTION REVEALS

### Objective
Add cinematic scroll-triggered animations to all existing sections.

### Instructions
1. Install GSAP dependencies:
   ```bash
   npm install gsap @gsap/react
   ```
2. Create `src/lib/gsap/register-plugins.ts`:
   - Import `gsap` and `ScrollTrigger`.
   - Call `gsap.registerPlugin(ScrollTrigger)`.
   - Export the configured `gsap` instance.
3. Create `src/components/islands/scroll-reveal.tsx`:
   - A React island that wraps children.
   - Props: `direction` ('up' | 'down' | 'left' | 'right'), `delay`, `duration`, `stagger`.
   - Uses `useGSAP` hook from `@gsap/react` for automatic cleanup.
   - Reads `$prefersReducedMotion` store. If true, skip animation (show content immediately).
   - Animates: `opacity: 0 → 1`, `y: 40 → 0` (or x for horizontal).
   - Uses `ScrollTrigger` with `trigger: 'top 80%'`, `once: true`.
4. Update each section component to wrap content in `<ScrollReveal>`:
   - `manifesto.astro`: Wrap left text and right visual separately with stagger.
   - `services.astro`: Wrap the grid with `stagger: 0.15` on cards.
   - `portfolio.astro`: Wrap the grid with `stagger: 0.1` on cards.
   - `team.astro`: Wrap cards with `stagger: 0.2`.
   - `hero.astro`: Animate text entrance on load (not scroll).
5. Add `will-change: transform` via GSAP's `autoAlpha` and `y` transforms.
6. Ensure GSAP script is loaded with `defer` or inside a `client:visible` island.

### Constraints
- Do NOT animate layout properties (`width`, `height`, `top`, `left`).
- Do NOT use `ScrollTrigger` with `pin: true` (causes CLS).
- All animations must complete within 0.8 seconds.
- Stagger delays must not exceed 0.3 seconds total.
- If `$prefersReducedMotion` is true, ALL animations must be disabled.

### Definition of Done
- GSAP is installed and registered.
- `ScrollReveal` island works correctly.
- All sections animate on scroll.
- Reduced motion preference disables all animations.
- No ghost animations after navigation.
- Build size increase from GSAP is < 30KB gzipped.

---

## TASK 5.3 — THREE.JS HERO PARTICLE OVERLAY

### Objective
Add a reactive WebGL particle field to the Hero section (desktop only).

### Instructions
1. Install Three.js dependencies (React 18 compatible):
   ```bash
   npm install three @react-three/fiber@8 @react-three/drei@9
   npm install -D @types/three
   ```
2. Create `src/lib/three/webgl-detect.ts`:
   - Export a function `isWebGLAvailable()` that checks for WebGL2 support.
   - Export a function `isWebGL2Available()` for stricter checking.
3. Create `src/assets/shaders/particles.vert`:
   - Vertex shader for point particles.
   - Accept uniforms: `uTime`, `uMouse`, `uPixelRatio`.
   - Implement subtle wave motion based on `uTime`.
   - Implement mouse repulsion/attraction based on `uMouse`.
4. Create `src/assets/shaders/particles.frag`:
   - Fragment shader for point particles.
   - Render circular points with soft edges.
   - Use LabXR primary accent color (`#00d4ff`) with alpha falloff.
5. Create `src/components/islands/hero-webgl.tsx`:
   - Use `client:only="react"` (NEVER server-render).
   - Check `$isMobile` and `$prefersReducedMotion` stores.
   - If mobile or reduced motion: return `null` (render nothing).
   - Check `isWebGLAvailable()`. If false: return `null`.
   - Render `<Canvas>` with:
     - `camera={{ position: [0, 0, 5], fov: 75 }}`
     - `dpr={[1, 1.5]}` (cap pixel ratio)
     - `gl={{ antialias: false, alpha: true }}`
   - Create a `<points>` element with `BufferGeometry`:
     - 1500 particles (desktop).
     - Random positions in a sphere.
     - Custom `ShaderMaterial` using the vertex/fragment shaders.
   - Track mouse position via `useFrame` and pass to shader uniform.
   - Implement `useEffect` cleanup: dispose geometry, material, texture on unmount.
   - Wrap in an `ErrorBoundary` component.
6. Update `src/components/sections/hero.astro`:
   - Add a container for the WebGL canvas (absolute positioned, `z-index: 1`).
   - Import `<HeroWebGL client:only="react" />`.
   - Ensure the canvas is behind the text content but above the video background.
   - Add a CSS gradient fallback that shows if the canvas fails to load.
7. Create `src/pages/dev/webgl.astro`:
   - Diagnostic route (`noindex`).
   - Renders the `HeroWebGL` component in isolation.
   - Shows WebGL detection status, device type, and particle count.

### Constraints
- Particle count MUST NOT exceed 2000.
- Canvas MUST NOT render on mobile devices.
- Canvas MUST NOT render if `prefers-reduced-motion` is true.
- Canvas MUST NOT render if WebGL is unavailable.
- Pixel ratio MUST be capped at 1.5.
- ALL Three.js resources MUST be disposed on unmount.
- The Hero must remain fully functional without WebGL (video background still works).

### Definition of Done
- Particles render and react to mouse on desktop.
- Mobile shows no canvas (video background only).
- Reduced motion shows no canvas.
- WebGL fallback works (no console errors if WebGL unavailable).
- Memory is freed when navigating away.
- Build does not include Three.js in the initial page load chunk.
- `/dev/webgl` diagnostic route works.

---

## TASK 5.4 — CONTACT FORM UI + CLOUDFLARE WORKER + TURNSTILE

### Objective
Build a spam-protected B2B lead capture form with serverless processing.

### Instructions

#### Part A: Form UI
1. Create `src/lib/stores/form.ts`:
   - Nano Store: `$formStatus` ('idle' | 'submitting' | 'success' | 'error').
   - Nano Store: `$formError` (string | null).
2. Create `src/components/islands/contact-form.tsx`:
   - Use `client:visible` hydration.
   - Fields:
     - `name` (required, min 2 chars)
     - `email` (required, valid email)
     - `company` (required, min 2 chars)
     - `role` (select: Agency / Brand / Producer / Other)
     - `budget` (select: <$10K / $10K-$30K / $30K-$50K / >$50K / Not sure)
     - `message` (textarea, required, min 20 chars)
     - `website` (hidden honeypot field — bots fill this, humans don't)
   - Client-side validation with Zod schema.
   - On submit:
     - Set `$formStatus` to 'submitting'.
     - POST to `/api/contact` with JSON payload.
     - On success: show success message, reset form.
     - On error: show error message with retry option.
   - Use shadcn `Input`, `Textarea`, `Button` components.
   - Style with the LabXR dark theme.
   - Add Turnstile widget container (renders when key is provided).
3. Create `src/components/sections/contact.astro`:
   - Section heading: "Hablemos de tu próximo proyecto".
   - Subtext: "Respondemos en menos de 24 horas."
   - Render `<ContactForm client:visible />`.
   - Include WhatsApp alternative link below the form.
4. Create `src/components/shared/whatsapp-button.astro`:
   - Fixed floating button (bottom-right).
   - Links to `https://wa.me/{number}?text=...` with pre-filled message.
   - Uses WhatsApp green color but styled to fit LabXR theme.
   - Shows on scroll (after hero section).

#### Part B: Cloudflare Pages Function (Worker)
5. Create `functions/api/contact.ts`:
   - Handle POST requests only.
   - Validate request body with Zod schema (server-side).
   - Check honeypot field: if filled, return 200 (pretend success) but don't process.
   - Verify Turnstile token (if enabled):
     - POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
     - Use secret key from environment variables.
   - Rate limiting:
     - Use Cloudflare KV or Durable Objects to track submissions per IP.
     - Max 3 submissions per IP per 10 minutes.
   - On success:
     - Format the submission as a readable message.
     - POST to the configured webhook URL (Discord/Slack).
     - Return `{ success: true, message: "..." }`.
   - On failure:
     - Return appropriate error code and message.
   - Set CORS headers for the site origin.
6. Update `.env.example`:
   ```
   PUBLIC_TURNSTILE_SITE_KEY=your-site-key-here
   TURNSTILE_SECRET_KEY=your-secret-key-here
   CONTACT_WEBHOOK_URL=your-discord-or-slack-webhook
   ```
7. Update `public/_headers`:
   - Add Content-Security-Policy entries for Turnstile:
     ```
     script-src 'self' https://challenges.cloudflare.com
     frame-src https://challenges.cloudflare.com
     ```

### Constraints
- NEVER store secrets in source code or Git.
- NEVER trust client-side validation alone.
- The honeypot field MUST be visually hidden but accessible to bots.
- Turnstile must be optional (work without it if key not provided).
- Form must be fully accessible (labels, ARIA, keyboard navigation).
- Worker must respond within 5 seconds.

### Definition of Done
- Form renders with all fields and validation.
- Form submits to `/api/contact`.
- Worker validates, checks Turnstile, enforces rate limit.
- Webhook receives formatted submission.
- Honeypot blocks bots silently.
- Success/error states display correctly.
- WhatsApp floating button works.
- No secrets in Git.

---

## TASK 5.5 — SERVICE CARD VIDEO HOVER PREVIEWS

### Objective
Add lightweight video previews that play on hover for service cards.

### Instructions
1. Update `src/content/config.ts`:
   - Add optional field to `services` collection schema:
     - `previewVideoUrl` (string, optional)
     - `previewPosterUrl` (string, optional)
2. Update `src/components/shared/service-card.astro`:
   - If `previewVideoUrl` exists:
     - Render a `<video>` element inside the card (hidden by default).
     - Set `preload="none"`, `muted`, `loop`, `playsinline`.
     - On mouse enter (desktop only): set `src`, call `.play()`.
     - On mouse leave: call `.pause()`, remove `src` to free memory.
   - If no `previewVideoUrl`: keep the existing static card behavior.
   - Use CSS `group-hover` for the visual transition.
3. Create a small vanilla `<script>` in the service card:
   - Listen for `mouseenter` and `mouseleave` events.
   - Check `$isMobile` — skip hover behavior on touch devices.
   - Handle play promise rejection gracefully.
4. Update placeholder service content to include `previewVideoUrl` fields (can point to existing test video).

### Constraints
- Videos MUST NOT preload. Use `preload="none"`.
- Videos MUST be muted (autoplay policy).
- On mobile/touch: do NOT attempt hover playback.
- On mouse leave: MUST pause and unload the video.
- Preview videos should be short (3-5 seconds) and small (<5MB).

### Definition of Done
- Desktop hover plays the preview video.
- Mouse leave stops and unloads the video.
- Mobile shows static cards (no hover behavior).
- No console errors.
- Memory is freed after hover ends.

---

## TASK 5.6 — ANALYTICS INTEGRATION

### Objective
Add privacy-focused, cookieless analytics with conversion tracking.

### Instructions
1. Choose Plausible (default) or Umami based on human preference.
2. For Plausible:
   - Add script to `src/layouts/BaseLayout.astro`:
     ```html
     <script defer data-domain="labxr.art" src="https://plausible.io/js/script.js"></script>
     ```
   - Add custom event tracking function in `src/lib/analytics.ts`:
     - `trackEvent(name: string, props?: Record<string, string>)`.
   - Track these events:
     - `video_play` (with video title)
     - `case_study_open` (with case study ID)
     - `form_submit` (with success/failure)
     - `whatsapp_click`
     - `service_card_hover` (with service name)
     - `demo_cta_click`
3. For Umami:
   - Self-host or use cloud.
   - Add script with website ID.
   - Track same events via `umami.track()`.
4. Update relevant components to call `trackEvent()`:
   - `video-player-island.tsx`: on play.
   - `case-study-viewer.tsx`: on open.
   - `contact-form.tsx`: on submit.
   - `whatsapp-button.astro`: on click.
   - `service-card.astro`: on hover.
   - `hero.astro`: on CTA button click.
5. Create `docs/analytics-setup.md`:
   - Document which events are tracked.
   - How to view the dashboard.
   - Privacy compliance notes (no cookies, GDPR friendly).

### Constraints
- Analytics script MUST use `defer` attribute.
- No cookies may be set.
- No personal data may be collected.
- Analytics must not block page rendering.
- Track events must be fire-and-forget (don't await).

### Definition of Done
- Analytics script loads with `defer`.
- Custom events fire correctly.
- No console errors.
- Documentation is complete.
- No cookies are set.

---

## TASK 5.7 — PERFORMANCE AUDIT & OPTIMIZATION

### Objective
Achieve Lighthouse 90+ on all categories.

### Instructions
1. Run Lighthouse audit on the production build:
   ```bash
   npm run build
   npm run preview
   # Run Lighthouse on localhost:4321
   ```
2. Record baseline scores:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
3. Optimize based on findings:
   - If LCP > 2.5s: optimize hero video poster, preload critical fonts.
   - If TBT > 200ms: further code-split JS, defer non-critical scripts.
   - If CLS > 0.1: fix any remaining layout shifts.
   - If Accessibility < 90: fix contrast, ARIA labels, focus states.
4. Verify bundle sizes:
   - Initial JS: target < 150KB gzipped.
   - Three.js chunk: loaded separately, < 200KB.
   - GSAP chunk: loaded separately, < 30KB.
   - Icon chunk: < 50KB.
5. Test on throttled network (4G simulation):
   - First Contentful Paint < 1.8s.
   - Largest Contentful Paint < 2.5s.
   - Time to Interactive < 3.5s.
6. Document results in the Phase 5 report.

### Definition of Done
- Lighthouse Performance ≥ 90.
- Lighthouse Accessibility ≥ 90.
- Lighthouse Best Practices ≥ 90.
- Lighthouse SEO ≥ 90.
- All bundle sizes documented.
- No render-blocking resources.
- Results recorded in Phase 5 report.

---

## TASK 5.8 — CUSTOM DOMAIN DOCUMENTATION

### Objective
Document the DNS setup process for the human to execute.

### Instructions
1. Create `docs/custom-domain-setup.md`:
   - Step-by-step instructions for:
     - Adding `labxr.art` to Cloudflare (if not already).
     - Creating CNAME record: `labxr.art` → Cloudflare Pages URL.
     - Creating CNAME record: `www.labxr.art` → `labxr.art`.
     - Enabling SSL/TLS (Full Strict mode).
     - Configuring `cdn.labxr.art` CNAME → R2 bucket.
     - Setting up HSTS headers.
     - Verifying DNS propagation.
   - Include screenshots placeholders or terminal commands.
   - Note: This is a human-executed task. Do NOT modify DNS programmatically.
2. Update `public/_redirects`:
   - Add `www` to non-www redirect rule.
   - Add HTTP to HTTPS redirect (handled by Cloudflare, but document).

### Definition of Done
- Documentation is complete and actionable.
- Redirect rules are in place.
- Human can follow the guide without additional research.

---

## TASK 5.9 — PHASE 5 VALIDATION & REPORT

### Objective
Document completion and validate all Phase 5 deliverables.

### Instructions
1. Run all validation commands:
   ```bash
   npm run check
   npm run format
   npm run build
   ```
2. Test all new features manually:
   - GSAP animations on scroll.
   - Three.js particles on desktop.
   - Mobile fallback (no particles).
   - Reduced motion fallback.
   - Contact form submission.
   - Turnstile (if key provided).
   - WhatsApp button.
   - Service card hover videos.
   - Analytics events.
3. Update `specs/phase-5/STATUS.md`.
4. Generate `docs/phase-5-report.md`:
   - Executive summary.
   - Completed tasks.
   - Bundle size comparison (before/after Lucide fix).
   - Lighthouse scores.
   - Three.js performance metrics (FPS, memory).
   - Form submission test results.
   - Analytics event verification.
   - Known issues and follow-ups.
   - Phase 6 preview.
5. Commit with conventional commit message.

### Definition of Done
- All Phase 5 tasks marked `DONE`.
- `npm run check` passes with 0 errors.
- `npm run build` completes successfully.
- Lighthouse scores documented.
- Phase 5 report generated.
- Code committed and pushed to GitHub.

---

# 8. OPENCODE EXECUTION PROMPTS

Use these prompts sequentially with OPENCODE AI.

---

## Prompt 1 — Initialize Phase 5 Spec
```text
Read AGENTS.md and the Phase 5 specification.
Create specs/phase-5/00-phase-overview.md and specs/phase-5/STATUS.md.
List all Phase 5 tasks (5.0 through 5.9) with status NOT_STARTED.
Do not write application code.
Do not install any packages.
```

---

## Prompt 2 — Lucide Bundle Optimization
```text
Execute Task 5.1. CRITICAL: Do not proceed to any other task until this is complete.

1. Audit src/components/islands/lucide-icon.tsx to understand current import strategy.
2. Create src/components/islands/icon-registry.ts with ONLY these named imports from lucide-react:
   Monitor, Smartphone, Camera, Cpu, Sparkles, Box, Github, Linkedin, Twitter, Mail, Menu, X, Play, Pause, ChevronDown, ArrowRight, ExternalLink, Send, Loader2, CheckCircle, AlertCircle, Circle
3. Refactor lucide-icon.tsx to use the registry instead of importing the full library.
4. Run npm run build and verify the icon chunk is < 50KB.
5. Verify all icons still render correctly on the homepage.
6. Update specs/phase-5/STATUS.md.
Commit: "perf: reduce lucide icon bundle from 928KB to <50KB via explicit registry"
```

---

## Prompt 3 — GSAP Foundation & Section Reveals
```text
Execute Task 5.2.

1. Install: npm install gsap @gsap/react
2. Create src/lib/gsap/register-plugins.ts — register ScrollTrigger once.
3. Create src/components/islands/scroll-reveal.tsx:
   - Props: direction ('up'|'down'|'left'|'right'), delay, duration, stagger
   - Use useGSAP hook for automatic cleanup
   - Read $prefersReducedMotion — if true, show content immediately
   - Animate opacity 0→1 and y/x 40→0
   - ScrollTrigger: trigger 'top 80%', once: true
4. Wrap section content in ScrollReveal:
   - manifesto.astro: left text + right visual with stagger
   - services.astro: grid cards with stagger 0.15
   - portfolio.astro: grid cards with stagger 0.1
   - team.astro: cards with stagger 0.2
   - hero.astro: text entrance on load
5. Ensure animations only use transform and opacity.
6. Verify reduced motion disables all animations.
7. Update STATUS.md.
Commit: "feat: add GSAP ScrollTrigger cinematic section reveals"
```

---

## Prompt 4 — Three.js Hero Particles
```text
Execute Task 5.3.

1. Install React 18 compatible Three.js:
   npm install three @react-three/fiber@8 @react-three/drei@9
   npm install -D @types/three
2. Create src/lib/three/webgl-detect.ts with isWebGLAvailable() and isWebGL2Available().
3. Create src/assets/shaders/particles.vert and particles.frag:
   - Vertex: wave motion via uTime, mouse repulsion via uMouse
   - Fragment: circular points, #00d4ff color, alpha falloff
4. Create src/components/islands/hero-webgl.tsx:
   - client:only="react"
   - Check $isMobile and $prefersReducedMotion — return null if true
   - Check isWebGLAvailable() — return null if false
   - Canvas: camera [0,0,5], fov 75, dpr [1, 1.5], alpha true, antialias false
   - 1500 particles in BufferGeometry with ShaderMaterial
   - Track mouse via useFrame, pass to uMouse uniform
   - Dispose ALL resources on unmount (geometry, material)
   - Wrap in ErrorBoundary
5. Update hero.astro:
   - Add <HeroWebGL client:only="react" /> in absolute container
   - Ensure it's above video but below text
   - Add CSS gradient fallback if canvas fails
6. Create src/pages/dev/webgl.astro diagnostic route.
7. Verify: desktop shows particles, mobile shows nothing, reduced motion shows nothing.
8. Update STATUS.md.
Commit: "feat: add Three.js reactive particle overlay to hero section"
```

---

## Prompt 5 — Contact Form UI
```text
Execute Task 5.4 Part A (UI only).

1. Create src/lib/stores/form.ts with $formStatus and $formError Nano Stores.
2. Create src/components/islands/contact-form.tsx:
   - Fields: name, email, company, role (select), budget (select), message, website (honeypot)
   - Zod client-side validation
   - POST to /api/contact
   - Success/error states with retry
   - Use shadcn Input, Textarea, Button
   - Turnstile container (renders if PUBLIC_TURNSTILE_SITE_KEY exists)
   - client:visible hydration
3. Create src/components/sections/contact.astro:
   - Heading, subtext, ContactForm island
   - WhatsApp alternative link
4. Create src/components/shared/whatsapp-button.astro:
   - Fixed bottom-right floating button
   - Pre-filled wa.me link
   - Shows after hero section
5. Update index.astro to include Contact section and WhatsApp button.
6. Update .env.example with PUBLIC_TURNSTILE_SITE_KEY placeholder.
7. Update STATUS.md.
Commit: "feat: add contact form UI with validation and WhatsApp CTA"
```

---

## Prompt 6 — Cloudflare Worker (Form Handler)
```text
Execute Task 5.4 Part B (Worker).

1. Create functions/api/contact.ts:
   - Handle POST only
   - Validate body with Zod (server-side)
   - Check honeypot: if filled, return 200 silently
   - Verify Turnstile token (if TURNSTILE_SECRET_KEY exists)
   - Rate limit: max 3 per IP per 10 minutes (use in-memory Map or KV)
   - On success: POST formatted message to CONTACT_WEBHOOK_URL
   - Return JSON response with success/error
   - Set CORS headers for labxr.art origin
2. Update public/_headers with Turnstile CSP:
   - script-src 'self' https://challenges.cloudflare.com
   - frame-src https://challenges.cloudflare.com
3. Test locally with wrangler pages dev.
4. Document required Cloudflare environment variables in docs.
5. Update STATUS.md.
Commit: "feat: add Cloudflare Pages Function for contact form with Turnstile"
```

---

## Prompt 7 — Service Card Video Hover
```text
Execute Task 5.5.

1. Update src/content/config.ts: add optional previewVideoUrl and previewPosterUrl to services schema.
2. Update src/components/shared/service-card.astro:
   - If previewVideoUrl exists: render hidden <video> with preload="none", muted, loop, playsinline
   - Add vanilla <script> for mouseenter/mouseleave handlers
   - On mouseenter (desktop only): set src, play()
   - On mouseleave: pause(), remove src
   - Check $isMobile — skip hover on touch devices
   - Handle play() promise rejection gracefully
3. Update placeholder service content with previewVideoUrl fields.
4. Verify: desktop hover plays video, mobile shows static card.
5. Update STATUS.md.
Commit: "feat: add video hover previews to service cards"
```

---

## Prompt 8 — Analytics Integration
```text
Execute Task 5.6.

1. Add Plausible script to BaseLayout.astro with defer attribute.
2. Create src/lib/analytics.ts with trackEvent(name, props) function.
3. Add event tracking to:
   - video-player-island.tsx: video_play
   - case-study-viewer.tsx: case_study_open
   - contact-form.tsx: form_submit
   - whatsapp-button.astro: whatsapp_click
   - service-card.astro: service_card_hover
   - hero.astro: demo_cta_click
4. Create docs/analytics-setup.md.
5. Verify no cookies are set.
6. Update STATUS.md.
Commit: "feat: integrate Plausible analytics with conversion event tracking"
```

---

## Prompt 9 — Performance Audit
```text
Execute Task 5.7.

1. Run npm run build and npm run preview.
2. Run Lighthouse on localhost:4321 (mobile and desktop).
3. Record scores for Performance, Accessibility, Best Practices, SEO.
4. If any score < 90, identify and fix the issue:
   - LCP: optimize hero poster, preload fonts
   - TBT: code-split JS, defer scripts
   - CLS: fix layout shifts
   - Accessibility: fix contrast, ARIA, focus
5. Verify bundle sizes:
   - Initial JS < 150KB gzipped
   - Three.js chunk separate
   - GSAP chunk separate
   - Icons < 50KB
6. Document all results.
7. Update STATUS.md.
Commit: "perf: achieve Lighthouse 90+ scores across all categories"
```

---

## Prompt 10 — Custom Domain Docs + Final Report
```text
Execute Tasks 5.8 and 5.9.

1. Create docs/custom-domain-setup.md with step-by-step DNS instructions.
2. Update public/_redirects with www→non-www rule.
3. Run final validation: npm run check, npm run format, npm run build.
4. Update specs/phase-5/STATUS.md — all tasks DONE.
5. Generate docs/phase-5-report.md:
   - Executive summary
   - Completed tasks list
   - Bundle size before/after (Lucide fix)
   - Lighthouse scores (mobile + desktop)
   - Three.js performance (FPS, memory, particle count)
   - Form submission test results
   - Analytics events verified
   - Known issues and follow-ups
   - Phase 6 preview
6. Commit: "feat: complete Phase 5 — polish, interaction, WebGL, and conversion"
```

---

# 9. PHASE 5 DEFINITION OF DONE

Phase 5 is complete only when ALL of the following are true:

## Performance Recovery
- [ ] Lucide icon chunk is < 50KB (was 928KB).
- [ ] Initial page JS is < 150KB gzipped.
- [ ] Three.js is code-split and NOT in initial bundle.
- [ ] GSAP is code-split and loaded after FCP.

## GSAP Animations
- [ ] All sections animate on scroll.
- [ ] Animations use only `transform` and `opacity`.
- [ ] `$prefersReducedMotion` disables all animations.
- [ ] No ghost animations after navigation.
- [ ] ScrollTrigger cleanup works correctly.

## Three.js / WebGL
- [ ] Particles render on desktop.
- [ ] Particles react to mouse movement.
- [ ] Mobile shows NO canvas (video background only).
- [ ] Reduced motion shows NO canvas.
- [ ] WebGL unavailable shows NO canvas (no errors).
- [ ] Memory is freed on unmount (no leaks).
- [ ] Pixel ratio capped at 1.5.
- [ ] `/dev/webgl` diagnostic route works.

## Contact Form
- [ ] Form renders with all fields.
- [ ] Client-side Zod validation works.
- [ ] Server-side Worker validation works.
- [ ] Turnstile renders (if key provided).
- [ ] Honeypot blocks bots silently.
- [ ] Rate limiting works (max 3 per 10 min).
- [ ] Webhook receives formatted submission.
- [ ] Success/error states display correctly.
- [ ] WhatsApp floating button works.

## Service Card Hover
- [ ] Desktop hover plays preview video.
- [ ] Mouse leave pauses and unloads video.
- [ ] Mobile shows static cards.
- [ ] No console errors.

## Analytics
- [ ] Plausible script loads with `defer`.
- [ ] Custom events fire correctly.
- [ ] No cookies are set.
- [ ] Documentation is complete.

## Lighthouse Scores
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

## Documentation
- [ ] Custom domain setup guide exists.
- [ ] Analytics setup guide exists.
- [ ] Phase 5 report is generated.
- [ ] All STATUS.md tasks marked DONE.

---

# 10. PHASE 5 VALIDATION CHECKLIST FOR HUMAN REVIEW

Before moving to Phase 6, the human should manually verify:

```text
Performance Recovery
[ ] Homepage loads in < 2.5 seconds on simulated 4G.
[ ] No console errors on page load.
[ ] Three.js chunk loads separately (check Network tab).
[ ] Icon chunk is < 50KB (check build output).

GSAP Animations
[ ] Sections animate smoothly on scroll (desktop).
[ ] Sections animate smoothly on scroll (mobile).
[ ] Reduced motion setting disables all animations.
[ ] No layout shift during animations.
[ ] Animations feel cinematic, not bouncy.

Three.js Particles
[ ] Particles visible on desktop Chrome.
[ ] Particles react to mouse movement.
[ ] Particles disappear on mobile (video shows instead).
[ ] Particles disappear with reduced motion enabled.
[ ] No console errors if WebGL is disabled.
[ ] GPU usage is reasonable (no fan spin-up).

Contact Form
[ ] Form validates correctly (empty fields, invalid email).
[ ] Form submits successfully with valid data.
[ ] Success message appears after submission.
[ ] Error message appears on network failure.
[ ] Honeypot field is invisible to humans.
[ ] WhatsApp button opens correct link.
[ ] Turnstile renders (if key provided).

Service Card Hover
[ ] Desktop hover plays video preview.
[ ] Video stops when mouse leaves.
[ ] Mobile shows static cards.
[ ] No memory leak after repeated hovers.

Analytics
[ ] Plausible dashboard shows page view.
[ ] Custom events appear in dashboard.
[ ] No cookies in browser storage.

Accessibility
[ ] Keyboard navigation works on form.
[ ] Focus states are visible.
[ ] Color contrast meets WCAG AA.
[ ] Screen reader announces form errors.

Cross-Browser
[ ] Chrome (desktop + mobile)
[ ] Firefox (desktop)
[ ] Safari (desktop + iOS)
[ ] Edge (desktop)
[ ] Samsung Internet (Android)
```

---

# 11. DEPENDENCY VERSION LOCK (React 18 Compatibility)

To prevent OPENCODE from accidentally installing React 19-only packages:

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

# 12. PHASE 6 PREVIEW

After Phase 5 is complete, the site will be a fully interactive, performant B2B portfolio. **Phase 6** will focus on:

- **Content Production:** Replace all placeholders with real case studies, team photos, and showreel.
- **SEO & Structured Data:** JSON-LD, sitemap.xml, Open Graph images.
- **A/B Testing:** CTA copy variations, form field optimization.
- **Client Portal (V2):** White-label agency dashboard behind Cloudflare Access.
- **Blog/Insights:** Technical articles for organic SEO.
- **Internationalization:** English translation for global agency outreach.

---

**Execute Phase 5 by pasting Prompt 1 into OPENCODE AI.**