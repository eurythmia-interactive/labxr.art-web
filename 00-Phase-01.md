Below is a **super detailed, spec-driven Phase 1 instruction pack** intended specifically for **OPENCODE AI**.  
You can paste this into OpenCode task-by-task, or save it as a Phase 1 specification document inside the repository.

---

# OPENCODE AI — LABXR.ART PHASE 1 SPEC

## Phase Name

**Phase 1 — Foundation, Environment, Repository, Astro Bootstrap, and Cloudflare Infrastructure**

---

# 1. OPENCODE AI ROLE

You are acting as a **Senior Frontend Platform Engineer**.

Your responsibility is to initialize the LabXR web project with a clean, type-safe, scalable foundation.

You are not building visual sections yet.  
You are not building Three.js scenes yet.  
You are not building the design system yet.  
You are not building the final UI yet.

Your job in Phase 1 is to create:

1. A verified local development environment.
2. A clean Git repository.
3. A strict Astro + TypeScript project.
4. A future-proof folder architecture.
5. Environment variable conventions.
6. Cloudflare infrastructure documentation and setup instructions.
7. A minimal health-check route proving Astro, React, Tailwind, and TypeScript work together.
8. A deployment-ready Cloudflare Pages foundation.
9. A complete Phase 1 validation report.

---

# 2. PRIMARY OBJECTIVE

Prepare the LabXR repository so future phases can be developed safely, incrementally, and with AI assistance.

At the end of Phase 1, the project must be able to:

- Run locally with `npm run dev`.
- Build successfully with `npm run build`.
- Preview the production build with `npm run preview`.
- Pass TypeScript checking.
- Pass linting and formatting checks.
- Load a minimal health page.
- Prove that Astro, React, and Tailwind are connected.
- Have environment variables safely separated.
- Have Cloudflare Pages and R2 setup documented.
- Have no secrets committed to Git.
- Have a clean commit history using conventional commits.

---

# 3. NON-GOALS FOR PHASE 1

OPENCODE AI must not do any of the following during Phase 1:

- Do not build the final homepage.
- Do not build the hero section.
- Do not build the portfolio section.
- Do not build the manifesto section.
- Do not build the contact form.
- Do not implement GSAP scroll animations.
- Do not implement Three.js scenes.
- Do not implement WebGL shaders.
- Do not install unnecessary animation libraries yet.
- Do not install MediaPipe, TensorFlow.js, or webcam dependencies.
- Do not implement the full design system.
- Do not create the final brand color palette.
- Do not create complex marketing pages.
- Do not commit secrets, API keys, tokens, or private credentials.
- Do not configure production DNS unless the human explicitly provides access.
- Do not delete existing documentation unless instructed.
- Do not create large placeholder files, images, or videos.
- Do not add heavy dependencies that are not required for Phase 1.

---

# 4. REQUIRED HUMAN INPUTS

Before OPENCODE AI can fully complete Phase 1, the human developer may need to provide or confirm:

1. GitHub account access.
2. Desired repository name, default: `labxr-web`.
3. Cloudflare account access.
4. Cloudflare account ID.
5. Domain name: `labxr.art`.
6. Desired R2 bucket name, default: `labxr-assets`.
7. Desired Cloudflare Pages project name, default: `labxr-web`.
8. Desired CDN subdomain, default: `cdn.labxr.art`.
9. Whether the repository should be private.
10. Whether GitHub branch protection should be enforced.
11. Whether OPENCODE should use npm or bun as the package manager.

If any of these are missing, OPENCODE AI must not invent values.  
It must create a checklist and mark the task as partially blocked.

---

# 5. GLOBAL OPENCODE RULES FOR PHASE 1

OPENCODE AI must obey the following rules at all times.

## 5.1 Specification Discipline

- Follow a spec-driven workflow.
- Before implementing a task, understand the task objective.
- Do not skip tasks.
- Do not combine multiple large tasks unless explicitly instructed.
- After completing each task, update the Phase 1 status file.
- If a task is blocked, record exactly what is missing.
- Prefer explicit, boring, maintainable solutions over clever solutions.
- Do not introduce new architecture without documenting it.

## 5.2 Code Quality Rules

- Use TypeScript strict mode.
- Do not use `any` unless absolutely unavoidable.
- Do not disable TypeScript errors unless explicitly justified.
- Do not disable lint rules unless explicitly justified.
- Keep files small and single-purpose.
- Use consistent naming conventions.
- Use kebab-case for filenames where appropriate.
- Use PascalCase for React components.
- Use camelCase for TypeScript utilities.
- Do not create unused files.
- Do not create placeholder components that are not wired into validation.

## 5.3 Astro Rules

- Astro is the primary framework.
- Use `.astro` files for static structure.
- Use React only where interactivity is required.
- For Phase 1, React is only needed for a minimal health-check island.
- Do not use client-side JavaScript unless necessary.
- Do not add heavy client bundles.
- Use Astro environment variables correctly.
- Only expose variables prefixed with `PUBLIC_` to the browser.

## 5.4 Mobile-First Rule

Even though Phase 1 is infrastructure, OPENCODE must respect the project’s future mobile-first approach:

- Any temporary page must be responsive.
- Any temporary layout must use mobile-first Tailwind classes.
- Do not create desktop-only validation pages.
- Ensure the health page works on small screens.
- Ensure no horizontal scroll appears on mobile.

## 5.5 Security Rules

- Never commit `.env`.
- Never commit API tokens.
- Never commit Cloudflare secrets.
- Never commit R2 access keys.
- Never commit Turnstile secret keys.
- Never commit SSH keys.
- Create `.env.example` with safe placeholders only.
- Add `.env`, `.dev.vars`, and local secrets to `.gitignore`.

## 5.6 Git Rules

- Use `main` as the protected production branch.
- Create a working branch for Phase 1.
- Suggested branch name:

```text
chore/phase-1-foundation
```

- Use conventional commits.
- Use small, meaningful commits.
- Do not commit generated build output.
- Do not commit `node_modules`.
- Do not commit `dist`.
- Do not commit `.astro`.

Examples of acceptable commit messages:

```text
chore: bootstrap astro workspace
chore: add typescript strict configuration
chore: add project folder architecture
chore: add cloudflare setup documentation
chore: add phase 1 health route
chore: add phase 1 validation report
```

---

# 6. PHASE 1 FOLDER STRUCTURE TARGET

OPENCODE AI must prepare the repository to match the following structure by the end of Phase 1.

```text
labxr-web/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── phase_task.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── labels.md
├── docs/
│   ├── architecture.md
│   ├── cloudflare-setup.md
│   ├── decision-log.md
│   ├── environment-check.md
│   ├── phase-1-report.md
│   └── project-overview.md
├── infra/
│   └── cloudflare/
│       ├── cors-policy.md
│       ├── dns-plan.md
│       ├── pages-plan.md
│       ├── r2-plan.md
│       └── workers-plan.md
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── specs/
│   └── phase-1/
│       ├── 00-phase-overview.md
│       ├── 01-environment-setup.md
│       ├── 02-repository-setup.md
│       ├── 03-astro-bootstrap.md
│       ├── 04-typescript-config.md
│       ├── 05-folder-architecture.md
│       ├── 06-lint-format.md
│       ├── 07-environment-variables.md
│       ├── 08-health-route.md
│       ├── 09-cloudflare-infrastructure.md
│       ├── 10-deployment-readiness.md
│       └── STATUS.md
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── shaders/
│   │   └── videos/
│   ├── components/
│   │   ├── islands/
│   │   ├── sections/
│   │   ├── shared/
│   │   └── ui/
│   ├── config/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── .editorconfig
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── astro.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.mjs
└── tsconfig.json
```

---

# 7. PHASE 1 TASK BREAKDOWN

OPENCODE AI must execute the following tasks in order.

---

# TASK 1.0 — CREATE PHASE 1 SPEC TRACKING FILES

## Objective

Create a specification tracking system for Phase 1.

## Instructions

OPENCODE AI must create the following files:

```text
specs/phase-1/00-phase-overview.md
specs/phase-1/STATUS.md
```

## Contents Required

### `00-phase-overview.md`

Must include:

- Phase name.
- Phase objective.
- Non-goals.
- Required tools.
- Required human inputs.
- Definition of done.
- Task list.
- Validation checklist.

### `STATUS.md`

Must include a task table with columns:

- Task ID.
- Task name.
- Status.
- Blockers.
- Notes.
- Last updated.

Initial statuses should be:

```text
NOT_STARTED
```

## Constraints

- Do not implement code yet.
- Do not install dependencies yet.
- Do not modify repository configuration yet.

## Definition of Done

- `specs/phase-1/00-phase-overview.md` exists.
- `specs/phase-1/STATUS.md` exists.
- All Phase 1 tasks are listed.
- No task has been implemented yet.

---

# TASK 1.1 — VERIFY LOCAL DEVELOPMENT ENVIRONMENT

## Objective

Confirm that the local machine has all required tools for LabXR development.

## Required Tools

OPENCODE AI must verify:

1. Node.js version 20 or higher.
2. npm or bun.
3. Git.
4. GitHub CLI, optional.
5. Cloudflare Wrangler CLI.
6. FFmpeg, optional for Phase 1 but required later.
7. Curl or equivalent, for endpoint testing.
8. A modern browser for manual verification.

## Instructions

OPENCODE AI must run or request to run the following checks:

```bash
node --version
npm --version
git --version
wrangler --version
ffmpeg -version
```

If a tool is missing, OPENCODE must provide Pop!_OS installation instructions.

## Output File

Create:

```text
docs/environment-check.md
```

## Required Output Contents

The file must include:

- Date of check.
- Detected operating system.
- Node version.
- Package manager version.
- Git version.
- Wrangler version.
- FFmpeg version.
- Missing tools.
- Installation instructions for missing tools.
- Recommendation to proceed or stop.

## Constraints

- Do not install global packages without user confirmation.
- Do not use sudo unless explicitly approved.
- Do not continue to repository creation if Node.js is below version 20.

## Definition of Done

- Environment check document exists.
- Required tools are verified.
- Any missing tool is clearly documented.
- OPENCODE states whether Phase 1 can proceed.

---

# TASK 1.2 — INITIALIZE GIT REPOSITORY

## Objective

Create the project repository with safe defaults.

## Instructions

OPENCODE AI must prepare a new Git repository named:

```text
labxr-web
```

The repository should be private unless the human explicitly requests public.

## Repository Requirements

The repository must include:

- `.gitignore`
- `README.md`
- `.editorconfig`
- `.nvmrc`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/phase_task.md`
- `.github/labels.md`

## `.gitignore` Requirements

Must ignore at least:

```text
node_modules
dist
.astro
.env
.env.local
.env.production
.dev.vars
.DS_Store
*.log
coverage
.vercel
.netlify
wrangler.toml.secrets
```

## `.nvmrc` Requirement

Must specify the active Node major version.

Example value:

```text
20
```

## `.editorconfig` Requirements

Must enforce:

- UTF-8.
- LF line endings.
- 2-space indentation.
- Final newline.
- Trim trailing whitespace.

## GitHub Templates Requirements

### Bug Report Template

Must ask for:

- Summary.
- Expected behavior.
- Actual behavior.
- Browser/device.
- Console errors.
- Screenshot or recording.
- Steps to reproduce.

### Feature Request Template

Must ask for:

- Business goal.
- User story.
- Acceptance criteria.
- Performance constraints.
- Mobile considerations.
- Accessibility considerations.

### Phase Task Template

Must ask for:

- Phase number.
- Task ID.
- Objective.
- Dependencies.
- Files affected.
- Acceptance criteria.
- Definition of done.

## Pull Request Template Requirements

Must ask for:

- What changed.
- Why it changed.
- How it was tested.
- Screenshots if visual.
- Mobile validation.
- Accessibility validation.
- Performance validation.
- Remaining risks.

## Labels Requirement

Create documentation for labels:

- `bug`
- `enhancement`
- `documentation`
- `infrastructure`
- `performance`
- `accessibility`
- `design-system`
- `webgl`
- `video`
- `cloudflare`
- `phase-1`
- `phase-2`
- `phase-3`
- `phase-4`
- `phase-5`
- `phase-6`
- `phase-7`
- `phase-8`
- `phase-9`
- `blocked`
- `needs-review`

## Constraints

- Do not add application code yet.
- Do not initialize Astro yet.
- Do not add secrets.
- Do not configure branch protection automatically unless GitHub CLI access is confirmed.

## Definition of Done

- Repository exists locally.
- Initial commit exists.
- `.gitignore` is correct.
- README exists.
- GitHub templates exist.
- `.nvmrc` exists.
- `.editorconfig` exists.
- No dependencies have been installed yet.

---

# TASK 1.3 — BOOTSTRAP ASTRO PROJECT

## Objective

Initialize the Astro application with React, TypeScript strict mode, and Tailwind base support.

## Package Manager

Use npm unless the human explicitly requests bun.

## Instructions

OPENCODE AI must initialize an Astro project with the following characteristics:

- Minimal template.
- TypeScript strict mode.
- React integration.
- Tailwind CSS integration.
- No sample blog content.
- No unnecessary demo components.
- No default Astro welcome content left in final Phase 1 state.

## Required Dependencies

OPENCODE may install only the dependencies required for Phase 1.

Allowed dependencies:

```text
astro
@astrojs/react
@astrojs/tailwind
tailwindcss
react
react-dom
typescript
@astrojs/check
```

Allowed development dependencies:

```text
@types/react
@types/react-dom
prettier
prettier-plugin-astro
```

## Dependencies Not Allowed Yet

Do not install the following during Phase 1:

```text
three
@react-three/fiber
@react-three/drei
gsap
@gsap/react
framer-motion
shadcn/ui dependencies unless required by a later explicit task
zustand
jotai
@nanostores/react
@nanostores/persist
cloudflare worker-specific packages unless required for deployment
```

If OPENCODE believes a dependency is necessary, it must stop and ask for approval.

## Astro Configuration Requirements

OPENCODE must configure `astro.config.mjs` to include:

- Site URL placeholder: `https://labxr.art`
- React integration.
- Tailwind integration.
- Image service enabled.
- Output mode static.
- Trailing slash behavior consistent.
- Build output directory default `dist`.
- No unnecessary integrations.

## Required Package Scripts

Ensure `package.json` includes:

```text
dev
build
preview
astro
check
format
```

Expected script meanings:

- `dev`: start local development server.
- `build`: production build.
- `preview`: preview production build.
- `astro`: run Astro CLI.
- `check`: run Astro TypeScript checks.
- `format`: format project with Prettier.

## Constraints

- Do not create marketing pages.
- Do not create final layouts.
- Do not create global design tokens.
- Do not create navigation.
- Do not create footer.
- Do not create components beyond temporary health validation needs.

## Definition of Done

- Astro project initializes without errors.
- `npm run dev` works.
- `npm run build` works.
- React integration is installed.
- Tailwind integration is installed.
- TypeScript strict mode is enabled.
- No unnecessary dependencies are installed.

---

# TASK 1.4 — CONFIGURE TYPESCRIPT STRICTNESS AND PATH ALIASES

## Objective

Ensure the repository uses strict TypeScript with predictable import paths.

## Files Affected

```text
tsconfig.json
astro.config.mjs
```

## TypeScript Requirements

OPENCODE must ensure the TypeScript configuration:

- Extends Astro strict configuration.
- Enables strict null checks.
- Disables implicit any.
- Requires explicit typing where useful.
- Includes `src` folder.
- Excludes `node_modules`, `dist`, and `.astro`.

## Path Alias Requirements

Create aliases for future scalability:

```text
@/* -> src/*
@components/* -> src/components/*
@layouts/* -> src/layouts/*
@lib/* -> src/lib/*
@config/* -> src/config/*
@styles/* -> src/styles/*
@assets/* -> src/assets/*
```

## Constraints

- Do not create all future files yet.
- Do not create unused alias utilities.
- Do not introduce a bundler alias system that conflicts with Astro.
- Ensure aliases work with Astro check.

## Validation

OPENCODE must validate that imports using aliases are recognized.

If no alias import exists yet, OPENCODE may create a tiny internal utility file for validation only if needed.

## Definition of Done

- `tsconfig.json` is strict.
- Path aliases are defined.
- TypeScript checking passes.
- No alias conflicts exist.

---

# TASK 1.5 — CREATE PROJECT FOLDER ARCHITECTURE

## Objective

Create the full folder architecture for future LabXR development.

## Required Folders

OPENCODE must create:

```text
src/assets/images
src/assets/shaders
src/assets/videos
src/components/islands
src/components/sections
src/components/shared
src/components/ui
src/config
src/layouts
src/lib
src/pages
src/styles
public
public/images
public/fonts
docs
infra/cloudflare
specs/phase-1
```

## Placeholder Strategy

For empty folders, create either:

- `.gitkeep`, or
- a short `README.md` explaining what belongs there.

Prefer `README.md` for important folders.

## Folder Documentation Requirements

At minimum, create folder README files for:

```text
src/components/islands/README.md
src/components/sections/README.md
src/components/shared/README.md
src/components/ui/README.md
src/assets/shaders/README.md
src/lib/README.md
src/config/README.md
```

## Folder Usage Rules

### `src/components/islands`

For React-powered interactive components only.

Examples:

- Video player controls.
- Portfolio modal.
- Contact form.
- WebGL canvas.
- Interactive blueprint.

### `src/components/sections`

For Astro page sections.

Examples:

- Hero.
- Manifesto.
- Services.
- Portfolio.
- Team.
- Contact.

### `src/components/shared`

For reusable presentational components.

Examples:

- Container.
- Section wrapper.
- Heading.
- Paragraph.
- Link.

### `src/components/ui`

For future shadcn/ui components.

Do not manually create fake shadcn components yet.

### `src/assets/shaders`

For future GLSL vertex and fragment shader files.

### `src/lib`

For utilities, helpers, constants, and non-UI logic.

### `src/config`

For typed environment configuration and site configuration.

## Constraints

- Do not create feature components yet.
- Do not create section markup yet.
- Do not create design system components yet.
- Do not create large placeholder assets.
- Do not commit video files.
- Do not commit raw images.

## Definition of Done

- All required folders exist.
- Important folders have README files.
- Git tracks empty folders correctly.
- No feature code has been created.

---

# TASK 1.6 — CONFIGURE LINTING AND FORMATTING

## Objective

Establish code quality tooling.

## Required Tools

- Prettier.
- Prettier Astro plugin.
- ESLint only if it can be configured cleanly with Astro.

## Prettier Requirements

Create:

```text
.prettierrc
.prettierignore
```

Prettier must be configured to:

- Use 2 spaces.
- Use single quotes.
- Avoid semicolon inconsistency.
- Format Astro files.
- Ignore build output.
- Ignore `node_modules`.
- Ignore `.env`.
- Ignore `.env.example` if formatting is undesirable.

## ESLint Requirements

If OPENCODE adds ESLint, it must use Astro-compatible recommended rules.

Do not add overly aggressive rules that block Phase 1 completion.

If ESLint setup is unstable, OPENCODE may defer ESLint and document the decision in `docs/decision-log.md`.

## Package Scripts

Add or update:

```text
format
lint
```

If ESLint is deferred, `lint` may be a placeholder script that prints a message, but this must be documented.

## Definition of Done

- Prettier configuration exists.
- Formatting works.
- Linting works or is intentionally deferred.
- Decision is documented.
- No formatting errors remain.

---

# TASK 1.7 — CREATE BASE DOCUMENTATION

## Objective

Create the primary documentation needed to understand the project.

## Required Files

OPENCODE must create or update:

```text
README.md
docs/project-overview.md
docs/architecture.md
docs/decision-log.md
docs/cloudflare-setup.md
```

## README Requirements

The README must include:

- Project name: LabXR Web.
- Project purpose.
- Tech stack.
- Local prerequisites.
- Setup instructions.
- Development command.
- Build command.
- Preview command.
- Typecheck command.
- Folder structure overview.
- Environment variable overview.
- Deployment overview.
- Phase status summary.

## Project Overview Requirements

`docs/project-overview.md` must explain:

- LabXR positioning.
- Target audience: agencies in CDMX and LatAm.
- White-label technical partner model.
- The website as a technical demonstration.
- Core principles:
  - Mobile-first.
  - Performance-first.
  - Cinematic design.
  - Progressive enhancement.
  - Accessibility.
  - Low infrastructure cost.

## Architecture Requirements

`docs/architecture.md` must explain:

- Astro as the base framework.
- React islands for interactivity.
- Tailwind for styling.
- shadcn/ui for future UI primitives.
- Three.js for future WebGL.
- GSAP for future scroll animation.
- Cloudflare Pages for hosting.
- Cloudflare R2 for media storage.
- Cloudflare Workers for forms and future APIs.
- Environment variable strategy.
- Deployment strategy.

## Decision Log Requirements

`docs/decision-log.md` must contain initial decisions:

- Use Astro.
- Use React islands.
- Use Tailwind.
- Use Cloudflare Pages.
- Use Cloudflare R2.
- Use mobile-first responsive strategy.
- Use progressive enhancement for WebGL.
- Do not install Three.js until required.
- Do not install shadcn/ui until design system phase.
- Do not commit secrets.

Each decision must include:

- Date.
- Status.
- Context.
- Decision.
- Consequences.

## Cloudflare Setup Requirements

`docs/cloudflare-setup.md` must document:

- Required Cloudflare account.
- Domain setup.
- Pages project.
- R2 bucket.
- Custom CDN subdomain.
- Environment variables.
- CORS plan.
- Deployment plan.
- Manual dashboard steps.
- Optional Wrangler CLI steps.

## Definition of Done

- README is complete.
- Documentation is clear.
- Decision log exists.
- Architecture is documented.
- Cloudflare setup is documented.

---

# TASK 1.8 — DEFINE ENVIRONMENT VARIABLES

## Objective

Create a safe environment variable architecture.

## Files Affected

```text
.env.example
src/config/env.md
```

Optionally, if needed for validation:

```text
src/config/site.ts
```

Do not create complex runtime code unless required.

## Required Environment Variables

`.env.example` must include placeholders for:

```text
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ENVIRONMENT=development
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME=labxr-web
PUBLIC_TURNSTILE_SITE_KEY=
```

Optional non-public local variables:

```text
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

## Rules

- Public variables must begin with `PUBLIC_`.
- Secret variables must never begin with `PUBLIC_`.
- `.env` must be ignored by Git.
- `.env.example` must contain no real secrets.
- Document which variables are safe for browser exposure.
- Document which variables are only for local tooling.
- Document which variables belong in Cloudflare Pages production settings.

## Environment Documentation

Create or update:

```text
src/config/env.md
```

This file must explain:

- How Astro exposes environment variables.
- Which variables are public.
- Which variables are private.
- Where production secrets should be stored.
- Where local secrets should be stored.
- How to avoid accidentally committing secrets.

## Definition of Done

- `.env.example` exists.
- `.env` is ignored.
- Public and private variables are clearly separated.
- Documentation explains safe usage.
- No real secrets are present.

---

# TASK 1.9 — CREATE MINIMAL HEALTH ROUTE

## Objective

Create a diagnostic route that proves the stack is working.

## Route

Create a page available at:

```text
/dev/health
```

Optionally, redirect the root path to this page temporarily.

## Requirements

The health route must show:

1. Project name: LabXR Web.
2. Phase status: Phase 1 Foundation.
3. Environment name.
4. Public site URL.
5. Public CDN URL placeholder.
6. A message confirming Astro is rendering.
7. A message confirming Tailwind is applied.
8. A React island confirming client hydration.
9. A note that this page is temporary and not part of the final UI.

## React Island Requirements

Create a minimal React component for health validation only.

Suggested file:

```text
src/components/islands/health-check-island.tsx
```

The island must demonstrate:

- React renders correctly.
- React hydrates correctly.
- A click interaction works.

Do not create complex state.

A simple counter or status toggle is sufficient.

## Tailwind Requirements

The health page must be:

- Responsive.
- Mobile-first.
- Readable on small screens.
- Dark-themed.
- Visually temporary.
- Clearly labeled as a development diagnostic page.

## SEO Requirements

The health page must not be indexed.

Add:

```text
noindex
```

through meta robots or a temporary robots directive.

## Constraints

- Do not create the final design system.
- Do not create navigation.
- Do not create footer.
- Do not create brand marketing components.
- Do not install UI libraries for this page.
- Do not use shadcn/ui yet.
- Do not use GSAP yet.
- Do not use Three.js yet.

## Definition of Done

- `/dev/health` loads locally.
- The page is responsive.
- Tailwind styles apply.
- Astro renders server-side content.
- React island hydrates.
- Click interaction works.
- No console errors appear.
- The page is marked as temporary.

---

# TASK 1.10 — PREPARE CLOUDFLARE INFRASTRUCTURE PLAN

## Objective

Document and prepare the Cloudflare resources needed by LabXR.

## Required Files

OPENCODE must create:

```text
infra/cloudflare/pages-plan.md
infra/cloudflare/r2-plan.md
infra/cloudflare/dns-plan.md
infra/cloudflare/cors-policy.md
infra/cloudflare/workers-plan.md
```

## Pages Plan Requirements

`pages-plan.md` must document:

- Project name: `labxr-web`.
- Repository connection.
- Production branch: `main`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node compatibility version: 20.
- Preview deployments for non-main branches.
- Required environment variables.
- Custom domain plan.
- Cache considerations.
- Headers plan.
- Redirect plan.
- Security headers plan.

## R2 Plan Requirements

`r2-plan.md` must document:

- Bucket name: `labxr-assets`.
- Bucket purpose.
- Public read strategy.
- Future private bucket strategy for white-label assets.
- Folder structure inside R2:

```text
videos/
videos/posters/
images/
images/og/
images/team/
images/case-studies/
```

- File naming conventions.
- Cache control strategy.
- CDN delivery strategy.
- Backup strategy.
- Local upload workflow.
- Wrangler commands for bucket creation.
- Wrangler commands for listing buckets.
- Wrangler commands for test upload.
- Manual dashboard fallback instructions.

## DNS Plan Requirements

`dns-plan.md` must document:

- Root domain: `labxr.art`.
- www handling.
- Cloudflare Pages production domain.
- CDN subdomain: `cdn.labxr.art`.
- Future API subdomain: `api.labxr.art`, if needed.
- Future preview subdomain strategy.
- DNS propagation warning.
- SSL/TLS mode recommendation.

## CORS Policy Requirements

`cors-policy.md` must document:

- Allowed origins:
  - `http://localhost:4321`
  - `https://labxr.art`
  - `https://www.labxr.art`
  - Cloudflare Pages preview URLs.
- Allowed methods:
  - GET
  - HEAD
- Allowed headers.
- Max age.
- Whether credentials are allowed.
- Security warning about not using wildcard origins in production.

## Workers Plan Requirements

`workers-plan.md` must document future usage:

- Contact form handler.
- Turnstile validation.
- Discord/email webhook delivery.
- Rate limiting.
- Logging.
- Secrets handling.
- Environment variables.
- Local testing with Wrangler.

Do not implement Workers yet.

## Human Confirmation Required

OPENCODE must ask the human to confirm:

- Cloudflare account access.
- Whether Wrangler is authenticated.
- Whether the domain is already in Cloudflare.
- Whether R2 is enabled.
- Whether custom domain setup should happen now or later.

## Definition of Done

- All Cloudflare planning documents exist.
- No real secrets are stored.
- Human-required steps are clearly marked.
- Optional CLI commands are documented.
- Manual dashboard steps are documented.

---

# TASK 1.11 — CONFIGURE CLOUDFLARE PAGES READINESS

## Objective

Prepare the repository for Cloudflare Pages deployment.

## Files Affected

```text
public/_headers
public/_redirects
```

Create these only if safe and minimal.

## `_headers` Requirements

Create a minimal security headers plan.

Headers should include recommendations for:

- Content-Security-Policy.
- X-Content-Type-Options.
- Referrer-Policy.
- Permissions-Policy.
- Strict-Transport-Security.

Do not create an overly strict CSP that breaks future video or CDN usage.

If unsure, create a conservative starter plan and document that it must be revisited when real assets are introduced.

## `_redirects` Requirements

Create a minimal redirect plan.

At minimum, document or prepare:

```text
www to non-www
```

Do not configure complex redirects yet.

## Deployment Checklist

OPENCODE must create or update:

```text
docs/deployment-checklist.md
```

This checklist must include:

1. Repository is connected to Cloudflare Pages.
2. Build command is set.
3. Output directory is set.
4. Node version is set.
5. Environment variables are added.
6. Preview deployments work.
7. Production deployment works.
8. Custom domain is attached.
9. SSL is active.
10. Health page loads in production.
11. Console has no errors.
12. No secrets are exposed.

## Constraints

- Do not deploy to production unless explicitly authorized.
- Do not attach custom domains unless human confirms DNS control.
- Do not expose secrets.
- Do not create complex CSP rules that block future Cloudflare CDN assets.

## Definition of Done

- Deployment checklist exists.
- Header plan exists.
- Redirect plan exists.
- Cloudflare Pages configuration is documented.
- Repository is ready to be connected to Cloudflare Pages.

---

# TASK 1.12 — CREATE PHASE 1 VALIDATION REPORT

## Objective

Produce a final report proving Phase 1 is complete.

## Output File

Create:

```text
docs/phase-1-report.md
```

## Required Contents

The report must include:

### 1. Summary

- What was completed.
- What was not completed.
- What was deferred.
- What is blocked.

### 2. Environment Report

- Node version.
- npm/bun version.
- Git version.
- Wrangler version.
- FFmpeg status.

### 3. Repository Report

- Repository name.
- Branch used.
- Commit count.
- Templates created.
- Git hygiene status.

### 4. Astro Report

- Astro version.
- React integration status.
- Tailwind integration status.
- TypeScript strict status.
- Path alias status.

### 5. Folder Architecture Report

- Required folders created.
- README files created.
- Any deviations.

### 6. Health Route Report

- Local URL.
- React hydration status.
- Tailwind status.
- Mobile responsiveness status.
- Console errors.
- SEO noindex status.

### 7. Cloudflare Report

- Pages project status.
- R2 bucket status.
- DNS status.
- CORS plan status.
- Secrets safety status.

### 8. Validation Commands

List all commands run and their results:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
npm run format
npm run lint
```

### 9. Manual Testing Checklist

Include checks for:

- Desktop browser.
- Mobile browser.
- Small screen size.
- Dark theme readability.
- React click interaction.
- No console errors.
- No horizontal scroll.
- Health page loads in preview build.

### 10. Risks and Follow-Ups

Document:

- Missing human inputs.
- Deferred linting.
- Cloudflare access issues.
- Future CSP concerns.
- Future video delivery concerns.
- Future Three.js performance concerns.

## Definition of Done

- Phase 1 report exists.
- All completed tasks are listed.
- All blocked tasks are explained.
- Validation results are recorded.
- Next phase readiness is stated.

---

# TASK 1.13 — UPDATE PHASE STATUS AND COMMIT HISTORY

## Objective

Close Phase 1 cleanly.

## Instructions

OPENCODE AI must:

1. Update `specs/phase-1/STATUS.md`.
2. Mark completed tasks as `DONE`.
3. Mark blocked tasks as `BLOCKED`.
4. Add notes for any incomplete item.
5. Ensure there are no unstaged unexpected files.
6. Ensure no secrets are staged.
7. Create final conventional commits.
8. Prepare a pull request if the workflow requires it.

## Required Final Commit Message

```text
chore: complete phase 1 foundation and infrastructure
```

If Phase 1 is not fully complete, use:

```text
chore: complete phase 1 partial foundation
```

## Pull Request Requirements

If creating a PR, include:

- Phase 1 summary.
- What was implemented.
- What was blocked.
- Validation output.
- Manual testing checklist.
- Cloudflare status.
- Next phase readiness.

## Definition of Done

- Status file is updated.
- Working tree is clean.
- No secrets are present.
- Final commit is created.
- PR description is ready if applicable.

---

# 8. OPENCODE EXECUTION PROMPTS

Use the following prompts one by one with OPENCODE AI.

---

## Prompt 1 — Initialize Phase 1 Spec Tracking

```text
Read AGENTS.md and the Phase 1 instruction set.

Create the Phase 1 specification tracking files:

specs/phase-1/00-phase-overview.md
specs/phase-1/STATUS.md

Do not install dependencies.
Do not create application code.
Do not modify Cloudflare resources.

List all Phase 1 tasks in STATUS.md with status NOT_STARTED.
```

---

## Prompt 2 — Verify Environment

```text
Execute Phase 1 Task 1.1.

Verify the local development environment for:
- Node.js 20+
- npm or bun
- Git
- Wrangler
- FFmpeg
- curl

Create docs/environment-check.md with the results.

Do not install global tools without asking first.
If a required tool is missing, stop and provide installation instructions for Pop!_OS.
```

---

## Prompt 3 — Initialize Repository

```text
Execute Phase 1 Task 1.2.

Prepare the labxr-web Git repository with:
- .gitignore
- README.md
- .editorconfig
- .nvmrc
- GitHub issue templates
- GitHub pull request template
- labels documentation

Do not initialize Astro yet.
Do not add application code.
Do not add secrets.
```

---

## Prompt 4 — Bootstrap Astro

```text
Execute Phase 1 Task 1.3.

Initialize the Astro project using:
- TypeScript strict mode
- React integration
- Tailwind integration
- minimal template
- npm as package manager

Install only dependencies required for Phase 1.

Do not install:
- three
- @react-three/fiber
- @react-three/drei
- gsap
- shadcn/ui dependencies
- state management libraries
- animation libraries

Ensure npm run dev, npm run build, and npm run check work.
```

---

## Prompt 5 — Configure TypeScript

```text
Execute Phase 1 Task 1.4.

Configure strict TypeScript and path aliases.

Create aliases for:
@/*
@components/*
@layouts/*
@lib/*
@config/*
@styles/*
@assets/*

Ensure the configuration is compatible with Astro.
Run type checking and fix any configuration errors.
```

---

## Prompt 6 — Create Folder Architecture

```text
Execute Phase 1 Task 1.5.

Create the full LabXR folder architecture under:
- src/assets
- src/components
- src/config
- src/layouts
- src/lib
- src/pages
- src/styles
- public
- docs
- infra/cloudflare
- specs/phase-1

Add README files for important folders explaining what belongs there.
Do not create feature components.
Do not create marketing sections.
Do not create final UI.
```

---

## Prompt 7 — Configure Formatting

```text
Execute Phase 1 Task 1.6.

Configure Prettier and optional ESLint for Astro.

Create:
- .prettierrc
- .prettierignore

Add package scripts for:
- format
- lint

If ESLint is unstable, defer it and document the decision in docs/decision-log.md.
```

---

## Prompt 8 — Create Documentation

```text
Execute Phase 1 Task 1.7.

Create or update:
- README.md
- docs/project-overview.md
- docs/architecture.md
- docs/decision-log.md
- docs/cloudflare-setup.md

Document the LabXR stack, architecture, mobile-first strategy, progressive enhancement strategy, and Cloudflare plan.

Do not write implementation code.
```

---

## Prompt 9 — Configure Environment Variables

```text
Execute Phase 1 Task 1.8.

Create .env.example with safe placeholder values.

Separate public variables from private variables.

Public variables must begin with PUBLIC_.
Secret variables must not begin with PUBLIC_.

Create documentation explaining environment variable usage at src/config/env.md.

Do not commit real secrets.
Do not create .env with real values.
```

---

## Prompt 10 — Create Health Route

```text
Execute Phase 1 Task 1.9.

Create a temporary diagnostic route at /dev/health.

The page must verify:
- Astro rendering
- Tailwind styling
- React hydration
- environment variable exposure
- mobile-first responsive layout

Create one minimal React island for hydration testing.

Do not create the final design system.
Do not create navigation.
Do not create footer.
Do not use GSAP.
Do not use Three.js.
Do not use shadcn/ui.

Make the page responsive, dark-themed, and marked noindex.
```

---

## Prompt 11 — Prepare Cloudflare Plan

```text
Execute Phase 1 Task 1.10.

Create Cloudflare infrastructure planning documents under infra/cloudflare:

- pages-plan.md
- r2-plan.md
- dns-plan.md
- cors-policy.md
- workers-plan.md

Document:
- Cloudflare Pages setup
- R2 bucket setup
- CDN subdomain plan
- CORS rules
- future form worker plan
- secret handling rules

Do not create real Cloudflare resources unless I explicitly confirm access.
Do not store secrets in the repository.
```

---

## Prompt 12 — Prepare Deployment Readiness

```text
Execute Phase 1 Task 1.11.

Prepare Cloudflare Pages deployment readiness.

Create or update:
- public/_headers
- public/_redirects
- docs/deployment-checklist.md

Keep headers conservative and future-friendly.
Do not create an overly strict CSP that breaks future CDN video delivery.
Do not deploy to production unless I explicitly approve.
```

---

## Prompt 13 — Generate Phase 1 Report

```text
Execute Phase 1 Task 1.12.

Generate docs/phase-1-report.md.

Include:
- completed tasks
- blocked tasks
- environment versions
- repository status
- Astro configuration status
- folder architecture status
- health route validation
- Cloudflare readiness
- validation command results
- manual testing checklist
- risks and follow-ups

Do not hide failures.
If something is blocked, state exactly what is missing.
```

---

## Prompt 14 — Close Phase 1

```text
Execute Phase 1 Task 1.13.

Update specs/phase-1/STATUS.md.
Ensure all completed tasks are marked DONE.
Ensure blocked tasks are marked BLOCKED with notes.

Check that:
- no secrets are staged
- no build output is staged
- no unnecessary files are staged
- all documentation is updated

Prepare a final conventional commit for Phase 1.
```

---

# 9. PHASE 1 DEFINITION OF DONE

Phase 1 is complete only when all of the following are true.

## Local Development

- `npm install` completes without errors.
- `npm run dev` starts the local server.
- The health route loads at `/dev/health`.
- React island interaction works.
- Tailwind styles visibly apply.
- The page is responsive on mobile widths.
- No console errors appear.

## Build

- `npm run build` completes without errors.
- `npm run preview` serves the production build.
- The health route works in preview mode.
- No missing asset errors appear.

## Type Safety

- TypeScript strict mode is enabled.
- `npm run check` passes.
- No unresolved path alias imports exist.

## Repository

- `.gitignore` is correct.
- No secrets are committed.
- README exists.
- GitHub templates exist.
- Phase 1 status file is updated.

## Documentation

- Architecture is documented.
- Decision log exists.
- Environment check exists.
- Cloudflare setup is documented.
- Deployment checklist exists.
- Phase 1 report exists.

## Cloudflare

- Cloudflare Pages configuration is documented.
- R2 bucket plan is documented.
- DNS plan is documented.
- CORS policy is documented.
- Worker strategy is documented.
- No secrets are stored in Git.

## AI Workflow

- All task specs are traceable.
- All completed tasks are marked in `STATUS.md`.
- All blocked tasks include blockers.
- Next phase readiness is explicitly stated.

---

# 10. PHASE 1 VALIDATION CHECKLIST FOR HUMAN REVIEW

Before moving to Phase 2, the human should manually verify:

```text
[ ] Repository is clean and private.
[ ] Node version is 20+.
[ ] npm run dev works.
[ ] npm run build works.
[ ] npm run preview works.
[ ] /dev/health loads.
[ ] React island responds to click.
[ ] Tailwind styles are visible.
[ ] Mobile viewport looks correct.
[ ] No console errors.
[ ] .env is not committed.
[ ] .env.example contains no secrets.
[ ] Cloudflare documentation is complete.
[ ] Phase 1 report is complete.
[ ] STATUS.md is updated.
[ ] No unnecessary dependencies installed.
[ ] No Three.js installed yet.
[ ] No GSAP installed yet.
[ ] No shadcn components installed yet.
[ ] No final UI implemented.
[ ] Ready for Phase 2: Design System and Global State.
```

---

# 11. NEXT PHASE PREVIEW

After Phase 1 is complete, Phase 2 should focus on:

- LabXR design system.
- Tailwind theme extension.
- CSS variables.
- Typography scale.
- Dark cinematic theme.
- shadcn/ui initialization.
- Base button, input, dialog, and form primitives.
- Global state strategy.
- Device detection strategy.
- Reduced motion strategy.
- Reusable section and container primitives.

Do not start Phase 2 until Phase 1 passes the validation checklist.