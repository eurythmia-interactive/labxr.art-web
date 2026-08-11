Act as a Senior Frontend Engineer. Before moving on to Phase 3, I need you to complete the Phase 2 elements that were left pending or not installed according to the original Spec.

Execute these 3 cleanup tasks:

1. Install missing shadcn/ui components:
   - Run the commands to add: `dialog`, `tooltip`, `textarea`, and `separator`.
   - Ensure they strictly use the LabXR CSS variables (bg-background, text-foreground, border, etc.) defined in global.css.

2. Create BaseLayout.astro:
   - Create `src/layouts/BaseLayout.astro`.
   - It must accept the following props: `title`, `description`, `ogImage`.
   - Inject the dynamic SEO meta tags into the `<head>`.
   - Add the `<link rel="preload">` for the primary Inter font (woff2).
   - Import `@/styles/global.css`.
   - Wrap the `<slot />` with the `<SkipNav />` component and apply the `bg-background text-foreground antialiased` classes to the `<body>`.
   - Update `src/pages/index.astro` to use this new layout.

3. Create the `/dev/design-system` diagnostic route:
   - Create `src/pages/dev/design-system.astro` (ensure it has a `noindex` meta tag).
   - Render a visual sandbox guide showing: the typography scale, color swatches, all Button variants, and a test Dialog that opens on click.

Once this is done, update the Phase 2 `STATUS.md` file and make a commit with the message: "chore: complete deferred phase 2 ui primitives and base layout".
