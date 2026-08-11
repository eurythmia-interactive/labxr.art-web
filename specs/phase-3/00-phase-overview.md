# Phase 3 — Site Chrome, Hero Section, Video Infrastructure, and Media Engine

## Phase Overview

**Phase Name:** Phase 3 — Site Chrome, Hero Section, Video Infrastructure, and Media Engine  
**Duration:** Estimated 3 hours  
**Dependencies:** Phase 2.5 complete  
**Next Phase:** Phase 4 — Portfolio, Services, and Content Sections

---

## 1. Phase Objectives

Transform the project from "design system on paper" to "visible, cinematic web experience with real media infrastructure."

### Primary Goals

1. **Cloudflare R2 Bucket** — Provision and configure media storage with CORS
2. **Video Compression Pipeline** — FFmpeg-based compression scripts
3. **Video Upload Script** — Automated upload to R2
4. **Video Player Component** — Lazy-loading, iOS-compatible, memory-efficient
5. **Video Player Diagnostic Route** — Testing ground for video player
6. **Navigation Component** — Desktop + mobile menu with Nano Stores
7. **Footer Component** — Site footer with social links and contact info
8. **Hero Section** — Full viewport with video background
9. **Phase 3 Validation** — Performance testing and documentation

### Success Criteria

- [ ] Cloudflare R2 bucket `labxr-assets` exists and is configured
- [ ] CORS policy allows localhost, Pages preview URLs, and production domain
- [ ] Video compression script generates MP4, WebM, poster, and thumbnail
- [ ] Video upload script works and sets correct Cache-Control headers
- [ ] Video player lazy-loads and handles iOS Safari autoplay restrictions
- [ ] Navigation renders on all pages with working mobile menu
- [ ] Footer renders with all links and contact info
- [ ] Hero section fills viewport with video background
- [ ] Lighthouse Performance score > 90
- [ ] All validation checks pass

---

## 2. Non-Goals

- Do not build the Portfolio section or case study modals
- Do not build the Services section
- Do not build the Manifesto section
- Do not build the Team section
- Do not implement Three.js, WebGL, or Shaders
- Do not implement GSAP or ScrollTrigger animations
- Do not implement the Webcam Mirror or Interactive Blueprint
- Do not build the contact form or Cloudflare Worker
- Do not connect real analytics yet
- Do not install MediaPipe, TensorFlow, or webcam dependencies

---

## 3. Task Breakdown

### Task 3.0 — Phase 3 Specification Tracking
**Status:** DONE  
**Objective:** Create tracking files for Phase 3 tasks

---

### Task 3.1 — Cloudflare R2 Bucket Setup
**Status:** NOT_STARTED  
**Objective:** Provision R2 bucket and configure CORS for media delivery

**Deliverables:**
- R2 bucket `labxr-assets` created via Cloudflare MCP
- `infra/cloudflare/r2-cors.json` documenting CORS policy
- Updated `.env.example` with R2 variables

**Definition of Done:**
- R2 bucket exists and is accessible
- CORS policy allows required origins
- `.env.example` includes R2 variables
- No secrets committed to Git

---

### Task 3.2 — Video Compression Pipeline
**Status:** NOT_STARTED  
**Objective:** Create FFmpeg-based video compression scripts

**Deliverables:**
- `scripts/compress-video.sh` (executable)
- `docs/media-pipeline.md` (documentation)

**Definition of Done:**
- Script generates MP4, WebM, poster, and thumbnail
- Documentation explains compression settings and usage
- FFmpeg is verified or installation instructions provided

---

### Task 3.3 — Video Upload Script
**Status:** NOT_STARTED  
**Objective:** Create script to upload compressed videos to R2

**Deliverables:**
- `scripts/upload-to-r2.sh` (executable)
- Updated `docs/media-pipeline.md`

**Definition of Done:**
- Upload script works with Cloudflare MCP
- Test file is accessible via R2 URL
- Cache headers are correct
- Documentation is updated

---

### Task 3.4 — Video Player Component (Core)
**Status:** NOT_STARTED  
**Objective:** Build lazy-loading, performance-optimized video player

**Deliverables:**
- `src/lib/hooks/use-intersection-observer.ts`
- `src/lib/video/types.ts`
- `src/lib/video/constants.ts`
- `src/components/shared/video-player.astro`

**Definition of Done:**
- Thumbnail renders instantly with zero CLS
- Video loads only on intersection
- Video pauses when off-screen
- Mobile shows play button (no autoplay)
- Desktop autoplays muted videos
- iOS Safari has no console errors
- Reduced motion is respected

---

### Task 3.5 — Video Player Diagnostic Route
**Status:** NOT_STARTED  
**Objective:** Create testing ground for video player

**Deliverables:**
- `src/pages/dev/video-player.astro`

**Definition of Done:**
- Route loads at `/dev/video-player`
- All three video players behave correctly
- Lazy loading is observable
- Mobile fallback works

---

### Task 3.6 — Navigation Component
**Status:** NOT_STARTED  
**Objective:** Build site navigation with mobile menu

**Deliverables:**
- `src/components/shared/navigation.astro`
- `src/components/islands/mobile-menu.tsx`
- Updated `src/layouts/BaseLayout.astro`

**Definition of Done:**
- Navigation renders on all pages
- Desktop links are visible and styled
- Mobile hamburger toggles the menu
- Mobile menu traps focus and closes on Escape
- Navigation background changes on scroll
- No console errors

---

### Task 3.7 — Footer Component
**Status:** NOT_STARTED  
**Objective:** Build site footer

**Deliverables:**
- `src/components/shared/footer.astro`
- Updated `src/layouts/BaseLayout.astro`

**Definition of Done:**
- Footer renders on all pages
- All links are functional
- Social icons are accessible
- Footer is responsive

---

### Task 3.8 — Hero Section
**Status:** NOT_STARTED  
**Objective:** Build first visible section of LabXR website

**Deliverables:**
- `src/components/sections/hero.astro`
- Updated `src/pages/index.astro`

**Definition of Done:**
- Hero fills full viewport height
- Video background autoplays on desktop (muted)
- Video does not autoplay on mobile
- Text is readable over the video
- Buttons use shadcn Button component
- No layout shift when video loads
- Reduced motion preference is respected

---

### Task 3.9 — Phase 3 Validation & Report
**Status:** NOT_STARTED  
**Objective:** Document completion and validate performance

**Deliverables:**
- `docs/phase-3-report.md`
- Updated `specs/phase-3/STATUS.md`

**Definition of Done:**
- All Phase 3 tasks marked DONE
- Lighthouse Performance score > 90
- No console errors on any page
- Phase 3 report is generated
- Code is committed to Git

---

## 4. Execution Sequence

```
Task 3.0 (5 min)
  ↓
Task 3.1 (15 min) ← Cloudflare MCP
  ↓
Task 3.2 (20 min) ← Requires FFmpeg
  ↓
Task 3.3 (15 min)
  ↓
Task 3.4 (30 min) ← Core video player
  ↓
Task 3.5 (15 min)
  ↓
Task 3.6 (25 min) ← Navigation
  ↓
Task 3.7 (15 min) ← Footer
  ↓
Task 3.8 (30 min) ← Hero section
  ↓
Task 3.9 (20 min) ← Validation
```

**Total estimated time:** ~3 hours

---

## 5. Prerequisites

- [x] Cloudflare MCP authenticated
- [ ] FFmpeg installed (requires manual installation)
- [ ] Placeholder video file ready
- [ ] Placeholder logo SVG ready

---

**Phase 3 created:** 2026-08-11  
**Estimated duration:** 3 hours  
**Ready to start:** YES
