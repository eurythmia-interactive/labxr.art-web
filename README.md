# LabXR Web

B2B portfolio site for LabXR.art — a creative technology lab in CDMX bridging Code and Cinema.

## Tech Stack

- **Framework:** Astro 4+ (TypeScript Strict)
- **UI Islands:** React 18
- **Styling:** Tailwind CSS (Mobile-First)
- **3D:** Three.js via @react-three/fiber (planned)
- **Animation:** GreenSock GSAP (planned)
- **Infrastructure:** Cloudflare Pages, R2, Workers

## Prerequisites

- Node.js 20+
- npm 10+
- Git

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Type Check

```bash
npm run check
```

## Project Structure

```
labxr-web/
├── src/
│   ├── assets/          # Images, videos, shaders
│   ├── components/      # Astro and React components
│   │   ├── islands/     # Interactive React components
│   │   ├── sections/    # Page sections (Astro)
│   │   ├── shared/      # Reusable components
│   │   └── ui/          # shadcn/ui components
│   ├── config/          # Configuration files
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Astro pages
│   └── styles/          # Global styles
├── public/              # Static assets
├── docs/                # Documentation
├── infra/               # Infrastructure plans
└── specs/               # Phase specifications
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

See `src/config/env.md` for documentation.

## Deployment

Deployed to Cloudflare Pages. See `docs/cloudflare-setup.md` for details.

## Phase Status

**Current Phase:** Phase 1 — Foundation (IN PROGRESS)

See `specs/phase-1/STATUS.md` for task tracking.
