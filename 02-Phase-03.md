Excellent work on Phase 2.5. The CSS Variable Bridge Layer is a smart architectural decision — it ensures shadcn components and your custom token system coexist without conflicts.

You are now ready for **Phase 3**. This phase is where the project transitions from "design system on paper" to "visible, cinematic web experience with real media infrastructure."

---

# OPENCODE AI — LABXR.ART PHASE 3 SPEC

## Phase Name

**Phase 3 — Site Chrome, Hero Section, Video Infrastructure, and Media Engine**

---

# 1. OPENCODE AI ROLE

You are acting as a **Senior Creative Technologist and Media Infrastructure Engineer**.

Your responsibility is to build the first visible, cinematic elements of the LabXR website while simultaneously constructing the media delivery pipeline that will power all future case studies.

You are not building the portfolio grid yet.
You are not building the services section yet.
You are not implementing Three.js/WebGL particle systems yet.
You are not implementing GSAP scroll animations yet.
You are not building the contact form yet.

Your job in Phase 3 is to create:

1. The site navigation (desktop + mobile menu).
2. The site footer.
3. The Hero section with a cinematic video background.
4. A production-ready Cloudflare R2 media bucket with CORS.
5. An FFmpeg video compression and optimization pipeline.
6. A custom, lazy-loading Video Player component with iOS fallbacks.
7. A `/dev/video-player` diagnostic route for media testing.
8. A complete Phase 3 validation report.

---

# 2. PRIMARY OBJECTIVE

Prove that LabXR can deliver heavy cinematic media at zero perceived latency while maintaining perfect Lighthouse scores.

At the end of Phase 3, the project must be able to:

- Render a responsive navigation with mobile menu using Nano Stores.
- Render a branded footer with social links and contact info.
- Display a full-viewport Hero section with a looping background video.
- Upload, compress, and serve videos from Cloudflare R2.
- Lazy-load videos only when they enter the viewport.
- Gracefully handle iOS Safari autoplay restrictions.
- Pause videos when they leave the viewport to save memory.
- Pass all performance budgets (Lighthouse Performance > 95).

---

# 3. NON-GOALS FOR PHASE 3

OPENCODE AI must not do any of the following during Phase 3:

- Do not build the Portfolio section or case study modals.
- Do not build the Services section.
- Do not build the Manifesto section.
- Do not build the Team section.
- Do not implement Three.js, WebGL, or Shaders.
- Do not implement GSAP or ScrollTrigger animations.
- Do not implement the Webcam Mirror or Interactive Blueprint.
- Do not build the contact form or Cloudflare Worker.
- Do not connect real analytics yet.
- Do not install MediaPipe, TensorFlow, or webcam dependencies.

---

# 4. REQUIRED HUMAN INPUTS

Before OPENCODE AI can fully complete Phase 3, the human developer must provide:

1. **Cloudflare Account ID** — Required for Wrangler CLI commands.
2. **R2 Bucket Name** — Default: `labxr-assets`.
3. **Hero Video File** — A raw 1080p/4K MP4 of the LabXR showreel or cinematic background loop (15-30 seconds, no audio needed for background).
4. **Poster Image** — A high-quality JPEG/WebP still frame from the hero video (1920x1080).
5. **Logo SVG** — The LabXR logo for the navigation bar.
6. **Social Links** — URLs for Instagram, LinkedIn, GitHub, or Behance.
7. **Contact Email** — For the footer.
8. **WhatsApp Number** — For the footer (with country code).

*If video files are not available yet, OPENCODE must use a royalty-free placeholder video (e.g., a dark abstract loop) and document the exact replacement procedure.*

---

# 5. GLOBAL OPENCODE RULES FOR PHASE 3

## 5.1 Media Performance Rules
- **Never preload videos.** All `<video>` tags must use `preload="none"` and load their `src` only via IntersectionObserver.
- **Always provide a poster.** Every video must have a lightweight poster image that renders instantly.
- **Respect iOS.** Mobile devices must show a "tap to play" overlay. Desktop may autoplay muted videos.
- **Pause off-screen.** Videos must pause when scrolled out of the viewport.
- **Use WebM + MP4 fallback.** Generate both formats where possible for bandwidth savings.

## 5.2 Cloudflare R2 Rules
- **CORS must be strict.** Only allow `localhost:4321`, `*.pages.dev`, and `labxr.art`.
- **Use custom domain.** Serve R2 assets via `cdn.labxr.art` (or Cloudflare Pages asset URL if custom domain is not yet configured).
- **Set Cache-Control.** Videos must have `Cache-Control: public, max-age=31536000, immutable`. Posters must have `Cache-Control: public, max-age=86400`.
- **No secrets in code.** R2 access keys must be in `.env`, never in source files.

## 5.3 Navigation Rules
- **Mobile-first.** The navigation must be built mobile-first with a full-screen overlay menu.
- **Use Nano Stores.** The mobile menu open/close state must use the existing `$isMobileMenuOpen` store.
- **Focus trap.** The mobile menu must trap focus when open and close on Escape key.
- **SkipNav integration.** The navigation must include the SkipNav component from Phase 2.

## 5.4 Hero Section Rules
- **Full viewport.** The Hero must be `100dvh` (dynamic viewport height) to handle mobile browser chrome.
- **Text readability.** A dark gradient overlay must sit between the video and the text.
- **No CLS.** The Hero must not shift layout when the video loads.
- **Reduced motion.** If `prefers-reduced-motion` is true, show only the poster image, not the video.

---

# 6. PHASE 3 FOLDER STRUCTURE TARGET

OPENCODE AI must create or update the following files/folders:

```text
labxr-web/
├── infra/
│   └── cloudflare/
│       └── r2-cors.json              # CORS policy for R2 bucket
├── public/
│   └── videos/                       # Temporary local video storage
├── scripts/
│   ├── compress-video.sh             # FFmpeg compression script
│   └── upload-to-r2.sh               # Wrangler R2 upload script
├── src/
│   ├── assets/
│   │   └── videos/                   # Source video files (not committed)
│   ├── components/
│   │   ├── islands/
│   │   │   ├── mobile-menu.tsx        # Mobile navigation menu island
│   │   │   └── video-player-island.tsx # Interactive video controls
│   │   ├── sections/
│   │   │   └── hero.astro             # Hero section
│   │   ├── shared/
│   │   │   ├── footer.astro           # Site footer
│   │   │   ├── navigation.astro       # Site navigation
│   │   │   └── video-player.astro     # Lazy-loading video wrapper
│   │   └── ui/                        # (existing shadcn components)
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── use-intersection-observer.ts
│   │   └── video/
│   │       ├── types.ts               # Video configuration types
│   │       └── constants.ts           # Video URLs and settings
│   └── pages/
│       ├── index.astro                # Updated with Hero
│       └── dev/
│           └── video-player.astro     # Media diagnostic route
├── .env.example                       # Updated with R2 variables
└── docs/
    └── media-pipeline.md              # Video pipeline documentation
```

---

# 7. PHASE 3 TASK BREAKDOWN

OPENCODE AI must execute the following tasks in order.

---

# TASK 3.0 — CREATE PHASE 3 SPEC TRACKING FILES

## Objective
Create specification tracking for Phase 3.

## Instructions
Create `specs/phase-3/00-phase-overview.md` and `specs/phase-3/STATUS.md`. List all Phase 3 tasks with status `NOT_STARTED`.

---

# TASK 3.1 — CLOUDFLARE R2 BUCKET SETUP

## Objective
Provision the Cloudflare R2 bucket and configure CORS.

## Instructions
1. Verify Wrangler CLI is installed. If not, install it globally:
   ```bash
   npm install -g wrangler
   ```
2. Authenticate Wrangler:
   ```bash
   wrangler login
   ```
3. Create the R2 bucket:
   ```bash
   wrangler r2 bucket create labxr-assets
   ```
4. Create `infra/cloudflare/r2-cors.json` with the following allowed origins:
   - `http://localhost:4321`
   - `https://*.labxr-art-web.pages.dev`
   - `https://labxr.art`
   - `https://www.labxr.art`
5. Apply the CORS policy via Wrangler or document the manual dashboard steps.
6. Update `.env.example` with:
   ```
   CLOUDFLARE_ACCOUNT_ID=your-account-id
   R2_BUCKET_NAME=labxr-assets
   PUBLIC_CDN_URL=https://cdn.labxr.art
   ```

## Definition of Done
- R2 bucket `labxr-assets` exists.
- CORS policy is applied or documented.
- `.env.example` includes R2 variables.
- No secrets are committed to Git.

---

# TASK 3.2 — VIDEO COMPRESSION PIPELINE

## Objective
Create an automated FFmpeg pipeline to compress raw videos for web delivery.

## Instructions
1. Verify FFmpeg is installed:
   ```bash
   ffmpeg -version
   ```
   If not installed, provide Pop!_OS instructions:
   ```bash
   sudo apt install ffmpeg
   ```
2. Create `scripts/compress-video.sh` that:
   - Accepts an input file path and output name.
   - Generates an MP4 (H.264, CRF 20, faststart) at 1920x1080.
   - Generates a WebM (VP9, CRF 30) at 1920x1080.
   - Generates a poster frame (WebP, quality 80) at 1920x1080.
   - Generates a thumbnail (WebP, quality 80) at 640x360.
3. Create `docs/media-pipeline.md` documenting:
   - Compression settings and why they were chosen.
   - How to run the script.
   - Expected file sizes.
   - How to swap placeholder videos with real LabXR footage.

## Definition of Done
- `scripts/compress-video.sh` is executable.
- Running the script on a test video produces MP4, WebM, poster, and thumbnail.
- Documentation is complete.
- FFmpeg is verified or installation instructions are provided.

---

# TASK 3.3 — VIDEO UPLOAD SCRIPT

## Objective
Create a script to upload compressed videos to Cloudflare R2.

## Instructions
1. Create `scripts/upload-to-r2.sh` that:
   - Accepts a local file path.
   - Uploads it to the `labxr-assets` bucket using Wrangler:
     ```bash
     wrangler r2 object put labxr-assets/videos/<filename> --file=<path> --content-type=<mime-type>
     ```
   - Sets appropriate `Cache-Control` headers.
2. Update `docs/media-pipeline.md` with upload instructions.
3. Test the upload with a small sample file.

## Definition of Done
- Upload script works.
- A test file is accessible via the R2 URL.
- Cache headers are correct.
- Documentation is updated.

---

# TASK 3.4 — VIDEO PLAYER COMPONENT (CORE)

## Objective
Build the lazy-loading, performance-optimized Video Player.

## Instructions
1. Create `src/components/shared/video-player.astro`:
   - Accept props: `src`, `poster`, `thumbnail`, `aspectRatio` (default `16/9`), `autoplay` (boolean), `loop` (boolean), `muted` (boolean).
   - Render a container with the `aspectRatio` enforced via CSS to prevent CLS.
   - Render the `thumbnail` as an `<img>` tag initially.
   - Do NOT render a `<video>` tag initially.
   - Add `data-video-src` and `data-poster-src` attributes for JavaScript to read.
   - Include a play button overlay (visible on mobile or when autoplay is false).
2. Create `src/lib/hooks/use-intersection-observer.ts`:
   - A reusable hook that observes an element and calls a callback when it enters/exits the viewport.
3. Create a `<script>` tag inside `video-player.astro` that:
   - Uses `IntersectionObserver` to detect when the player enters the viewport.
   - On intersection: creates a `<video>` element, sets `src`, `poster`, `autoplay`, `loop`, `muted`, `playsinline`, and appends it to the container.
   - On exit: pauses the video.
   - On mobile: does NOT autoplay. Shows the play button overlay.
   - Handles iOS Safari autoplay rejection gracefully (catch promise rejection, show play button).
4. Create `src/lib/video/types.ts`:
   - Define a `VideoConfig` interface with `src`, `poster`, `thumbnail`, `title`, `description`.
5. Create `src/lib/video/constants.ts`:
   - Define placeholder video URLs pointing to the R2 bucket or a temporary CDN.

## Definition of Done
- Video player renders a thumbnail immediately with zero layout shift.
- Video loads only when scrolled into view.
- Video pauses when scrolled out of view.
- Mobile shows a play button and does not autoplay.
- iOS Safari does not throw console errors.
- Desktop autoplays muted videos.

---

# TASK 3.5 — VIDEO PLAYER DIAGNOSTIC ROUTE

## Objective
Create a testing ground for the video player.

## Instructions
1. Create `src/pages/dev/video-player.astro`:
   - Use `BaseLayout` with `noindex={true}`.
   - Render a heading: "Video Player Diagnostic".
   - Render three instances of the video player:
     - One with autoplay enabled (desktop test).
     - One with autoplay disabled (mobile test).
     - One far down the page to test lazy loading.
   - Display the current `$isMobile` and `$prefersReducedMotion` state.
   - Include instructions for testing on mobile devices.
2. Verify the route works locally and in the build.

## Definition of Done
- Route loads at `/dev/video-player`.
- All three video players behave correctly.
- Lazy loading is observable (video loads on scroll).
- Mobile fallback works.

---

# TASK 3.6 — NAVIGATION COMPONENT

## Objective
Build the site navigation with mobile menu.

## Instructions
1. Create `src/components/shared/navigation.astro`:
   - Render a `<header>` with fixed positioning and backdrop blur.
   - Include the LabXR logo (SVG) on the left.
   - Include navigation links on the right (desktop): Manifiesto, Servicios, Portafolio, Equipo, Contacto.
   - Include a hamburger button (mobile only) that toggles `$isMobileMenuOpen`.
   - Use the `Container` component from Phase 2.
   - Apply a solid background when scrolled (use a scroll listener or IntersectionObserver).
2. Create `src/components/islands/mobile-menu.tsx`:
   - A full-screen overlay menu.
   - Reads `$isMobileMenuOpen` from Nano Stores.
   - Traps focus when open.
   - Closes on Escape key.
   - Closes when a link is clicked.
   - Uses `client:load` hydration.
3. Update `src/layouts/BaseLayout.astro` to include `<Navigation />` at the top of the body.

## Definition of Done
- Navigation renders on all pages.
- Desktop links are visible and styled.
- Mobile hamburger toggles the menu.
- Mobile menu traps focus and closes on Escape.
- Navigation background changes on scroll.
- No console errors.

---

# TASK 3.7 — FOOTER COMPONENT

## Objective
Build the site footer.

## Instructions
1. Create `src/components/shared/footer.astro`:
   - Render a `<footer>` with the LabXR logo.
   - Include a brief brand statement.
   - Include navigation links.
   - Include social links (Instagram, LinkedIn, GitHub).
   - Include contact info: email and WhatsApp.
   - Include a copyright notice.
   - Use the `Container` and `Section` components from Phase 2.
   - Apply the `bg-secondary` background token.
2. Update `src/layouts/BaseLayout.astro` to include `<Footer />` at the bottom of the body.

## Definition of Done
- Footer renders on all pages.
- All links are functional.
- Social icons are accessible (SVG with aria-labels).
- Footer is responsive.

---

# TASK 3.8 — HERO SECTION

## Objective
Build the first visible section of the LabXR website.

## Instructions
1. Create `src/components/sections/hero.astro`:
   - Use the `Section` component with a custom `100dvh` height.
   - Render the Video Player component as the background (absolute positioned, `object-fit: cover`).
   - Add a dark gradient overlay (`bg-gradient-to-t from-background via-background/50 to-transparent`).
   - Render centered content:
     - A small eyebrow text: "Laboratorio Creativo de Tecnología".
     - A large heading: "El puente entre el código y el cine."
     - A short paragraph: "Creamos instalaciones interactivas, experiencias WebGL y sistemas de video en tiempo real para las agencias más innovadoras de LatAm."
     - Two buttons: "Ver Portafolio" (primary) and "Agendar Demo" (outline).
   - Add a subtle scroll indicator at the bottom.
2. Ensure the Hero respects `$prefersReducedMotion`:
   - If true, render only the poster image, not the video.
3. Update `src/pages/index.astro` to render the Hero section inside `BaseLayout`.

## Definition of Done
- Hero fills the full viewport height.
- Video background autoplays on desktop (muted).
- Video does not autoplay on mobile (shows poster + play button).
- Text is readable over the video (contrast ratio > 4.5:1).
- Buttons use the shadcn Button component.
- No layout shift when the video loads.
- Reduced motion preference is respected.

---

# TASK 3.9 — PHASE 3 VALIDATION & REPORT

## Objective
Document completion and validate performance.

## Instructions
1. Run `npm run check` and `npm run format`. Fix any issues.
2. Run Lighthouse on the `/` route and record the Performance score.
3. Update `specs/phase-3/STATUS.md`.
4. Generate `docs/phase-3-report.md` detailing:
   - Cloudflare R2 bucket status.
   - Video compression settings.
   - Video player behavior (desktop vs mobile).
   - Navigation and footer status.
   - Hero section status.
   - Lighthouse scores.
   - Bundle size impact.
   - Known issues and follow-ups.
5. Commit changes with conventional commits.

## Definition of Done
- All Phase 3 tasks are marked `DONE`.
- Lighthouse Performance score is > 90.
- No console errors on any page.
- Phase 3 report is generated.
- Code is committed to Git.

---

# 8. OPENCODE EXECUTION PROMPTS

Use the following prompts sequentially with OPENCODE AI.

---

## Prompt 1 — Initialize Phase 3 Spec Tracking
```text
Read AGENTS.md and the Phase 3 instruction set.
Create specs/phase-3/00-phase-overview.md and specs/phase-3/STATUS.md.
List all Phase 3 tasks with status NOT_STARTED.
Do not write application code.
```

---

## Prompt 2 — Cloudflare R2 Setup
```text
Execute Phase 3 Task 3.1.
Verify Wrangler CLI is installed and authenticated.
Create the R2 bucket: wrangler r2 bucket create labxr-assets.
Create infra/cloudflare/r2-cors.json with CORS rules for localhost:4321, *.pages.dev, and labxr.art.
Update .env.example with CLOUDFLARE_ACCOUNT_ID, R2_BUCKET_NAME, and PUBLIC_CDN_URL.
If Wrangler is not installed, provide installation instructions for Pop!_OS.
Do not commit any secrets.
```

---

## Prompt 3 — Video Compression Pipeline
```text
Execute Phase 3 Task 3.2.
Verify FFmpeg is installed. If not, provide Pop!_OS installation instructions.
Create scripts/compress-video.sh that:
- Accepts input file and output name.
- Generates MP4 (H.264, CRF 20, faststart, 1080p).
- Generates WebM (VP9, CRF 30, 1080p).
- Generates a poster frame (WebP, 1080p).
- Generates a thumbnail (WebP, 360p).
Make the script executable.
Create docs/media-pipeline.md documenting the compression settings and usage.
```

---

## Prompt 4 — Video Upload Script
```text
Execute Phase 3 Task 3.3.
Create scripts/upload-to-r2.sh that:
- Accepts a local file path.
- Uploads it to the labxr-assets bucket using Wrangler.
- Sets Cache-Control headers.
Test the upload with a small sample file.
Update docs/media-pipeline.md with upload instructions.
```

---

## Prompt 5 — Video Player Component
```text
Execute Phase 3 Task 3.4.
Create src/components/shared/video-player.astro with lazy-loading via IntersectionObserver.
Create src/lib/hooks/use-intersection-observer.ts.
Create src/lib/video/types.ts and src/lib/video/constants.ts.

Requirements:
- Render a thumbnail initially with no <video> tag.
- Load the video only when scrolled into view.
- Pause the video when scrolled out of view.
- On mobile: do NOT autoplay. Show a play button overlay.
- On desktop: autoplay muted videos.
- Handle iOS Safari autoplay rejection gracefully.
- Enforce aspect ratio to prevent CLS.
- Respect prefers-reduced-motion.
```

---

## Prompt 6 — Video Player Diagnostic Route
```text
Execute Phase 3 Task 3.5.
Create src/pages/dev/video-player.astro.
Use BaseLayout with noindex={true}.
Render three video player instances:
- One with autoplay enabled.
- One with autoplay disabled.
- One far down the page to test lazy loading.
Display the current $isMobile and $prefersReducedMotion state.
Include testing instructions.
```

---

## Prompt 7 — Navigation Component
```text
Execute Phase 3 Task 3.6.
Create src/components/shared/navigation.astro with:
- Fixed positioning and backdrop blur.
- LabXR logo on the left.
- Navigation links on the right (desktop).
- Hamburger button (mobile only) that toggles $isMobileMenuOpen.
- Solid background on scroll.

Create src/components/islands/mobile-menu.tsx with:
- Full-screen overlay menu.
- Focus trapping.
- Escape key close.
- Close on link click.

Update BaseLayout.astro to include the Navigation.
```

---

## Prompt 8 — Footer Component
```text
Execute Phase 3 Task 3.7.
Create src/components/shared/footer.astro with:
- LabXR logo.
- Brand statement.
- Navigation links.
- Social links (Instagram, LinkedIn, GitHub).
- Contact info (email, WhatsApp).
- Copyright notice.

Use Container and Section components.
Apply bg-secondary background.
Update BaseLayout.astro to include the Footer.
```

---

## Prompt 9 — Hero Section
```text
Execute Phase 3 Task 3.8.
Create src/components/sections/hero.astro with:
- Full viewport height (100dvh).
- Video Player as background (absolute, object-fit: cover).
- Dark gradient overlay.
- Centered content: eyebrow, heading, paragraph, two buttons.
- Scroll indicator.

Ensure:
- Video autoplays on desktop (muted).
- Video does not autoplay on mobile.
- Text is readable (contrast > 4.5:1).
- Buttons use shadcn Button component.
- No layout shift.
- Respects prefers-reduced-motion.

Update index.astro to render the Hero inside BaseLayout.
```

---

## Prompt 10 — Phase 3 Validation & Report
```text
Execute Phase 3 Task 3.9.
Run npm run check and npm run format. Fix any errors.
Run Lighthouse on the / route and record the Performance score.
Update specs/phase-3/STATUS.md.
Generate docs/phase-3-report.md detailing:
- R2 bucket status.
- Video compression settings.
- Video player behavior.
- Navigation and footer status.
- Hero section status.
- Lighthouse scores.
- Bundle size impact.
- Known issues and follow-ups.

Prepare final conventional commits for Phase 3.
```

---

# 9. PHASE 3 DEFINITION OF DONE

Phase 3 is complete only when all of the following are true:

## Cloudflare R2
- [ ] R2 bucket `labxr-assets` exists.
- [ ] CORS policy is applied.
- [ ] `.env.example` includes R2 variables.
- [ ] Upload script works.

## Video Pipeline
- [ ] FFmpeg compression script is executable.
- [ ] MP4, WebM, poster, and thumbnail are generated.
- [ ] Documentation is complete.
- [ ] Upload script works.

## Video Player
- [ ] Thumbnail renders instantly with zero CLS.
- [ ] Video loads only on intersection.
- [ ] Video pauses when off-screen.
- [ ] Mobile shows play button (no autoplay).
- [ ] Desktop autoplays muted videos.
- [ ] iOS Safari has no console errors.
- [ ] Reduced motion is respected.

## Navigation & Footer
- [ ] Navigation renders on all pages.
- [ ] Mobile menu opens, traps focus, closes on Escape.
- [ ] Navigation background changes on scroll.
- [ ] Footer renders with all links.

## Hero Section
- [ ] Hero fills 100dvh.
- [ ] Video background works.
- [ ] Text is readable.
- [ ] Buttons use shadcn components.
- [ ] No layout shift.

## Quality
- [ ] `npm run check` passes with 0 errors.
- [ ] `npm run build` completes successfully.
- [ ] Lighthouse Performance > 90.
- [ ] No console errors on any page.
- [ ] Phase 3 report is generated.

---

# 10. PHASE 3 VALIDATION CHECKLIST FOR HUMAN REVIEW

Before moving to Phase 4, the human should manually verify:

```text
[ ] R2 bucket is accessible via Cloudflare dashboard.
[ ] CORS policy is applied (test with curl or browser).
[ ] FFmpeg script compresses a test video successfully.
[ ] Upload script uploads a test file to R2.
[ ] /dev/video-player loads and all three players behave correctly.
[ ] Video lazy-loads on scroll (check Network tab).
[ ] Mobile shows play button and does not autoplay.
[ ] Desktop autoplays muted video.
[ ] iOS Safari has no console errors.
[ ] Navigation renders on all pages.
[ ] Mobile menu opens, traps focus, closes on Escape.
[ ] Footer renders with all links.
[ ] Hero fills full viewport.
[ ] Hero text is readable over video.
[ ] Buttons are clickable and styled.
[ ] No layout shift on page load.
[ ] Lighthouse Performance > 90.
[ ] Phase 3 report is generated.
[ ] Ready for Phase 4: Portfolio, Services, and Content Sections.
```

---

# 11. NEXT PHASE PREVIEW

After Phase 3 is complete, Phase 4 will focus on:

- **Portfolio Section:** Case study grid with thumbnails.
- **Case Study Modal:** Full-screen video player using the Video Player component.
- **Services Section:** Interactive cards with hover video previews.
- **Manifesto Section:** Split-screen layout with technical visuals.
- **Team Section:** Editorial-style team cards.
- **Content Management:** Markdown/MDX files for case studies and services.

Do not start Phase 4 until Phase 3 passes the validation checklist.