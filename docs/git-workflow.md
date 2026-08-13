# Git Workflow & Deployment Guide

## Current Status (2026-08-13)

You have completed Phase 3 and Phase 4 with significant new features:
- Video infrastructure (compression pipeline, R2 bucket, video player)
- Site chrome (navigation, footer, hero section)
- Content collections (case studies, services, team)
- Portfolio modal system
- All sections assembled on homepage

**All changes are currently uncommitted.**

## Committing Current Work

### Option 1: Single Commit (Recommended)

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: complete Phase 3 & Phase 4 - video infrastructure, content collections, and homepage assembly

Phase 3:
- Added R2 bucket setup and CORS configuration
- Implemented FFmpeg video compression pipeline
- Created lazy-loading video player with iOS compatibility
- Built navigation with mobile menu and focus trapping
- Built footer with social links
- Created hero section with video background

Phase 4:
- Set up Astro Content Collections with Zod schemas
- Created case studies, services, and team collections
- Built manifesto, services, portfolio, and team sections
- Implemented single-modal portfolio architecture with Nano Store
- Created LucideIcon island for dynamic icon rendering
- Assembled complete homepage with all sections

Includes placeholder content, test videos, and team avatars.
All TypeScript checks pass, build successful."

# Push to GitHub
git push origin main
```

### Option 2: Separate Commits (More Granular)

```bash
# Phase 3 work
git add scripts/ public/videos/ docs/media-pipeline.md docs/phase-3-report.md
git add src/components/shared/navigation.astro src/components/shared/footer.astro
git add src/components/shared/video-player.astro src/components/islands/video-player-island.tsx
git add src/components/islands/mobile-menu.tsx src/components/sections/hero.astro
git add src/lib/hooks/use-intersection-observer.ts src/lib/video/
git add src/pages/dev/video-player.astro infra/cloudflare/r2-cors.json
git add specs/phase-3/STATUS.md

git commit -m "feat: complete Phase 3 - video infrastructure and site chrome

- R2 bucket setup with CORS configuration
- FFmpeg video compression pipeline (MP4, WebM, poster, thumbnail)
- Lazy-loading video player with iOS Safari compatibility
- Navigation with mobile menu and focus trapping
- Footer with social links and responsive layout
- Hero section with video background
- Video player diagnostic route at /dev/video-player
- All TypeScript checks pass, build successful"

# Phase 4 work
git add src/content.config.ts src/content/ src/assets/images/team/
git add src/components/sections/manifesto.astro src/components/sections/services.astro
git add src/components/sections/portfolio.astro src/components/sections/team.astro
git add src/components/shared/service-card.astro src/components/islands/lucide-icon.tsx
git add src/components/islands/case-study-viewer.tsx src/lib/stores/portfolio.ts
git add specs/phase-4/ docs/phase-4-report.md

git commit -m "feat: complete Phase 4 - content collections and homepage assembly

- Astro Content Collections with strict Zod schemas
- Case studies, services, and team collections with placeholder content
- Manifesto section with split-screen layout
- Services section with LucideIcon dynamic rendering
- Portfolio grid with click-to-open modal
- Case study viewer with lazy-loaded video playback
- Team section with editorial cards and social links
- Complete homepage assembly with all sections
- All TypeScript checks pass, build successful"

# Shared updates
git add AGENTS.md CONTEXT.md .gitignore README.md
git add src/layouts/BaseLayout.astro src/pages/index.astro

git commit -m "chore: update documentation and shared components

- Updated AGENTS.md with explicit instruction rule
- Updated CONTEXT.md with Phase 3 & 4 completion status
- Updated BaseLayout to include navigation and footer
- Updated .gitignore for new directories
- Added Phase 3 and Phase 4 reports"

# Push all commits
git push origin main
```

## Verifying GitHub Sync

After pushing, verify your changes are on GitHub:

```bash
# Check git status (should be clean)
git status

# Check recent commits
git log --oneline -5

# Verify remote is set correctly
git remote -v
```

Then visit: https://github.com/eurythmia-interactive/labxr.art-web

## Cloudflare Pages Auto-Deployment

Once pushed to `main`, Cloudflare Pages will automatically:
1. Detect the new commit
2. Run `npm run build`
3. Deploy to https://labxr-art-web.pages.dev

Monitor deployment at: https://dash.cloudflare.com → Pages → labxr-web

## Development Commands Reference

```bash
# Start development server
npm run dev

# Type check without building
npm run check

# Production build
npm run build

# Preview production build locally
npm run preview

# Format code with Prettier
npm run format
```

## Diagnostic Routes

After deployment, these routes are available for testing:

- `/dev/health` — System health check (Phase 1)
- `/dev/design-system` — Design system showcase (Phase 2)
- `/dev/video-player` — Video player testing (Phase 3)

## Next Steps

After successful deployment:
1. Test all pages and interactions on the live site
2. Verify video playback works correctly
3. Test portfolio modal opens/closes properly
4. Check mobile responsiveness
5. Review console for any errors
6. Proceed to Phase 5 when ready (awaiting specification)

## Troubleshooting

### Build fails on Cloudflare
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run check

# Review build output for specific errors
```

### Videos not loading
- Verify videos exist in `public/videos/`
- Check file paths in content collections
- Ensure CORS is configured on R2 bucket (see `infra/cloudflare/r2-cors.json`)

### Images not displaying
- Check image paths in markdown frontmatter
- Verify images exist in `src/assets/images/`
- Ensure relative paths are correct (e.g., `../../assets/images/team/avatar-1.svg`)

## Git Best Practices for This Project

1. **Commit frequently** — After completing each major task
2. **Use conventional commits** — `feat:`, `fix:`, `chore:`, `docs:`
3. **Test before committing** — Run `npm run check` and `npm run build`
4. **No secrets in Git** — Use `.env.example` for placeholders
5. **Push to main** — Cloudflare Pages deploys from main branch

---

**Last updated:** 2026-08-13  
**Current phase:** Phase 4 complete, awaiting Phase 5 specification
