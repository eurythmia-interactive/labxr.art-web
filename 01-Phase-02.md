Below is the **super detailed, spec-driven Phase 2 instruction pack** intended specifically for **OPENCODE AI**.

This phase transitions the project from a barebones infrastructure into a fully realized **Design System, UI Primitive Library, and Global State Architecture**.

---

# OPENCODE AI — LABXR.ART PHASE 2 SPEC

## Phase Name

**Phase 2 — Design System, UI Primitives, Global State, and Base Layout**

---

# 1. OPENCODE AI ROLE

You are acting as a **Senior UI/UX Engineer and Design Systems Architect**.

Your responsibility is to translate the "Cinematic Tech" brand into a robust, accessible, and highly performant design system.

You are not building the final marketing pages yet.  
You are not building Three.js/WebGL scenes yet.  
You are not building the complex video players yet.  
You are not writing GSAP scroll animations yet.

Your job in Phase 2 is to create:

1. A cinematic, dark-first Tailwind theme and CSS variable system.
2. Optimized web typography (Display and Mono).
3. A fully integrated and themed `shadcn/ui` component library.
4. A cross-framework global state architecture using Nano Stores.
5. Device and accessibility detection utilities.
6. Reusable Astro layout primitives (Container, Section, Heading).
7. The production-ready `BaseLayout.astro`.
8. A visual `/dev/design-system` diagnostic route.
9. A complete Phase 2 validation report.

---

# 2. PRIMARY OBJECTIVE

Establish the visual language and foundational UI architecture so that future phases (Hero, Portfolio, Services) can be assembled rapidly using pre-built, accessible, and perfectly styled blocks.

At the end of Phase 2, the project must be able to:

- Render a cohesive, dark cinematic UI.
- Use custom typography without layout shift (CLS).
- Render interactive React components (shadcn/ui) inside Astro pages.
- Share state between isolated React islands and Astro components.
- Detect mobile devices and reduced-motion preferences globally.
- Wrap any future page content in standardized `<Container>` and `<Section>` components.
- Pass all accessibility contrast and focus-state checks.

---

# 3. NON-GOALS FOR PHASE 2

OPENCODE AI must not do any of the following during Phase 2:

- Do not build the Hero section.
- Do not build the Portfolio grid or modals.
- Do not build the Services section.
- Do not implement Three.js, WebGL, or Shaders.
- Do not implement GSAP or complex scroll animations.
- Do not implement the Cloudflare R2 video pipeline.
- Do not build the final contact form logic (only the UI primitives).
- Do not install MediaPipe, TensorFlow, or webcam dependencies.
- Do not connect to real Cloudflare Workers yet.

---

# 4. REQUIRED HUMAN INPUTS

Before OPENCODE AI can fully complete Phase 2, the human developer may need to provide:

1. **Brand Colors:** Exact Hex codes for the LabXR cinematic palette (or approval for OPENCODE to generate a high-contrast cinematic palette: e.g., Deep Obsidian, Silver, and a Neon Accent like Cyan or Amber).
2. **Typography Files:** `.woff2` font files for the Display font (e.g., Inter, Geist, or a custom cinematic serif) and Mono font (e.g., JetBrains Mono, Geist Mono), OR approval to use Google Fonts/CDN.
3. **Logo SVG:** The LabXR logo in SVG format for the navigation skeleton.

_If missing, OPENCODE must use high-quality open-source placeholders (e.g., Inter + JetBrains Mono via `astro-font` or local `@font-face`) and a default cinematic palette, documenting them for later replacement._

---

# 5. GLOBAL OPENCODE RULES FOR PHASE 2

## 5.1 Design System Rules

- **Dark-First:** LabXR is inherently a dark-themed brand. Do not build a light mode toggle unless explicitly requested. Optimize for dark mode contrast (WCAG AA).
- **CSS Variables:** All colors, radii, and shadows must be defined as CSS variables in `src/styles/global.css` and mapped to Tailwind config.
- **No Hardcoded Colors:** Never use `bg-gray-900` or `text-blue-500` in components. Always use semantic tokens like `bg-background`, `text-foreground`, `text-accent`.

## 5.2 shadcn/ui & React Rules

- **Astro Integration:** shadcn/ui is built for React. In Astro, these components must live in `src/components/ui/` and be imported into Astro files using `client:load` or `client:visible`.
- **Styling:** Use `tailwind-merge` and `class-variance-authority` (cva) for component variants.
- **Accessibility:** shadcn components are Radix-based and accessible by default. Do not strip ARIA attributes or keyboard navigation logic when theming.

## 5.3 Global State Rules (Nano Stores)

- **Cross-Framework:** Use **Nano Stores** (`nanostores` + `@nanostores/react`) for global state. It is lightweight, framework-agnostic, and perfect for Astro.
- **No Zustand/Jotai:** Do not install Zustand or Jotai. Nano Stores is the standard for Astro.
- **Isolation:** React Context may ONLY be used inside a single React Island tree. It cannot cross Astro boundaries.

## 5.4 Typography & Performance Rules

- **Font Loading:** Use `@font-face` with `font-display: swap` in `global.css`. Host fonts locally in `public/fonts/` to avoid third-party DNS lookups and GDPR issues.
- **Preloading:** Preload the primary display font in the `<head>` of `BaseLayout.astro`.

---

# 6. PHASE 2 FOLDER STRUCTURE TARGET

OPENCODE AI must update the repository to include the following new files/folders:

```text
labxr-web/
├── public/
│   └── fonts/                  # Local .woff2 font files
├── src/
│   ├── components/
│   │   ├── islands/            # (Keep health-check, add state-test)
│   │   ├── sections/           # (Empty for now)
│   │   ├── shared/             # Container.astro, Section.astro, Heading.astro
│   │   └── ui/                 # shadcn components (button, dialog, input, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro    # The master layout
│   ├── lib/
│   │   ├── stores/             # Nano stores (device, motion, ui)
│   │   └── utils.ts            # cn() utility for tailwind-merge
│   ├── pages/
│   │   └── dev/
│   │       └── design-system.astro # Visual testing route
│   └── styles/
│       └── global.css          # CSS variables, @font-face, base resets
├── components.json             # shadcn/ui configuration
└── tailwind.config.mjs         # Extended theme
```

---

# 7. PHASE 2 TASK BREAKDOWN

OPENCODE AI must execute the following tasks in order.

---

# TASK 2.0 — CREATE PHASE 2 SPEC TRACKING FILES

## Objective

Create specification tracking for Phase 2.

## Instructions

Create `specs/phase-2/00-phase-overview.md` and `specs/phase-2/STATUS.md`. List all Phase 2 tasks.

---

# TASK 2.1 — TYPOGRAPHY & FONT LOADING

## Objective

Implement high-performance, zero-CLS web typography.

## Instructions

1. Create `public/fonts/` directory.
2. Add open-source `.woff2` files (e.g., Inter for UI, JetBrains Mono for tech specs). _If human provides custom fonts, use those._
3. In `src/styles/global.css`, write `@font-face` declarations for Regular, Medium, Bold (Display) and Regular (Mono). Use `font-display: swap`.
4. Update `tailwind.config.mjs` to map these fonts to `font-sans` and `font-mono`.
5. Create base typography resets in `global.css` (e.g., `body { font-family: theme('font.sans'); }`).

## Definition of Done

- Fonts load without external network requests.
- Tailwind classes `font-sans` and `font-mono` apply the correct fonts.
- No Cumulative Layout Shift (CLS) occurs on load.

---

# TASK 2.2 — TAILWIND THEME & CSS VARIABLES

## Objective

Define the "Cinematic Dark" visual language.

## Instructions

1. In `src/styles/global.css`, define a `:root` block with CSS variables for the dark theme:
   - `--background`: Deep obsidian/black (e.g., `#09090b` or `#050505`).
   - `--foreground`: Off-white/silver for readability (e.g., `#fafafa` or `#e4e4e7`).
   - `--primary`: A striking cinematic accent (e.g., Neon Cyan `#06b6d4` or Amber `#f59e0b`).
   - `--muted`, `--border`, `--card`, `--destructive`.
2. Update `tailwind.config.mjs` to map these CSS variables to Tailwind utility classes (e.g., `backgroundColor: { background: 'hsl(var(--background))' }`).
3. Add custom border-radius and shadow tokens.

## Definition of Done

- `global.css` contains the complete CSS variable palette.
- Tailwind config correctly references the CSS variables.
- Using `bg-background` and `text-primary` in an Astro file works.

---

# TASK 2.3 — shadcn/ui INITIALIZATION & ASTRO INTEGRATION

## Objective

Install and configure shadcn/ui for Astro + React 19.

## Instructions

1. Install core dependencies: `tailwind-merge`, `clsx`, `class-variance-authority`, `lucide-react`.
2. Create `src/lib/utils.ts` with the standard `cn()` helper function.
3. Initialize `shadcn/ui` (via CLI or manual setup) creating `components.json`.
   - **Crucial:** Set the `components` alias to `@/components/ui`.
   - Set the `utils` alias to `@/lib/utils`.
4. Ensure `tsconfig.json` and Astro config resolve these paths correctly.

## Definition of Done

- `components.json` exists and is configured for Astro.
- `cn()` utility works.
- No TypeScript errors regarding shadcn paths.

---

# TASK 2.4 — CORE UI PRIMITIVES INSTALLATION & THEMING

## Objective

Install and theme the foundational shadcn components.

## Instructions

1. Add the following shadcn components: `button`, `input`, `textarea`, `dialog`, `tooltip`, `separator`.
2. **Theming:** Modify the generated files in `src/components/ui/` to ensure they strictly use the LabXR CSS variables (e.g., `bg-primary`, `text-primary-foreground`).
3. Ensure the `Button` component has variants: `default` (accent), `outline` (border), `ghost` (transparent), and `link`.
4. Ensure the `Dialog` component uses a dark, blurred backdrop (`backdrop-blur-md bg-black/80`).

## Definition of Done

- Components exist in `src/components/ui/`.
- Components render correctly when imported into an Astro file using `client:load`.
- Colors match the cinematic dark theme.

---

# TASK 2.5 — GLOBAL STATE ARCHITECTURE (NANO STORES)

## Objective

Setup cross-framework state management.

## Instructions

1. Install `nanostores` and `@nanostores/react`.
2. Create `src/lib/stores/device.ts`:
   - Export a store for `isMobile` (boolean).
3. Create `src/lib/stores/motion.ts`:
   - Export a store for `prefersReducedMotion` (boolean).
4. Create `src/lib/stores/ui.ts`:
   - Export a store for `isMobileMenuOpen` (boolean).
5. Create a React hook `src/lib/hooks/use-device.ts` that reads the store and updates it on window resize (client-side only).

## Definition of Done

- Nano stores are defined.
- React hooks can read and write to the stores.
- Astro components can read the stores (using `import { useStore } from '@nanostores/react'` inside a React wrapper, or native Nano Store subscriptions in `<script>` tags).

---

# TASK 2.6 — SHARED LAYOUT PRIMITIVES

## Objective

Create the structural building blocks for all future pages.

## Instructions

Create the following `.astro` components in `src/components/shared/`:

1. `Container.astro`: Restricts max-width (e.g., `max-w-7xl`), centers content (`mx-auto`), and adds horizontal padding (`px-4 md:px-8`).
2. `Section.astro`: Adds consistent vertical rhythm (`py-16 md:py-24`), accepts a `variant` prop (default, muted, accent).
3. `Heading.astro`: Handles `h1` through `h4` with strict typographic scale and tracking (letter-spacing).
4. `Prose.astro`: Wraps text content with optimized line-heights, paragraph spacing, and link styling.

## Definition of Done

- Components exist and accept slots.
- Components enforce mobile-first padding and spacing.
- No hardcoded colors (uses theme variables).

---

# TASK 2.7 — BASE LAYOUT & SEO SKELETON

## Objective

Build the master layout that wraps all future pages.

## Instructions

1. Create `src/layouts/BaseLayout.astro`.
2. Props: `title`, `description`, `ogImage`, `noindex` (boolean).
3. `<head>`:
   - Inject meta tags (Title, Description, OG, Twitter).
   - Inject `<link rel="preload">` for the primary font.
   - Inject global CSS (`import '@/styles/global.css'`).
   - Add placeholder for Analytics script.
4. `<body>`:
   - Apply `bg-background text-foreground antialiased`.
   - Include a `<slot />` for page content.
5. Update `src/pages/index.astro` to use `BaseLayout` and render a simple `<Container>` + `<Heading>` to prove it works.

## Definition of Done

- `BaseLayout.astro` handles SEO tags dynamically.
- Fonts preload correctly.
- `index.astro` renders inside the layout without errors.

---

# TASK 2.8 — DESIGN SYSTEM DIAGNOSTIC ROUTE

## Objective

Create a visual sandbox to test all Phase 2 work.

## Instructions

1. Create `src/pages/dev/design-system.astro`.
2. Wrap in `BaseLayout` (set `noindex={true}`).
3. Render sections demonstrating:
   - Typography scale (H1-H6, Mono text).
   - Color palette swatches (Background, Foreground, Primary, Muted).
   - shadcn Buttons (all variants and states).
   - shadcn Inputs and Textareas.
   - A test Dialog (triggered by a button).
   - A test Tooltip.
4. Include a React Island that displays the current `isMobile` and `prefersReducedMotion` state from Nano Stores to prove state hydration.

## Definition of Done

- Route loads at `/dev/design-system`.
- All UI elements render and are interactive.
- Dialog opens/closes.
- Nano store state displays correctly on the client.
- Mobile responsive layout works.

---

# TASK 2.9 — PHASE 2 VALIDATION & REPORT

## Objective

Document completion and cleanup.

## Instructions

1. Run `npm run check` and `npm run format`. Fix any issues.
2. Update `specs/phase-2/STATUS.md`.
3. Generate `docs/phase-2-report.md` detailing:
   - Typography choices and loading strategy.
   - Color palette hex codes and CSS variable mapping.
   - shadcn components installed.
   - Nano store architecture.
   - Bundle size impact of shadcn + Nano Stores.
4. Commit changes with conventional commits.

---

# 8. OPENCODE EXECUTION PROMPTS

Use the following prompts sequentially with OPENCODE AI.

---

## Prompt 1 — Initialize Phase 2 Spec Tracking

```text
Read AGENTS.md and the Phase 2 instruction set.
Create specs/phase-2/00-phase-overview.md and specs/phase-2/STATUS.md.
List all Phase 2 tasks with status NOT_STARTED.
Do not write application code.
```

## Prompt 2 — Typography & Fonts

```text
Execute Phase 2 Task 2.1.
Setup local web typography.
Create public/fonts/ and add placeholders for Inter (sans) and JetBrains Mono (mono) .woff2 files (or use astro-font if preferred for Google Fonts).
Write @font-face declarations in src/styles/global.css with font-display: swap.
Map them to Tailwind's font-sans and font-mono in tailwind.config.mjs.
Ensure no CLS occurs.
```

## Prompt 3 — Tailwind Theme & CSS Variables

```text
Execute Phase 2 Task 2.2.
Define the LabXR "Cinematic Dark" theme.
In src/styles/global.css, create CSS variables for background (deep black), foreground (silver/off-white), primary (cinematic accent), muted, border, and card.
Update tailwind.config.mjs to map these CSS variables to Tailwind utility classes (e.g., bg-background, text-primary).
Do not use hardcoded hex values in components later.
```

## Prompt 4 — shadcn/ui Initialization

```text
Execute Phase 2 Task 2.3.
Install tailwind-merge, clsx, class-variance-authority, and lucide-react.
Create src/lib/utils.ts with the cn() helper.
Initialize shadcn/ui by creating components.json.
Ensure components.json points to @/components/ui for components and @/lib/utils for utilities.
Verify TypeScript paths resolve correctly.
```

## Prompt 5 — Core UI Primitives

```text
Execute Phase 2 Task 2.4.
Add shadcn components: button, input, textarea, dialog, tooltip, separator.
Theme them to strictly use the LabXR CSS variables defined in global.css.
Ensure the Dialog uses a dark, blurred backdrop.
Ensure the Button has default, outline, ghost, and link variants.
Test that they can be imported into an Astro file using client:load.
```

## Prompt 6 — Global State (Nano Stores)

```text
Execute Phase 2 Task 2.5.
Install nanostores and @nanostores/react.
Create src/lib/stores/device.ts (isMobile), src/lib/stores/motion.ts (prefersReducedMotion), and src/lib/stores/ui.ts (isMobileMenuOpen).
Create a React hook src/lib/hooks/use-device.ts that updates the isMobile store on window resize (client-side only).
Ensure no SSR hydration mismatches occur when reading these stores.
```

## Prompt 7 — Shared Layout Primitives

```text
Execute Phase 2 Task 2.6.
Create Astro components in src/components/shared/:
- Container.astro (max-w-7xl, mx-auto, responsive padding)
- Section.astro (vertical rhythm, variant props)
- Heading.astro (h1-h4 typographic scale)
- Prose.astro (text formatting)
Ensure they use Tailwind theme classes and accept slots.
```

## Prompt 8 — Base Layout & SEO

```text
Execute Phase 2 Task 2.7.
Create src/layouts/BaseLayout.astro.
Accept props for title, description, ogImage, noindex.
Inject dynamic meta tags in the <head>.
Preload the primary font.
Import global.css.
Apply bg-background and text-foreground to the <body>.
Update src/pages/index.astro to use this layout and render a Container with a Heading.
```

## Prompt 9 — Design System Diagnostic Route

```text
Execute Phase 2 Task 2.8.
Create src/pages/dev/design-system.astro (noindex).
Build a visual sandbox demonstrating:
- Typography scale
- Color palette swatches
- All shadcn Button variants
- shadcn Input/Textarea
- A working Dialog and Tooltip
- A React Island that reads and displays the Nano Stores (isMobile, prefersReducedMotion) to prove cross-framework state works.
Make it responsive and dark-themed.
```

## Prompt 10 — Phase 2 Validation & Report

```text
Execute Phase 2 Task 2.9.
Run npm run check and npm run format. Fix any errors.
Update specs/phase-2/STATUS.md.
Generate docs/phase-2-report.md detailing the typography, color palette hex codes, shadcn setup, Nano store architecture, and bundle size impact.
Prepare the final conventional commits for Phase 2.
```

---

# 9. PHASE 2 DEFINITION OF DONE

Phase 2 is complete only when all of the following are true:

## Visual & Theming

- [ ] `global.css` contains the complete CSS variable palette.
- [ ] Tailwind config maps CSS variables to utility classes.
- [ ] Custom fonts load locally without external network requests.
- [ ] No Cumulative Layout Shift (CLS) on font load.

## UI Primitives

- [ ] `components.json` is configured for Astro.
- [ ] `cn()` utility works.
- [ ] shadcn Button, Input, Dialog, and Tooltip are installed and themed.
- [ ] Components render correctly in Astro via `client:load`.

## State & Architecture

- [ ] Nano Stores are installed and configured.
- [ ] `device`, `motion`, and `ui` stores exist.
- [ ] React hooks can read/update stores without hydration errors.
- [ ] Shared primitives (`Container`, `Section`, `Heading`) exist and enforce spacing.

## Layout & Routing

- [ ] `BaseLayout.astro` handles dynamic SEO tags and font preloading.
- [ ] `/dev/design-system` route loads and displays all elements.
- [ ] Nano store state displays correctly on the client in the diagnostic route.

## Quality & Hygiene

- [ ] `npm run check` passes with 0 errors.
- [ ] `npm run build` completes successfully.
- [ ] No hardcoded hex colors exist in component files (only Tailwind semantic tokens).
- [ ] Phase 2 report is generated.

---

# 10. PHASE 2 VALIDATION CHECKLIST FOR HUMAN REVIEW

Before moving to Phase 3 (Video Infrastructure & Media), the human should manually verify:

```text
[ ] /dev/design-system loads locally and in preview build.
[ ] Typography looks crisp and loads instantly.
[ ] Dark theme contrast is comfortable (not pure #000000 on pure #FFFFFF).
[ ] shadcn Buttons look cinematic and have correct hover states.
[ ] Dialog opens, traps focus, and closes on Escape.
[ ] Nano Store correctly identifies when I resize the browser to mobile width.
[ ] Nano Store correctly identifies my OS "Reduce Motion" setting.
[ ] BaseLayout injects the correct Title and OG tags on index.astro.
[ ] No console errors regarding hydration mismatches.
[ ] Ready for Phase 3: Video Engine, R2 Pipeline, and Lazy Loading.
```

---

# 11. NEXT PHASE PREVIEW

After Phase 2 is complete, Phase 3 will focus on:

- **Cloudflare R2 Integration:** Setting up the actual bucket and CORS.
- **Video Compression Pipeline:** FFmpeg scripts for web-optimized MP4/WebM.
- **Custom Astro Video Player:** IntersectionObserver lazy-loading, iOS fallbacks, and memory management.
- **Media State:** Syncing video playback state with Nano Stores.

Do not start Phase 3 until Phase 2 passes the validation checklist.
