# Phase 1 — Foundation, Environment, Repository, Astro Bootstrap, and Cloudflare Infrastructure

## Phase Name

Phase 1 — Foundation

## Phase Objective

Initialize the LabXR web project with a clean, type-safe, scalable foundation. Prepare the repository so future phases can be developed safely, incrementally, and with AI assistance.

## Non-Goals

- No final homepage, hero, portfolio, manifesto, or contact form.
- No GSAP scroll animations.
- No Three.js scenes or WebGL shaders.
- No full design system or brand color palette.
- No MediaPipe, TensorFlow.js, or webcam dependencies.
- No production DNS configuration.
- No secrets committed to Git.
- No heavy or unnecessary dependencies.

## Required Tools

- Node.js 20+
- npm (or bun if explicitly chosen)
- Git
- GitHub CLI (optional)
- Cloudflare Wrangler CLI
- FFmpeg (optional for Phase 1, required later)
- Curl
- Modern browser

## Required Human Inputs

| # | Input | Default | Status |
|---|-------|---------|--------|
| 1 | GitHub account access | — | PENDING |
| 2 | Repository name | `labxr-web` | PENDING |
| 3 | Cloudflare account access | — | PENDING |
| 4 | Cloudflare account ID | — | PENDING |
| 5 | Domain name | `labxr.art` | PENDING |
| 6 | R2 bucket name | `labxr-assets` | PENDING |
| 7 | Cloudflare Pages project name | `labxr-web` | PENDING |
| 8 | CDN subdomain | `cdn.labxr.art` | PENDING |
| 9 | Repository visibility (private/public) | private | PENDING |
| 10 | GitHub branch protection | — | PENDING |
| 11 | Package manager (npm/bun) | npm | PENDING |

## Definition of Done

- `npm install` completes without errors.
- `npm run dev` starts the local server.
- `/dev/health` loads with React hydration and Tailwind styling.
- `npm run build` and `npm run preview` work.
- `npm run check` passes (TypeScript strict).
- No secrets committed. README and GitHub templates exist.
- Cloudflare infrastructure documented.
- Phase 1 report generated and STATUS.md fully updated.

## Task List

| Task ID | Task Name |
|---------|-----------|
| 1.0 | Create Phase 1 spec tracking files |
| 1.1 | Verify local development environment |
| 1.2 | Initialize Git repository |
| 1.3 | Bootstrap Astro project |
| 1.4 | Configure TypeScript strictness and path aliases |
| 1.5 | Create project folder architecture |
| 1.6 | Configure linting and formatting |
| 1.7 | Create base documentation |
| 1.8 | Define environment variables |
| 1.9 | Create minimal health route |
| 1.10 | Prepare Cloudflare infrastructure plan |
| 1.11 | Configure Cloudflare Pages readiness |
| 1.12 | Create Phase 1 validation report |
| 1.13 | Update phase status and commit history |

## Validation Checklist

- [ ] Repository is clean and private.
- [ ] Node version is 20+.
- [ ] `npm run dev` works.
- [ ] `npm run build` works.
- [ ] `npm run preview` works.
- [ ] `/dev/health` loads.
- [ ] React island responds to click.
- [ ] Tailwind styles are visible.
- [ ] Mobile viewport looks correct.
- [ ] No console errors.
- [ ] `.env` is not committed.
- [ ] `.env.example` contains no secrets.
- [ ] Cloudflare documentation is complete.
- [ ] Phase 1 report is complete.
- [ ] STATUS.md is updated.
- [ ] No unnecessary dependencies installed.
- [ ] No Three.js installed yet.
- [ ] No GSAP installed yet.
- [ ] No shadcn components installed yet.
- [ ] No final UI implemented.
- [ ] Ready for Phase 2: Design System and Global State.
