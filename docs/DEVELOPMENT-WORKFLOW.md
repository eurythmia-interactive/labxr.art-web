# Development Workflow Guide

Complete reference for LabXR.art development workflow, git operations, and deployment procedures.

---

## Quick Reference Commands

### Daily Development
```bash
# Start development server
npm run dev

# Check TypeScript errors
npm run check

# Format code with Prettier
npm run format

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Git Operations
```bash
# Check status
git status

# Stage all changes
git add -A

# Stage specific files
git add src/components/sections/hero.astro

# Commit with conventional message
git commit -m "feat: add hero section with video background"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

### Video Processing
```bash
# Compress video for web
./scripts/compress-video.sh input.mp4

# Check video encoding
ffprobe -v error -show_entries stream=codec_name,profile,pix_fmt input.mp4

# Verify moov atom position (faststart)
ffprobe -v trace input.mp4 | grep -i moov
```

---

## Git Workflow

### Commit Message Convention

Use conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

#### Types
- `feat:` New feature
- `fix:` Bug fix
- `perf:` Performance improvement
- `refactor:` Code refactoring (no feature/bug changes)
- `docs:` Documentation only
- `style:` Code style (formatting, semicolons, etc)
- `test:` Adding or updating tests
- `chore:` Maintenance tasks (dependencies, configs)
- `build:` Build system or external dependencies
- `ci:` CI/CD configuration changes

#### Examples
```bash
# Simple feature
git commit -m "feat: add contact form with validation"

# Bug fix
git commit -m "fix: resolve video playback on iOS Safari"

# Performance
git commit -m "perf: reduce lucide bundle from 928KB to 6.82KB"

# Documentation
git commit -m "docs: add mobile video compatibility guide"

# Refactor
git commit -m "refactor: extract video player into separate component"

# Multiple changes
git commit -m "feat: add GSAP animations

- Add ScrollTrigger to manifesto section
- Implement stagger effects on service cards
- Respect prefers-reduced-motion preference"
```

### Branching Strategy

#### Main Branch
- `main` is the production branch
- All deployments happen from `main`
- Keep `main` stable and deployable at all times

#### Feature Branches (Optional)
For large features, use feature branches:

```bash
# Create feature branch
git checkout -b feature/contact-form

# Work on feature
# ... make changes ...

# Commit changes
git add -A
git commit -m "feat: implement contact form UI"

# Push feature branch
git push origin feature/contact-form

# Create PR on GitHub (optional)
# Or merge directly to main
git checkout main
git merge feature/contact-form
git push origin main

# Delete feature branch
git branch -d feature/contact-form
git push origin --delete feature/contact-form
```

### Typical Development Session

#### 1. Start Session
```bash
# Pull latest changes
git pull origin main

# Install dependencies (if package.json changed)
npm install

# Start dev server
npm run dev
```

#### 2. Make Changes
```bash
# Edit files in your editor
# ... make changes ...

# Check for TypeScript errors
npm run check

# Format code
npm run format

# Test locally at http://localhost:4321
```

#### 3. Commit Changes
```bash
# Review changes
git status
git diff

# Stage changes
git add -A

# Commit with descriptive message
git commit -m "feat: add hero section with video background"
```

#### 4. Push and Deploy
```bash
# Push to remote
git push origin main

# Cloudflare Pages auto-deploys
# Check deployment at https://labxr-art-web.pages.dev
```

#### 5. Verify Deployment
```bash
# Test live site
# - Check all pages load
# - Test interactive features
# - Verify mobile responsiveness
# - Check browser console for errors
```

---

## Development Commands Reference

### npm Scripts

#### `npm run dev`
Start development server with hot reload.

```bash
npm run dev
# Server starts at http://localhost:4321
# Auto-reloads on file changes
```

**When to use:**
- During active development
- Testing changes locally
- Debugging issues

#### `npm run build`
Create production build.

```bash
npm run build
# Output: dist/ directory
# Generates static HTML, CSS, JS
# Builds all pages
```

**When to use:**
- Before committing (verify build succeeds)
- Before deploying
- Checking bundle sizes
- Performance testing

**What to check:**
- Build completes without errors
- All pages generated
- Bundle sizes reasonable
- No TypeScript errors

#### `npm run check`
Run TypeScript type checking.

```bash
npm run check
# Checks all .ts and .tsx files
# Reports type errors
# Does not modify files
```

**When to use:**
- After making changes
- Before committing
- When TypeScript errors appear
- As part of CI/CD

**Expected output:**
```
Result (60 files):
- 0 errors
- 0 warnings
- 0 hints
```

#### `npm run format`
Format code with Prettier.

```bash
npm run format
# Formats all files
# Applies project style rules
# Modifies files in place
```

**When to use:**
- Before committing
- After making multiple changes
- When code style is inconsistent

#### `npm run preview`
Preview production build locally.

```bash
npm run preview
# Serves dist/ directory
# Tests production build
# Runs at http://localhost:4321
```

**When to use:**
- After `npm run build`
- Testing production behavior
- Debugging deployment issues

---

## Phase-Based Development

### Phase Structure

Each phase follows this pattern:

1. **Specification** - Create spec documents
2. **Implementation** - Build features
3. **Testing** - Verify functionality
4. **Documentation** - Update docs
5. **Deployment** - Push to production

### Phase Workflow

#### 1. Create Phase Spec
```bash
# Create spec directory
mkdir -p specs/phase-X

# Create overview document
# specs/phase-X/00-phase-overview.md

# Create status tracker
# specs/phase-X/STATUS.md
```

#### 2. Implement Tasks
```bash
# Work through tasks sequentially
# Commit after each major task

# Example:
git add -A
git commit -m "feat: implement task X.1 - content collections"

# Update STATUS.md
git add specs/phase-X/STATUS.md
git commit -m "docs: update phase X status"
```

#### 3. Test and Validate
```bash
# Run all checks
npm run check
npm run build

# Test manually
npm run dev
# Open browser, test all features

# Fix any issues
git add -A
git commit -m "fix: resolve issues found in testing"
```

#### 4. Generate Phase Report
```bash
# Create completion report
# docs/phase-X-report.md

# Update CONTEXT.md
# Update PROJECT-STATUS.md

git add -A
git commit -m "docs: complete phase X report"
```

#### 5. Deploy
```bash
git push origin main
# Wait for Cloudflare Pages deployment
# Verify on live site
```

---

## Testing and Verification

### Pre-Commit Checklist

Before every commit:

- [ ] `npm run check` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Code formatted with `npm run format`
- [ ] No console errors in browser
- [ ] Tested on desktop browser
- [ ] Tested on mobile (if applicable)
- [ ] Commit message follows convention

### Post-Deployment Verification

After pushing to main:

- [ ] Cloudflare Pages deployment succeeds
- [ ] All pages load correctly
- [ ] Interactive features work
- [ ] Videos play on desktop
- [ ] Videos play on mobile (with tap-to-play)
- [ ] No console errors
- [ ] Performance acceptable (check Network tab)
- [ ] Mobile responsive
- [ ] Accessibility features work

### Common Issues to Check

#### Videos Not Playing
```bash
# Check video encoding
ffprobe -v error -show_entries stream=codec_name,profile,pix_fmt public/videos/test-video.mp4

# Expected:
# codec_name=h264
# profile=Main
# pix_fmt=yuv420p

# If wrong, re-encode:
./scripts/compress-video.sh input.mp4
```

#### Build Fails
```bash
# Check TypeScript errors
npm run check

# Fix all errors before building
# Common issues:
# - Missing imports
# - Type mismatches
# - Unused variables
```

#### Deployment Fails
```bash
# Check build locally
npm run build

# Verify all files committed
git status

# Check Cloudflare Pages logs
# Common issues:
# - Missing environment variables
# - Build errors
# - File size limits
```

---

## File Organization

### Directory Structure
```
labxr.art-WEB/
├── src/
│   ├── components/
│   │   ├── islands/      # React interactive components
│   │   ├── sections/     # Astro page sections
│   │   ├── shared/       # Reusable Astro components
│   │   └── ui/           # shadcn/ui components
│   ├── content/          # Astro Content Collections
│   │   ├── case-studies/ # Markdown files
│   │   ├── services/     # Markdown files
│   │   └── team/         # Markdown files
│   ├── layouts/          # BaseLayout.astro
│   ├── lib/              # Utilities, stores, hooks
│   │   ├── stores/       # Nano Stores
│   │   ├── hooks/        # React hooks
│   │   └── utils.ts      # Helper functions
│   ├── pages/            # Astro pages
│   │   ├── index.astro   # Homepage
│   │   └── dev/          # Diagnostic routes
│   └── styles/           # Global CSS
├── public/               # Static assets
│   ├── fonts/            # Web fonts
│   ├── videos/           # Video files
│   └── images/           # Images
├── docs/                 # Documentation
├── specs/                # Phase specifications
└── scripts/              # Build scripts
```

### File Naming Conventions

#### Components
- **Astro components:** `kebab-case.astro` (e.g., `video-player.astro`)
- **React components:** `kebab-case.tsx` (e.g., `video-player-island.tsx`)
- **TypeScript files:** `kebab-case.ts` (e.g., `use-device.ts`)

#### Content Files
- **Markdown:** `kebab-case.md` (e.g., `espejo-ai.md`)
- **Images:** `descriptive-name.ext` (e.g., `avatar-1.svg`)

#### Documentation
- **Phase specs:** `XX-phase-overview.md` (e.g., `00-phase-overview.md`)
- **Reports:** `phase-X-report.md` (e.g., `phase-4-report.md`)
- **Guides:** `descriptive-name.md` (e.g., `mobile-video-complete-guide.md`)

---

## Environment Variables

### Local Development

Create `.env` file (not committed to git):

```bash
# Public variables (browser-accessible)
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ENVIRONMENT=development
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
PUBLIC_TURNSTILE_SITE_KEY=your-site-key

# Private variables (server-only)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
TURNSTILE_SECRET_KEY=your-secret-key
CONTACT_WEBHOOK_URL=your-webhook-url
```

### Production (Cloudflare Pages)

Set environment variables in Cloudflare Dashboard:

1. Go to Workers & Pages > Pages > Your project
2. Settings > Environment variables
3. Add variables for Production and Preview

**Required variables:**
- `PUBLIC_SITE_URL` = `https://labxr.art`
- `PUBLIC_ENVIRONMENT` = `production`
- `PUBLIC_CDN_URL` = `https://cdn.labxr.art`
- `PUBLIC_TURNSTILE_SITE_KEY` = (from Turnstile dashboard)
- `TURNSTILE_SECRET_KEY` = (from Turnstile dashboard, encrypted)
- `CONTACT_WEBHOOK_URL` = (Discord/Slack webhook)

---

## Deployment

### Automatic Deployment

Cloudflare Pages auto-deploys on push to `main`:

```bash
# Make changes
git add -A
git commit -m "feat: add new feature"
git push origin main

# Cloudflare automatically:
# 1. Detects push
# 2. Runs build command (npm run build)
# 3. Deploys to https://labxr-art-web.pages.dev
# 4. Shows deployment logs
```

### Manual Deployment (if needed)

```bash
# Build locally
npm run build

# Deploy with Wrangler
wrangler pages deploy dist

# Or use Cloudflare dashboard:
# 1. Go to Workers & Pages > Pages
# 2. Select project
# 3. Click "Create deployment"
# 4. Upload dist/ directory
```

### Deployment Verification

After deployment:

```bash
# 1. Check deployment status
# Visit Cloudflare Pages dashboard
# Verify deployment succeeded

# 2. Test live site
# Open https://labxr-art-web.pages.dev
# Test all pages and features

# 3. Check browser console
# Open DevTools (F12)
# Check for errors or warnings

# 4. Test on mobile
# Open on phone or use Chrome DevTools mobile emulation
# Verify responsive design
# Test touch interactions
```

---

## Troubleshooting

### Common Issues

#### Issue: Dev server won't start
```bash
# Clear cache
rm -rf node_modules/.vite
rm -rf .astro

# Reinstall dependencies
npm install

# Try again
npm run dev
```

#### Issue: TypeScript errors after pulling
```bash
# Regenerate types
npm run check

# If errors persist, clear cache
rm -rf .astro
npm run check
```

#### Issue: Build fails
```bash
# Check for TypeScript errors
npm run check

# Fix all errors
# Then build
npm run build
```

#### Issue: Videos not playing
```bash
# Check video encoding
ffprobe public/videos/test-video.mp4

# Should show:
# - codec: h264
# - profile: Main
# - pix_fmt: yuv420p

# If wrong, re-encode
./scripts/compress-video.sh input.mp4
```

#### Issue: Fonts not loading
```bash
# Check font files exist
ls -la public/fonts/

# Verify font format
file public/fonts/inter-v13-latin-700.woff2
# Should show: Web Open Font Format (Version 2)

# If corrupted, re-download from Google Fonts
```

#### Issue: CSP errors in console
```bash
# Check public/_headers
# Ensure all required domains are in CSP:
# - 'unsafe-inline' for Astro scripts
# - https://plausible.io for analytics
# - https://challenges.cloudflare.com for Turnstile
```

---

## Performance Monitoring

### Bundle Size Analysis

After building, check bundle sizes:

```bash
npm run build

# Look for:
# - Initial JS < 150KB gzipped
# - Lucide icons < 50KB
# - Three.js code-split (loaded separately)
# - GSAP code-split (loaded separately)
```

### Lighthouse Audit

```bash
# Build and preview
npm run build
npm run preview

# Open Chrome DevTools
# Go to Lighthouse tab
# Run audit on http://localhost:4321

# Target scores:
# - Performance: 90+
# - Accessibility: 90+
# - Best Practices: 90+
# - SEO: 90+
```

### Core Web Vitals

Monitor on live site:

```bash
# Use Chrome DevTools
# Open Performance tab
# Record page load

# Target metrics:
# - LCP (Largest Contentful Paint) < 2.5s
# - FID (First Input Delay) < 100ms
# - CLS (Cumulative Layout Shift) < 0.1
```

---

## Collaboration Guidelines

### Code Reviews

Before merging:

- [ ] Code follows project conventions
- [ ] TypeScript strict mode passes
- [ ] No console errors
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Commit messages follow convention

### Pull Requests

For large features:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... work on feature ...

# Commit regularly
git add -A
git commit -m "feat: implement part 1"
git commit -m "feat: implement part 2"

# Push branch
git push origin feature/new-feature

# Create PR on GitHub
# Request review
# Address feedback
# Merge to main
```

### Communication

- Use conventional commit messages
- Write clear PR descriptions
- Update documentation as you go
- Ask for help when stuck

---

## Security Best Practices

### Never Commit

- [ ] API keys or secrets
- [ ] Passwords or credentials
- [ ] Private keys or certificates
- [ ] Environment files (.env)
- [ ] Database connection strings

### Always Use

- [ ] Environment variables for secrets
- [ ] Cloudflare Workers secrets for server-side keys
- [ ] `.env.example` for documenting required variables
- [ ] `.gitignore` to exclude sensitive files

### Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Run `npm audit` to check for vulnerabilities
- [ ] Review and rotate API keys periodically
- [ ] Monitor Cloudflare security events

---

## Resources

### Documentation
- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)
- [shadcn/ui](https://ui.shadcn.com)

### Tools
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [GitHub Repository](https://github.com/eurythmia-interactive/labxr.art-web)
- [Live Site](https://labxr-art-web.pages.dev)

### Local Documentation
- `AGENTS.md` - Project rules and constraints
- `CONTEXT.md` - Session context and architecture
- `docs/` - All project documentation
- `specs/` - Phase specifications

---

**Last Updated:** 2026-08-15  
**Version:** 1.0  
**Maintained by:** LabXR.art Development Team
