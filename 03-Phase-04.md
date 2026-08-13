Below is the **super detailed, spec-driven Phase 4 instruction pack** intended specifically for **OPENCODE AI**. 

This phase transitions the project from infrastructure and chrome into the **Core Content & Data Architecture**. We will establish Astro Content Collections to manage data cleanly and assemble the main marketing sections.

---

# OPENCODE AI — LABXR.ART PHASE 4 SPEC

## Phase Name

**Phase 4 — Data Architecture, Core Sections, and Portfolio Integration**

---

# 1. OPENCODE AI ROLE

You are acting as a **Senior Frontend Engineer and Content Architect**.

Your responsibility is to structure the site's data layer using Astro Content Collections and build the core marketing sections. You will wire the existing UI primitives (from Phase 2) and the Video Player (from Phase 3) into cohesive, data-driven page sections.

You are not writing the final marketing copy (use realistic placeholders).
You are not implementing GSAP scroll animations yet.
You are not implementing Three.js/WebGL yet.
You are not building the Contact Form or Cloudflare Worker yet.

Your job in Phase 4 is to create:

1. Astro Content Collections with strict Zod schemas for Case Studies, Services, and Team.
2. The Manifesto section (split-screen layout).
3. The Services section (interactive productized cards).
4. The Portfolio section (data-driven grid).
5. The Case Study Modal (integrating shadcn Dialog + Video Player).
6. The Team section (editorial cards).
7. Assembly of the complete Homepage (`index.astro`).
8. A complete Phase 4 validation report.

---

# 2. PRIMARY OBJECTIVE

Prove that LabXR can manage complex, media-rich B2B content via a structured, type-safe data layer while maintaining perfect performance and zero layout shift.

At the end of Phase 4, the project must be able to:

- Parse Markdown/MDX files with strict Zod validation for all lab data.
- Render a complete, scrolling homepage with Hero, Manifesto, Services, Portfolio, Team, and Footer.
- Open a full-screen Case Study modal that lazy-loads the R2 video only when opened.
- Maintain 100% type safety between Markdown frontmatter and React/Astro components.

---

# 3. NON-GOALS FOR PHASE 4

OPENCODE AI must not do any of the following during Phase 4:

- Do not implement GSAP or ScrollTrigger animations (defer to Phase 5).
- Do not implement Three.js/WebGL particle systems (defer to Phase 5).
- Do not build the Contact Form UI or Cloudflare Worker (defer to Phase 5).
- Do not implement complex video-hover previews on Service cards (use CSS-only hover states for now).
- Do not write the final Spanish marketing copy (use high-quality Lorem/Placeholder text).

---

# 4. GLOBAL OPENCODE RULES FOR PHASE 4

## 4.1 Astro Content Collections Rules
- **Strict Zod Schemas:** Every collection (`case-studies`, `services`, `team`) must have a strict Zod schema defined in `src/content.config.ts` (Astro 5.x) or `src/content/config.ts`.
- **No `any` types:** Frontmatter must be strictly typed.
- **Image Optimization:** Use Astro's `image()` helper in the Zod schema for local team photos and case study thumbnails to ensure automatic WebP/AVIF conversion.

## 4.2 Section Assembly Rules
- **Use Phase 2 Primitives:** Every section must be wrapped in `<Container>` and `<Section>` components. Headings must use the `<Heading>` component.
- **Mobile-First Grids:** Use Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` patterns. Never hardcode desktop widths.

## 4.3 Portfolio Modal Rules (Crucial Architecture)
- **Single React Tree:** Do NOT render a separate React `<Dialog>` for every single case study card. This will destroy performance.
- **State-Driven Modal:** Render the Astro grid of cards. When a card is clicked, update a Nano Store (`$activeCaseStudyId`). A single React Island (`<CaseStudyViewer />`) mounted at the bottom of the page reads this store, opens the shadcn Dialog, and renders the Video Player.
- **Memory Management:** When the Dialog closes, the Video Player must unmount to stop buffering and free memory.

---

# 5. PHASE 4 FOLDER STRUCTURE TARGET

```text
labxr-web/
├── src/
│   ├── content/
│   │   ├── config.ts               # Zod schemas for collections
│   │   ├── case-studies/           # Markdown files for projects
│   │   │   ├── espejo-ai.md
│   │   │   └── ...
│   │   ├── services/               # Markdown files for services
│   │   └── team/                   # Markdown files for members
│   ├── components/
│   │   ├── islands/
│   │   │   └── case-study-viewer.tsx # Single React modal for portfolio
│   │   ├── sections/
│   │   │   ├── manifesto.astro
│   │   │   ├── services.astro
│   │   │   ├── portfolio.astro
│   │   │   └── team.astro
│   │   └── shared/
│   │       └── service-card.astro  # Reusable card for services
│   ├── lib/
│   │   └── stores/
│   │       └── portfolio.ts        # Nano store for $activeCaseStudyId
│   └── pages/
│       └── index.astro             # Fully assembled homepage
```

---

# 6. PHASE 4 TASK BREAKDOWN

---

# TASK 4.0 — CREATE PHASE 4 SPEC TRACKING FILES
Create `specs/phase-4/00-phase-overview.md` and `specs/phase-4/STATUS.md`.

---

# TASK 4.1 — ASTRO CONTENT COLLECTIONS (DATA LAYER)
## Objective
Define the strict data models for the site.
## Instructions
1. Create `src/content/config.ts` (or `content.config.ts` depending on Astro 5 exact setup).
2. Define `caseStudies` collection:
   - `title`, `client`, `category`, `pubDate`
   - `videoUrl` (string - R2 URL), `posterUrl` (string - R2 URL)
   - `techStack` (array of strings)
   - `metrics` (object: `interactions`, `uptime`)
3. Define `services` collection:
   - `title`, `slug`, `description`, `icon` (lucide-react icon name string)
4. Define `team` collection:
   - `name`, `role`, `bio`, `avatar` (Astro image helper), `socials` (object)
5. Create 2 placeholder `.md` files for each collection to test the schema.

---

# TASK 4.2 — PORTFOLIO STATE MANAGEMENT
## Objective
Setup the Nano Store for the Portfolio Modal.
## Instructions
1. Create `src/lib/stores/portfolio.ts`.
2. Export `$activeCaseStudyId` (atom, string | null).
3. Export a helper function `openCaseStudy(id: string)` and `closeCaseStudy()`.

---

# TASK 4.3 — MANIFESTO SECTION
## Objective
Build the "Code + Cinema" split-screen section.
## Instructions
1. Create `src/components/sections/manifesto.astro`.
2. Use a CSS Grid layout: 1 column on mobile, 2 columns on desktop (`grid-cols-1 lg:grid-cols-2 gap-12 items-center`).
3. Left side: Large `<Heading>` and `<Prose>` text explaining the LabXR philosophy.
4. Right side: A placeholder for technical visuals (use a stylized code block or a static cinematic image with a dark overlay for now).
5. Wrap in `<Section>` and `<Container>`.

---

# TASK 4.4 — SERVICES SECTION & CARDS
## Objective
Build the productized services grid.
## Instructions
1. Create `src/components/shared/service-card.astro`.
   - Props: `title`, `description`, `iconName`, `slug`.
   - Render a shadcn `Card` with a dark theme.
   - Use `lucide-react` to render the icon dynamically based on `iconName` (requires a React wrapper or mapping).
   - Add a CSS-only hover effect: on `group-hover`, slightly scale the card and change the border color to the primary accent.
2. Create `src/components/sections/services.astro`.
   - Fetch the `services` collection.
   - Render a `<Heading>` "Nuestras Capacidades".
   - Map over the services and render `<ServiceCard>` in a `grid-cols-1 md:grid-cols-2` layout.

---

# TASK 4.5 — PORTFOLIO SECTION (THE GRID)
## Objective
Build the case study grid and trigger mechanism.
## Instructions
1. Create `src/components/sections/portfolio.astro`.
2. Fetch the `caseStudies` collection.
3. Render a `<Heading>` "Proyectos Destacados".
4. Map over the case studies to create a grid of clickable cards.
5. Each card must show: Poster image (using Astro `<Image>` for optimization), Title, Client, and Tech Stack tags.
6. **Interaction:** Attach an `onclick` handler (via a small vanilla JS `<script>` or Astro transition) to each card that calls `openCaseStudy(entry.id)` from the Nano Store.
7. Ensure the grid enforces a strict 16:9 aspect ratio on the poster images to prevent CLS.

---

# TASK 4.6 — CASE STUDY VIEWER (THE MODAL)
## Objective
Build the single React Island that handles the modal and video playback.
## Instructions
1. Create `src/components/islands/case-study-viewer.tsx`.
2. Use `useStore($activeCaseStudyId)` to read the active ID.
3. Pass the entire `caseStudies` data array to this component as a prop from the Astro parent.
4. Find the active case study by ID. If null, return null (do not render Dialog).
5. If active, render the shadcn `<Dialog>` (open state controlled by the store).
6. Inside the Dialog:
   - Render the `<VideoPlayer>` component (from Phase 3) passing the `videoUrl` and `posterUrl`.
   - Render the case study title, description, and tech stack tags below the video.
7. **Cleanup:** Ensure the `onOpenChange` handler of the Dialog calls `closeCaseStudy()`, which unmounts the VideoPlayer and stops network requests.

---

# TASK 4.7 — TEAM SECTION
## Objective
Build the editorial team cards.
## Instructions
1. Create `src/components/sections/team.astro`.
2. Fetch the `team` collection.
3. Render a `grid-cols-1 md:grid-cols-2` layout.
4. Each card should feature the `avatar` (large, editorial style), `name`, `role`, and `bio`.
5. Include social links using `lucide-react` icons.

---

# TASK 4.8 — HOMEPAGE ASSEMBLY
## Objective
Wire everything together.
## Instructions
1. Update `src/pages/index.astro`.
2. Import `BaseLayout`.
3. Import and render sections in order:
   - `<Hero />` (from Phase 3)
   - `<Manifesto />`
   - `<Services />`
   - `<Portfolio />`
   - `<CaseStudyViewer />` (The React Island, pass the fetched case studies data as a prop)
   - `<Team />`
4. Ensure smooth scrolling anchor links work if navigation is clicked.

---

# 7. OPENCODE EXECUTION PROMPTS

Use these prompts sequentially.

## Prompt 1 — Initialize Phase 4
```text
Read AGENTS.md and Phase 4 spec. Create specs/phase-4/ tracking files. Do not write app code.
```

## Prompt 2 — Data Layer (Content Collections)
```text
Execute Task 4.1. Setup Astro Content Collections in src/content/config.ts using Zod.
Define strict schemas for: caseStudies (with videoUrl, posterUrl, techStack), services (with icon string), and team (with Astro image helper for avatar).
Create 2 placeholder markdown files for each collection in src/content/ to validate the schema.
```

## Prompt 3 — Portfolio State
```text
Execute Task 4.2. Create src/lib/stores/portfolio.ts using Nano Stores.
Export $activeCaseStudyId (string | null) and helper functions openCaseStudy(id) and closeCaseStudy().
```

## Prompt 4 — Manifesto Section
```text
Execute Task 4.3. Create src/components/sections/manifesto.astro.
Build a split-screen layout (1 col mobile, 2 col desktop) using Container, Section, and Heading primitives.
Left side: Typography explaining the LabXR philosophy. Right side: A placeholder for technical visuals (e.g., a stylized dark code block or static image).
```

## Prompt 5 — Services Section
```text
Execute Task 4.4. Create src/components/shared/service-card.astro and src/components/sections/services.astro.
Fetch the services collection. Render a grid of cards.
Use shadcn Card, styled with the cinematic dark theme. Map the string icon name to a lucide-react icon (create a small React island for the icon if necessary, or use SVGs).
Add CSS-only group-hover effects (scale, border color change).
```

## Prompt 6 — Portfolio Grid
```text
Execute Task 4.5. Create src/components/sections/portfolio.astro.
Fetch the caseStudies collection. Render a responsive grid of cards.
Each card shows the poster image (enforce 16:9 aspect ratio to prevent CLS), title, and tech stack.
Add an onclick handler to each card that imports and calls openCaseStudy(entry.id) from the Nano Store.
```

## Prompt 7 — Case Study Viewer (Modal)
```text
Execute Task 4.6. Create src/components/islands/case-study-viewer.tsx.
This is a React Island. It receives the array of case studies as a prop.
It uses useStore($activeCaseStudyId) to find the active study.
If active, render the shadcn Dialog. Inside the Dialog, render the Phase 3 VideoPlayer component with the study's videoUrl and posterUrl.
Ensure closing the dialog calls closeCaseStudy() and unmounts the video player to free memory.
```

## Prompt 8 — Team Section
```text
Execute Task 4.7. Create src/components/sections/team.astro.
Fetch the team collection. Render editorial-style cards using the Astro Image component for avatars. Include name, role, bio, and social links.
```

## Prompt 9 — Homepage Assembly & Validation
```text
Execute Task 4.8. Update src/pages/index.astro.
Import BaseLayout, Hero, Manifesto, Services, Portfolio, CaseStudyViewer, and Team.
Render them in order. Pass the fetched caseStudies data to the CaseStudyViewer React Island.
Run npm run check and npm run build. Fix any TypeScript or hydration errors.
Update specs/phase-4/STATUS.md and generate docs/phase-4-report.md.
Commit with message: "feat: assemble homepage with content collections and portfolio modal".
```

---

# 8. PHASE 4 DEFINITION OF DONE

- [ ] Content Collections are defined with strict Zod schemas.
- [ ] Manifesto, Services, Portfolio, and Team sections render correctly using placeholder data.
- [ ] Clicking a Portfolio card opens the shadcn Dialog.
- [ ] The Dialog lazy-loads and plays the correct R2 video using the Phase 3 VideoPlayer.
- [ ] Closing the Dialog unmounts the video and stops network requests.
- [ ] No Cumulative Layout Shift (CLS) on the Portfolio grid.
- [ ] `npm run check` and `npm run build` pass with 0 errors.

---

# 9. NEXT PHASE PREVIEW

After Phase 4, the site will be structurally complete but visually static. **Phase 5** will be the **Polish & Interaction Phase**, where we will introduce:
- **GSAP ScrollTrigger** for cinematic section reveals.
- **Three.js / WebGL** for the Hero particle overlay and Interactive Blueprint.
- **The Contact Form** and Cloudflare Worker integration.
- **Advanced CSS** for the Service card video hover previews.

**Reply "Execute Phase 4" to your AI assistant to begin.**