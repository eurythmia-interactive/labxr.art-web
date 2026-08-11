# LabXR.art — Project Overview

## What is LabXR?

LabXR.art is a creative technology lab based in Mexico City (CDMX) that bridges **Code and Cinema**. We offer white-label interactive installations and WebGL experiences to top-tier creative agencies across Latin America.

## Target Audience

- **Primary:** Creative agencies in CDMX and LatAm
- **Secondary:** Brand managers seeking technical partners for interactive campaigns
- **Tertiary:** Event producers needing immersive digital experiences

## Business Model

**White-label technical partner** — We build the technology, agencies own the client relationship.

LabXR provides:

- Interactive installations for events and activations
- WebGL experiences for product launches
- AR/VR prototypes for pitch presentations
- Real-time visual systems for live events

## The Website as Technical Demonstration

This website is not just a portfolio — it's a **live technical demonstration** of our capabilities.

Every feature showcases:

- High-performance media delivery
- Mobile-first responsive design
- WebGL and shader expertise
- Real-time interaction patterns
- Cinematic visual quality

## Core Principles

### 1. Mobile-First

Every design decision starts with mobile constraints:

- Touch interactions before mouse
- Performance budgets for 3G networks
- Battery-conscious animations
- Thumb-friendly navigation

### 2. Performance-First

Speed is a feature:

- Zero unnecessary JavaScript
- Lazy-loaded media with IntersectionObserver
- Optimized video delivery via Cloudflare R2
- Sub-3s Largest Contentful Paint target

### 3. Cinematic Design

Visual quality matters:

- Dark theme default (reduces eye strain, saves battery)
- High-contrast typography
- Purposeful motion design
- Film-grade color grading

### 4. Progressive Enhancement

Core content accessible to all:

- Semantic HTML first
- CSS fallbacks for WebGL
- Reduced motion support
- Screen reader compatibility

### 5. Accessibility

Inclusive by default:

- WCAG AA contrast ratios
- Keyboard navigation support
- Focus trapping in modals
- ARIA labels where needed

### 6. Low Infrastructure Cost

Lean operations:

- Cloudflare Pages (free tier sufficient)
- Cloudflare R2 (no egress fees)
- Static-first architecture
- Minimal server-side logic

## Technology Philosophy

We choose boring technology where possible, exciting technology where necessary.

- **Astro** for zero-JS-by-default static pages
- **React** only for interactive islands
- **Three.js** only when WebGL adds value
- **GSAP** only for complex scroll animations
- **Cloudflare** for global edge delivery

## Project Status

**Current Phase:** Phase 1 — Foundation and Infrastructure

See `specs/phase-1/STATUS.md` for detailed task tracking.

## Repository Structure

```
labxr-web/
├── src/              # Source code
├── public/           # Static assets
├── docs/             # Documentation
├── infra/            # Infrastructure plans
├── specs/            # Phase specifications
└── .github/          # GitHub templates
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to see the site.

## Documentation

- `docs/architecture.md` — Technical architecture
- `docs/cloudflare-setup.md` — Cloudflare infrastructure
- `docs/decision-log.md` — Architecture decisions
- `specs/phase-1/` — Phase 1 specifications

## Contact

For business inquiries: [contact@labxr.art](mailto:contact@labxr.art)

---

**LabXR.art** — Code and Cinema, bridged.
