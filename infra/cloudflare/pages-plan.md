# Cloudflare Pages Plan

## Project Configuration

- **Project name:** `labxr-web`
- **Repository:** GitHub (to be connected)
- **Production branch:** `main`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node compatibility version:** 20
- **Root directory:** `/` (repository root)

## Deployment Strategy

### Production Deployments

- Triggered on push to `main` branch
- URL: `https://labxr.art`
- Immutable deployment (each deploy gets unique URL)

### Preview Deployments

- Triggered on pull requests
- URL pattern: `https://<commit-hash>.labxr-web.pages.dev`
- Allows testing before merge
- No custom domain mapping

### Rollback Strategy

- Access previous deployments via Cloudflare Dashboard
- One-click rollback to any previous deployment
- Deployments retained indefinitely

## Required Environment Variables

### Production

```
PUBLIC_SITE_URL=https://labxr.art
PUBLIC_ENVIRONMENT=production
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME=labxr-web
PUBLIC_TURNSTILE_SITE_KEY=<from Turnstile dashboard>
```

### Preview

```
PUBLIC_SITE_URL=https://<preview-url>.pages.dev
PUBLIC_ENVIRONMENT=preview
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME=labxr-web
```

## Custom Domain Plan

### Primary Domain

- **Domain:** `labxr.art`
- **DNS Record:** CNAME → `labxr-web.pages.dev`
- **Proxy Status:** Proxied (orange cloud)

### WWW Handling

- **Domain:** `www.labxr.art`
- **Strategy:** Redirect to `labxr.art` (non-www)
- **DNS Record:** CNAME → `labxr-web.pages.dev`
- **Redirect:** Configured via `public/_redirects`

## Cache Considerations

### Static Assets

- Astro generates hashed filenames (`_astro/client.HASH.js`)
- Long-term caching safe for `_astro/` directory
- Cache-Control: `public, max-age=31536000, immutable`

### HTML Pages

- Default Cloudflare Pages caching
- Revalidated on each deployment
- No manual cache-busting needed

### CDN Assets (R2)

- Separate cache strategy via R2 bucket settings
- See `r2-plan.md` for details

## Headers Plan

Configured via `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/videos/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000
```

## Redirect Plan

Configured via `public/_redirects`:

```
# WWW to non-www
https://www.labxr.art/* https://labxr.art/:splat 301
```

## Security Headers Plan

### Implemented

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (restrictive)
- `Strict-Transport-Security` (HSTS)

### Content-Security-Policy (Future)

Conservative starter CSP to be refined:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.labxr.art data:;
  video-src 'self' https://cdn.labxr.art;
  connect-src 'self' https://cdn.labxr.art;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
```

**Note:** CSP will need adjustment when adding Three.js, external fonts, and analytics.

## Build Configuration

### Build Command

```bash
npm run build
```

This runs `astro build` which:

1. Generates static HTML for all pages
2. Bundles JavaScript with Vite
3. Processes Tailwind CSS
4. Outputs to `dist/` directory

### Node Version

- Set to Node 20 in Cloudflare Pages settings
- Matches local development (`.nvmrc`)
- Required for Astro 5+ compatibility

### Build Timeout

- Default: 15 minutes
- Expected build time: 2-3 minutes
- Sufficient for current project size

## Monitoring

### Cloudflare Analytics

- Built-in analytics dashboard
- Page views, bandwidth, requests
- Performance metrics

### Deployment Notifications

- Configure email/Slack notifications for deployment status
- Alert on build failures

### Uptime Monitoring

- Use Cloudflare monitoring or external service
- Track availability and response times

## Human Confirmation Required

Before proceeding:

- [ ] Cloudflare account access confirmed
- [ ] GitHub repository ready for connection
- [ ] Domain `labxr.art` accessible for DNS configuration
- [ ] Environment variables prepared for production

## Manual Dashboard Steps

1. Create Pages project in Cloudflare Dashboard
2. Connect GitHub repository
3. Configure build settings
4. Add environment variables
5. Attach custom domain
6. Configure DNS records
7. Enable HTTPS

## Wrangler CLI Commands (Optional)

```bash
# Create project
wrangler pages project create labxr-web --production-branch main

# Deploy manually
wrangler pages deploy dist --project-name labxr-web

# List deployments
wrangler pages deployment list --project-name labxr-web
```

---

**Last updated:** 2026-08-11
