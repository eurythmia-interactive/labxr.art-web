# LabXR Web

B2B portfolio site for LabXR.art — a creative technology lab in CDMX bridging Code and Cinema.

## Tech Stack

- **Framework:** Astro 5.17.3 (TypeScript Strict)
- **UI Islands:** React 18.3.1
- **Styling:** Tailwind CSS 3.4.19 (Mobile-First)
- **3D:** Three.js via @react-three/fiber (WebGL showcase)
- **Animation:** GreenSock GSAP (ScrollTrigger reveals)
- **State:** Nano Stores (cross-framework state management)
- **Infrastructure:** Cloudflare Pages, R2, Workers

## Prerequisites

- Node.js 22+
- npm 10+
- Git
- FFmpeg (for video compression)

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

## Video Compression

```bash
./scripts/compress-video.sh input-video.mp4
```

This generates mobile-compatible videos with:
- H.264 Main profile Level 3.1
- 720p resolution (1280x720)
- Bitrate capped at 2500kbps
- Stereo AAC audio
- +faststart flag for streaming

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
│   ├── content/         # Astro Content Collections
│   │   ├── case-studies/
│   │   ├── services/
│   │   └── team/
│   ├── config/          # Configuration files
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Astro pages
│   └── styles/          # Global styles
├── public/              # Static assets
├── scripts/             # Build and compression scripts
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

**Live URL:** https://labxr-art-web.pages.dev

## Phase Status

**Current Phase:** Phase 5.5 — Cinematic Hero & Dedicated WebGL Showcase (COMPLETE)

**Next:** Awaiting Phase 6 specification

See `specs/phase-5.5/STATUS.md` for task tracking.

## Mobile Video Compatibility

All videos are encoded with a legacy-safe profile for maximum mobile compatibility:
- H.264 Main profile Level 3.1
- 720p resolution
- Stereo audio
- Bitrate capped at 2500kbps

This ensures playback on:
- iOS 9+ Safari
- Android 5+ Chrome/Samsung Internet
- Mid-range devices with buggy OEM decoders
- 5-year-old phones (2019-2020 models)

See `docs/mobile-video-complete-guide.md` for comprehensive details.

## Documentation

### Phase Reports
- `docs/phase-1-report.md` - Phase 1 completion report
- `docs/phase-2-report.md` - Phase 2 completion report
- `docs/phase-3-report.md` - Phase 3 completion report
- `docs/phase-4-report.md` - Phase 4 completion report
- `docs/phase-5-report.md` - Phase 5 completion report
- `docs/phase-5.5-report.md` - Phase 5.5 completion report

### Guides & Setup
- `docs/DEVELOPMENT-WORKFLOW.md` - Development workflow guide (git, commands, testing)
- `docs/custom-domain-setup.md` - DNS and domain setup guide
- `docs/analytics-setup.md` - Plausible analytics configuration
- `docs/mobile-video-complete-guide.md` - Comprehensive mobile video guide
- `docs/mobile-video-fix.md` - Mobile video compatibility fixes
- `docs/mobile-video-testing.md` - Mobile testing guide
- `docs/media-pipeline.md` - Video pipeline documentation
