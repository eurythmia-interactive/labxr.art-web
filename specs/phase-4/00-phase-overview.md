# Phase 4 — Data Architecture, Core Sections, and Portfolio Integration

## Phase Overview

**Phase Name:** Phase 4 — Data Architecture, Core Sections, and Portfolio Integration  
**Duration:** Estimated 4-5 hours  
**Dependencies:** Phase 3 complete  
**Next Phase:** Phase 5 — Polish & Interaction (GSAP, Three.js, Contact Form)

---

## 1. Phase Objectives

Transform the project from "infrastructure and chrome" to "complete, data-driven marketing site with content collections and portfolio modal."

### Primary Goals

1. **Astro Content Collections** — Strict Zod schemas for Case Studies, Services, Team
2. **Portfolio State Management** — Nano Store for modal state
3. **Manifesto Section** — Split-screen layout with philosophy
4. **Services Section** — Interactive productized cards
5. **Portfolio Section** — Data-driven grid with click-to-open modal
6. **Case Study Viewer** — Single React modal with video player integration
7. **Team Section** — Editorial cards with avatars
8. **Homepage Assembly** — Wire all sections together
9. **Phase 4 Validation** — Performance testing and documentation

### Success Criteria

- [ ] Content Collections defined with strict Zod schemas
- [ ] Markdown files parse correctly with type safety
- [ ] Manifesto section renders with split-screen layout
- [ ] Services section renders grid of cards from collection data
- [ ] Portfolio section renders grid from case studies collection
- [ ] Clicking portfolio card opens modal with video player
- [ ] Modal lazy-loads video only when opened
- [ ] Closing modal unmounts video and frees memory
- [ ] Team section renders cards with avatars
- [ ] Homepage assembles all sections in correct order
- [ ] `npm run check` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] No console errors on any page

---

## 2. Non-Goals

- Do not implement GSAP or ScrollTrigger animations (Phase 5)
- Do not implement Three.js/WebGL particle systems (Phase 5)
- Do not build Contact Form UI or Cloudflare Worker (Phase 5)
- Do not implement complex video-hover previews on Service cards (Phase 5)
- Do not write final Spanish marketing copy (use placeholder text)

---

## 3. Task Breakdown

### Task 4.0 — Phase 4 Specification Tracking
**Status:** IN_PROGRESS  
**Objective:** Create tracking files for Phase 4 tasks

**Deliverables:**
- `specs/phase-4/00-phase-overview.md`
- `specs/phase-4/STATUS.md`

---

### Task 4.1 — Astro Content Collections (Data Layer)
**Status:** NOT_STARTED  
**Objective:** Define strict data models for the site

**Deliverables:**
- `src/content.config.ts` (Astro 5 Content Layer API)
- `src/content/case-studies/*.md` (2 placeholder files)
- `src/content/services/*.md` (2 placeholder files)
- `src/content/team/*.md` (2 placeholder files)
- `src/assets/images/team/*.svg` (2 placeholder avatars)

**Definition of Done:**
- Three collections defined with Zod schemas
- All schemas use strict typing (no `any`)
- 2 placeholder markdown files per collection
- Placeholder team avatar SVGs created
- `npm run check` passes

---

### Task 4.2 — Portfolio State Management
**Status:** NOT_STARTED  
**Objective:** Setup Nano Store for Portfolio Modal

**Deliverables:**
- `src/lib/stores/portfolio.ts`

**Definition of Done:**
- `$activeCaseStudyId` atom exported (string | null)
- `openCaseStudy(id)` helper function
- `closeCaseStudy()` helper function
- Follows existing Nano Stores pattern

---

### Task 4.3 — Manifesto Section
**Status:** NOT_STARTED  
**Objective:** Build "Code + Cinema" split-screen section

**Deliverables:**
- `src/components/sections/manifesto.astro`

**Definition of Done:**
- Uses `<Section>`, `<Container>`, `<Heading>`, `<Text>` primitives
- CSS Grid: 1 col mobile, 2 col desktop
- Left side: Philosophy text
- Right side: Placeholder visual (code block or image)
- Responsive layout works correctly

---

### Task 4.4 — Services Section & Cards
**Status:** NOT_STARTED  
**Objective:** Build productized services grid

**Deliverables:**
- `src/components/islands/lucide-icon.tsx`
- `src/components/shared/service-card.astro`
- `src/components/sections/services.astro`

**Definition of Done:**
- LucideIcon island maps string names to icons
- ServiceCard uses shadcn Card with dark theme
- CSS-only hover effects (scale, border color)
- Services section fetches collection and renders grid
- Grid: `grid-cols-1 md:grid-cols-2`

---

### Task 4.5 — Portfolio Section (The Grid)
**Status:** NOT_STARTED  
**Objective:** Build case study grid with click-to-open mechanism

**Deliverables:**
- `src/components/sections/portfolio.astro`

**Definition of Done:**
- Fetches `caseStudies` collection
- Renders responsive grid of cards
- Each card shows poster (16:9 aspect ratio), title, client, tech stack
- Click handler calls `openCaseStudy(entry.id)` from Nano Store
- Zero CLS (aspect ratio enforced)

---

### Task 4.6 — Case Study Viewer (The Modal)
**Status:** NOT_STARTED  
**Objective:** Build single React modal for portfolio

**Deliverables:**
- `src/components/islands/case-study-viewer.tsx`

**Definition of Done:**
- Receives case studies array as prop
- Uses `useStore($activeCaseStudyId)` to find active study
- Renders shadcn Dialog when active
- Inside Dialog: VideoPlayerIsland with videoUrl/posterUrl
- Closing Dialog calls `closeCaseStudy()`
- Video unmounts when Dialog closes (memory management)

---

### Task 4.7 — Team Section
**Status:** NOT_STARTED  
**Objective:** Build editorial team cards

**Deliverables:**
- `src/components/sections/team.astro`

**Definition of Done:**
- Fetches `team` collection
- Renders grid: `grid-cols-1 md:grid-cols-2`
- Cards feature avatar (Astro Image), name, role, bio
- Social links with lucide-react icons
- Responsive layout works correctly

---

### Task 4.8 — Homepage Assembly
**Status:** NOT_STARTED  
**Objective:** Wire everything together

**Deliverables:**
- Updated `src/pages/index.astro`

**Definition of Done:**
- Imports BaseLayout, Hero, Manifesto, Services, Portfolio, CaseStudyViewer, Team
- Renders sections in order
- Passes case studies data to CaseStudyViewer
- Smooth scrolling anchor links work
- No console errors

---

### Task 4.9 — Phase 4 Validation & Report
**Status:** NOT_STARTED  
**Objective:** Document completion and validate performance

**Deliverables:**
- `docs/phase-4-report.md`
- Updated `specs/phase-4/STATUS.md`

**Definition of Done:**
- All Phase 4 tasks marked DONE
- `npm run check` passes with 0 errors
- `npm run build` succeeds
- No console errors on any page
- Phase 4 report generated
- Code is committed to Git

---

## 4. Execution Sequence

```
Task 4.0 (5 min)
  ↓
Task 4.1 (30 min) ← Content Collections
  ↓
Task 4.2 (10 min) ← Nano Store
  ↓
Task 4.3 (20 min) ← Manifesto
  ↓
Task 4.4 (30 min) ← Services + Cards
  ↓
Task 4.5 (25 min) ← Portfolio Grid
  ↓
Task 4.6 (30 min) ← Case Study Viewer
  ↓
Task 4.7 (20 min) ← Team
  ↓
Task 4.8 (20 min) ← Homepage Assembly
  ↓
Task 4.9 (20 min) ← Validation
```

**Total estimated time:** ~3.5 hours

---

## 5. Prerequisites

- [x] Phase 3 complete (video player, navigation, footer, hero)
- [x] Astro 5.8.7 installed
- [x] React 19.2.8 installed
- [x] Nano Stores installed
- [x] shadcn/ui components (Card, Dialog) installed
- [x] lucide-react installed

---

**Phase 4 created:** 2026-08-13  
**Estimated duration:** 3.5-4 hours  
**Ready to start:** YES
