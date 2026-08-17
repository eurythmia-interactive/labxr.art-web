Here is the comprehensive, task-by-task implementation plan designed specifically for OpenCode. It is structured as a series of copy-paste prompts.

---

# Implementation Plan: Multi-Page Routing & Runtime Theme Switcher

## Phase 1: Runtime Theme Switcher Infrastructure
**Objective:** Refactor the CSS theme system to support runtime switching without page reloads, and build the UI switcher.

### TASK 1.1: Refactor Theme Files to Class-Based Scoping

**Prompt for OpenCode:**
```text
We need to refactor the theme system to support runtime switching. Currently, themes use `:root`. We need to change them to use `html.theme-[name]` so multiple themes can be loaded simultaneously without conflicting.

1. Open `src/styles/themes/cinematic-dark.css`. Change `:root {` to `html.theme-cinematic {`.
2. Open `src/styles/themes/minimal-mono.css`. Change `:root {` to `html.theme-minimal {`.
3. Open `src/styles/themes/neo-brutalist.css`. Change `:root {` to `html.theme-brutalist {`.
4. Open `src/styles/themes/glassmorphism.css`. Change `:root {` to `html.theme-glass {`.
5. Open `src/styles/themes/aurora-glass.css`, `sunset-glass.css`, `frosted-minimal.css`, and `neon-glass.css` (if they exist). Change `:root {` to `html.theme-[name] {` (e.g., `html.theme-aurora`, `html.theme-sunset`, etc.).

Validation:
- All theme files now use `html.theme-[name]` instead of `:root`.
- No other changes were made to the CSS variables.
- Run `npm run check` to ensure no errors.

DO NOT proceed to the next task until this is complete.
```

### TASK 1.2: Update BaseLayout to Load All Themes

**Prompt for OpenCode:**
```text
Now we need to load all theme files in the `<head>` so they are available in the browser cache for instant switching.

1. Open `src/layouts/BaseLayout.astro`.
2. In the frontmatter, import all theme files:
   ```astro
   import '@styles/themes/cinematic-dark.css';
   import '@styles/themes/minimal-mono.css';
   import '@styles/themes/neo-brutalist.css';
   import '@styles/themes/glassmorphism.css';
   // Add any other theme files you created
   ```
3. Remove the theme import from `src/styles/global.css` (delete the `@import './themes/...'` line). The themes are now loaded directly in the layout.
4. In `BaseLayout.astro`, add a default class to the `<html>` tag so the site doesn't flash unstyled:
   ```astro
   <html lang="en" class="theme-cinematic">
   ```

Validation:
- `src/styles/global.css` no longer imports a theme file.
- `BaseLayout.astro` imports all theme files in the frontmatter.
- `<html>` tag has `class="theme-cinematic"`.
- Run `npm run dev` and verify the site looks exactly the same as before.

DO NOT proceed to the next task until validation passes.
```

### TASK 1.3: Create the ThemeSwitcher React Island

**Prompt for OpenCode:**
```text
Create a React component that allows users to switch themes at runtime and persists the choice in localStorage.

1. Create file `src/components/islands/theme-switcher.tsx`.
2. Implement the following logic:
   - On mount, read `localStorage.getItem('labxr-theme')`. If it exists, apply it to `document.documentElement.classList`. If not, default to `theme-cinematic`.
   - Render a dropdown or a set of buttons (use shadcn `DropdownMenu` or simple buttons) with the available themes: Cinematic, Minimal, Brutalist, Glass, Aurora, Sunset, Frosted, Neon.
   - On click, remove all `theme-*` classes from `document.documentElement`, add the selected `theme-[name]` class, and save to `localStorage`.
   - Use a Lucide icon (e.g., `Palette` or `Sun`) for the trigger button.
3. Ensure the component is fully typed and uses Tailwind classes for styling.

Example structure:
```tsx
import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const themes = [
  { name: 'Cinematic', class: 'theme-cinematic' },
  { name: 'Minimal', class: 'theme-minimal' },
  { name: 'Brutalist', class: 'theme-brutalist' },
  { name: 'Glass', class: 'theme-glass' },
  // Add others...
];

export default function ThemeSwitcher() {
  // ... implementation
}
```

Validation:
- File `src/components/islands/theme-switcher.tsx` exists.
- Component compiles without TypeScript errors.
- Run `npm run check`.

DO NOT proceed to the next task until this is complete.
```

### TASK 1.4: Integrate ThemeSwitcher into Navigation

**Prompt for OpenCode:**
```text
Add the ThemeSwitcher to the main navigation so users can access it from any page.

1. Open `src/components/shared/navigation.astro`.
2. Import the `ThemeSwitcher` island in the frontmatter:
   ```astro
   import ThemeSwitcher from '../islands/theme-switcher';
   ```
3. Add `<ThemeSwitcher client:load />` to the desktop navigation (right side, next to the CTA button or menu).
4. Also add it to the mobile menu (`MobileMenu` island) so mobile users can switch themes. You may need to pass the theme list to the mobile menu or render the `ThemeSwitcher` inside it.
5. Ensure the switcher doesn't break the mobile menu layout (it should be compact).

Validation:
- Theme switcher is visible in the desktop header.
- Theme switcher is accessible in the mobile menu.
- Clicking a theme instantly changes the site appearance without reloading.
- Refreshing the page retains the selected theme.

DO NOT proceed to the next task until validation passes.
```

---

## Phase 2: Multi-Page Routing (Discipline Variations)
**Objective:** Create dynamic pages for different disciplines (XR, UX, Dev, etc.) that filter the portfolio and services.

### TASK 2.1: Update Content Collections with Discipline Field

**Prompt for OpenCode:**
```text
We need to categorize our content so we can filter it by discipline on different pages.

1. Open `src/content.config.ts`.
2. Update the `case-studies` schema to include a `disciplines` field:
   ```typescript
   disciplines: z.array(z.enum(['xr', 'ux-design', 'dev', 'videomapping', 'interactivity', 'museography', 'products'])).default([]),
   ```
3. Update the `services` schema similarly:
   ```typescript
   disciplines: z.array(z.enum(['xr', 'ux-design', 'dev', 'videomapping', 'interactivity', 'museography', 'products'])).default([]),
   ```
4. Update the existing markdown files in `src/content/case-studies/` and `src/content/services/` to include at least one discipline in the frontmatter. For example:
   ```markdown
   ---
   title: "Project Alpha"
   disciplines: ['xr', 'interactivity']
   ---
   ```

Validation:
- `src/content.config.ts` has the new `disciplines` field.
- At least one case study and one service have the `disciplines` field populated.
- Run `npm run check` to ensure no schema errors.

DO NOT proceed to the next task until this is complete.
```

### TASK 2.2: Create Dynamic Discipline Route

**Prompt for OpenCode:**
```text
Create a dynamic route that generates a page for each discipline.

1. Create directory `src/pages/discipline/`.
2. Create file `src/pages/discipline/[slug].astro`.
3. In the frontmatter:
   - Define the list of valid slugs: `['xr', 'ux-design', 'dev', 'videomapping', 'interactivity', 'museography', 'products']`.
   - Use `getStaticPaths()` to return a path for each slug.
   - Fetch all case studies and services.
   - Filter them based on `frontmatter.disciplines.includes(Astro.params.slug)`.
   - Define a `pageTitle` and `pageDescription` for each slug (e.g., slug 'xr' -> title "XR Experiences | LabXR.art").
4. In the template:
   - Use `<BaseLayout>` with the dynamic title and description.
   - Render a `<Hero>` section (reuse the existing hero or create a simplified `DisciplineHero` section that shows the discipline name).
   - Render the filtered `<Portfolio>` section (pass the filtered case studies).
   - Render the filtered `<Services>` section (pass the filtered services).
   - Render the `<Contact>` section.

Validation:
- `src/pages/discipline/[slug].astro` exists and is valid Astro syntax.
- Running `npm run build` generates pages for all 7 disciplines.
- Visiting `/discipline/xr` shows only case studies/services tagged with 'xr'.

DO NOT proceed to the next task until validation passes.
```

### TASK 2.3: Create a Reusable Discipline Hero Section

**Prompt for OpenCode:**
```text
The discipline pages need a hero section that clearly states the discipline.

1. Create file `src/components/sections/discipline-hero.astro`.
2. Props: `title` (string), `description` (string).
3. Layout: Similar to the main hero but simpler. No video background (to keep it lightweight), just a strong typographic statement with a subtle gradient or solid background.
4. Example:
   ```astro
   ---
   interface Props {
     title: string;
     description: string;
   }
   const { title, description } = Astro.props;
   ---
   <section class="relative py-32 md:py-48 bg-bg-primary">
     <div class="container text-center">
       <h1 class="text-5xl md:text-7xl font-bold text-text-primary mb-6">{title}</h1>
       <p class="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">{description}</p>
     </div>
   </section>
   ```
5. Update `src/pages/discipline/[slug].astro` to use this new component instead of the main hero.

Validation:
- `discipline-hero.astro` exists and renders correctly.
- Discipline pages show the correct title and description.

DO NOT proceed to the next task until this is complete.
```

### TASK 2.4: Update Navigation with Discipline Links

**Prompt for OpenCode:**
```text
Add links to the discipline pages in the main navigation so users can discover them.

1. Open `src/components/shared/navigation.astro`.
2. Add a "Disciplines" dropdown or a "Work" menu that links to the discipline pages.
   - Since there are 7 disciplines, a dropdown is best.
   - Links: `/discipline/xr`, `/discipline/ux-design`, `/discipline/dev`, etc.
3. Ensure the dropdown works on both desktop and mobile.
4. Use shadcn `DropdownMenu` or a simple Astro/CSS dropdown. Keep it lightweight.

Validation:
- Navigation has a "Disciplines" or "Work" menu.
- Clicking a discipline link navigates to the correct page.
- Mobile menu includes the discipline links.

DO NOT proceed to the next task until this is complete.
```

---

## Phase 3: Final Validation & Polish

### TASK 3.1: Comprehensive Testing

**Prompt for OpenCode:**
```text
Run a final validation of both features.

1. **Theme Switcher:**
   - Switch to every theme. Verify colors, typography, and spacing change correctly.
   - Refresh the page. Verify the theme persists.
   - Check mobile view. Verify the switcher is accessible and doesn't break the layout.
2. **Multi-Page Routing:**
   - Visit `/discipline/xr`, `/discipline/ux-design`, etc.
   - Verify that only relevant portfolio items and services are shown.
   - Verify SEO meta tags (title, description) are correct for each page.
3. **Performance:**
   - Run `npm run build`.
   - Check that the initial JS bundle hasn't grown significantly (ThemeSwitcher should be small).
   - Verify no CLS (Cumulative Layout Shift) when switching themes.

Validation:
- All features work as expected.
- No console errors.
- Build succeeds.

Report any issues found and fix them. DO NOT proceed until all issues are resolved.
```

---

## Summary for the User

This plan will:
1.  **Refactor your CSS** to use class-based scoping (`html.theme-x`), allowing all themes to be loaded at once.
2.  **Build a React Theme Switcher** that instantly changes the site's look and remembers the user's choice.
3.  **Create 7 new pages** (`/discipline/xr`, `/discipline/ux-design`, etc.) that automatically filter your portfolio and services based on content tags.
4.  **Update your navigation** to include both the theme switcher and the discipline links.

**Next Step:** Copy and paste **TASK 1.1** into OpenCode to begin. Let me know if you want to adjust the discipline names or add more themes before starting.