# Cloudflare Setup Guide

This document explains how to configure Cloudflare infrastructure for LabXR.art.

## Prerequisites

- Cloudflare account with access to the `labxr.art` domain
- Cloudflare Wrangler CLI installed (`npm install -g wrangler`)
- Wrangler authenticated (`wrangler login`)

## 1. Domain Setup

### Add Domain to Cloudflare

If `labxr.art` is not already in Cloudflare:

1. Log in to Cloudflare Dashboard
2. Click "Add a Site"
3. Enter `labxr.art`
4. Select Free plan (or appropriate plan)
5. Update domain registrar nameservers to Cloudflare nameservers
6. Wait for DNS propagation (up to 24 hours)

### Verify Domain

```bash
wrangler whoami
```

## 2. Cloudflare Pages Project

### Create Pages Project

**Option A: Via Dashboard (Recommended)**

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click "Create application" → "Pages"
3. Select "Connect to Git"
4. Choose GitHub repository: `labxr-web`
5. Configure build settings:
   - **Project name:** `labxr-web`
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20`
6. Click "Save and Deploy"

**Option B: Via Wrangler CLI**

```bash
wrangler pages project create labxr-web --production-branch main
```

### Configure Environment Variables

In Cloudflare Dashboard → Pages → `labxr-web` → Settings → Environment variables:

**Production variables:**

```
PUBLIC_SITE_URL=https://labxr.art
PUBLIC_ENVIRONMENT=production
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME=labxr-web
PUBLIC_TURNSTILE_SITE_KEY=<from Turnstile dashboard>
```

**Preview variables (same as production, but):**

```
PUBLIC_SITE_URL=https://<preview-url>.pages.dev
PUBLIC_ENVIRONMENT=preview
```

### Custom Domain

1. Go to Pages → `labxr-web` → Custom domains
2. Click "Set up a custom domain"
3. Enter `labxr.art`
4. Follow DNS configuration instructions
5. Repeat for `www.labxr.art` (redirect to non-www)

### Preview Deployments

Every pull request automatically gets a preview URL:

```
https://<commit-hash>.labxr-web.pages.dev
```

No additional configuration needed.

## 3. Cloudflare R2 Bucket

### Create R2 Bucket

**Option A: Via Dashboard**

1. Go to Cloudflare Dashboard → R2
2. Click "Create bucket"
3. Bucket name: `labxr-assets`
4. Click "Create bucket"

**Option B: Via Wrangler CLI**

```bash
wrangler r2 bucket create labxr-assets
```

### Configure Public Access

**Option A: Public Bucket (Recommended for CDN)**

1. Go to R2 → `labxr-assets` → Settings
2. Under "Public access", click "Allow Access"
3. Note the public bucket URL

**Option B: Custom Domain (cdn.labxr.art)**

1. Go to R2 → `labxr-assets` → Settings
2. Under "Custom domains", click "Connect domain"
3. Enter `cdn.labxr.art`
4. Follow DNS configuration instructions

### R2 Bucket Structure

Create the following folder structure:

```
labxr-assets/
├── videos/
│   ├── posters/
│   └── [video files]
├── images/
│   ├── og/
│   ├── team/
│   └── case-studies/
└── [other assets]
```

**Via Wrangler CLI:**

```bash
# Upload a file
wrangler r2 object put labxr-assets/videos/poster.jpg --file=./poster.jpg

# List files
wrangler r2 object list labxr-assets/videos/
```

**Via Dashboard:**

1. Go to R2 → `labxr-assets`
2. Click "Upload" or "Create folder"
3. Drag and drop files

### Cache Control Headers

Set appropriate cache headers for different asset types:

**Videos:**

```
Cache-Control: public, max-age=31536000, immutable
```

**Images:**

```
Cache-Control: public, max-age=2592000
```

**Posters:**

```
Cache-Control: public, max-age=86400
```

**Via Wrangler CLI:**

```bash
wrangler r2 object put labxr-assets/video.mp4 \
  --file=./video.mp4 \
  --content-type=video/mp4 \
  --cache-control="public, max-age=31536000, immutable"
```

### Local Upload Workflow

For development, upload test assets to R2:

```bash
# Upload a test video
wrangler r2 object put labxr-assets/videos/test.mp4 \
  --file=./test-video.mp4 \
  --content-type=video/mp4

# Verify upload
wrangler r2 object list labxr-assets/videos/
```

## 4. DNS Configuration

### DNS Records

**Root domain (labxr.art):**

```
Type: CNAME
Name: @
Target: labxr-web.pages.dev
Proxy: Proxied (orange cloud)
```

**WWW subdomain:**

```
Type: CNAME
Name: www
Target: labxr-web.pages.dev
Proxy: Proxied (orange cloud)
```

**CDN subdomain:**

```
Type: CNAME
Name: cdn
Target: labxr-assets.r2.cloudflarestorage.com
Proxy: Proxied (orange cloud)
```

**Future API subdomain:**

```
Type: CNAME
Name: api
Target: <worker-name>.workers.dev
Proxy: Proxied (orange cloud)
```

### SSL/TLS Configuration

1. Go to Cloudflare Dashboard → SSL/TLS
2. Set encryption mode to **Full (strict)**
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

### DNS Propagation

DNS changes can take up to 24 hours to propagate. Check with:

```bash
dig labxr.art
dig cdn.labxr.art
```

## 5. CORS Policy

### Configure CORS for R2

If accessing R2 assets from multiple origins, configure CORS:

**Allowed origins:**

- `http://localhost:4321` (local development)
- `https://labxr.art` (production)
- `https://www.labxr.art` (production www)
- `https://*.labxr-web.pages.dev` (preview deployments)

**Via R2 Dashboard:**

1. Go to R2 → `labxr-assets` → Settings
2. Under "CORS Policy", click "Edit CORS"
3. Add CORS configuration:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:4321",
      "https://labxr.art",
      "https://www.labxr.art",
      "https://*.labxr-web.pages.dev"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

**Security note:** Do not use wildcard `*` for origins in production.

## 6. Cloudflare Workers (Future)

### Worker Plan

Workers will be used for:

- Contact form handler
- Turnstile validation
- Discord/email webhook delivery
- Rate limiting
- Logging

### Create Worker (Future)

```bash
wrangler worker create labxr-forms
```

### Worker Secrets

Store secrets in Worker environment:

```bash
wrangler secret put DISCORD_WEBHOOK_URL
wrangler secret put TURNSTILE_SECRET_KEY
```

## 7. Security Headers

### Configure Headers

Create `public/_headers` file:

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

### Content Security Policy (CSP)

**Conservative starter CSP (revisit when adding real assets):**

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

**Note:** This CSP will need adjustment when adding:

- Three.js (may require `unsafe-eval`)
- External fonts
- Analytics scripts
- Video CDN sources

## 8. Redirects

### Configure Redirects

Create `public/_redirects` file:

```
# WWW to non-www
https://www.labxr.art/* https://labxr.art/:splat 301

# Old paths (if needed)
/old-path /new-path 301
```

## 9. Environment Variables Summary

### Public Variables (Browser-accessible)

| Variable                               | Description        | Example                 |
| -------------------------------------- | ------------------ | ----------------------- |
| `PUBLIC_SITE_URL`                      | Site URL           | `https://labxr.art`     |
| `PUBLIC_ENVIRONMENT`                   | Environment name   | `production`            |
| `PUBLIC_CDN_URL`                       | CDN URL            | `https://cdn.labxr.art` |
| `PUBLIC_R2_BUCKET_NAME`                | R2 bucket name     | `labxr-assets`          |
| `PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME` | Pages project name | `labxr-web`             |
| `PUBLIC_TURNSTILE_SITE_KEY`            | Turnstile site key | `0x4AAAAAAA...`         |

### Private Variables (Server-only)

| Variable                | Description           | Where to Store    |
| ----------------------- | --------------------- | ----------------- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Local `.env` only |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token  | Local `.env` only |
| `R2_ACCESS_KEY_ID`      | R2 access key         | Local `.env` only |
| `R2_SECRET_ACCESS_KEY`  | R2 secret key         | Local `.env` only |
| `TURNSTILE_SECRET_KEY`  | Turnstile secret key  | Worker secrets    |
| `DISCORD_WEBHOOK_URL`   | Discord webhook       | Worker secrets    |

**Never commit these to Git.**

## 10. Deployment Checklist

Before deploying to production:

- [ ] Cloudflare Pages project created
- [ ] GitHub repository connected
- [ ] Build command set: `npm run build`
- [ ] Output directory set: `dist`
- [ ] Node version set: `20`
- [ ] Environment variables added to Pages
- [ ] R2 bucket created: `labxr-assets`
- [ ] R2 public access enabled
- [ ] CDN subdomain configured: `cdn.labxr.art`
- [ ] Custom domain attached: `labxr.art`
- [ ] SSL/TLS set to Full (strict)
- [ ] DNS records configured
- [ ] CORS policy set for R2
- [ ] Security headers configured
- [ ] Redirects configured
- [ ] Preview deployment tested
- [ ] Production deployment tested
- [ ] No secrets in Git

## 11. Troubleshooting

### DNS Not Propagating

```bash
dig labxr.art
dig cdn.labxr.art
```

Wait up to 24 hours. Clear browser cache.

### Build Fails on Cloudflare

Check build logs in Cloudflare Dashboard → Pages → `labxr-web` → Deployments.

Common issues:

- Missing environment variables
- Node version mismatch
- Build command incorrect
- Output directory incorrect

### R2 Assets Not Loading

Check:

- Bucket name correct
- Public access enabled
- CORS policy configured
- CDN subdomain DNS record exists
- Cache headers set correctly

### CORS Errors

Verify CORS policy in R2 settings includes all required origins.

## 12. Manual Dashboard Steps

Some steps require manual configuration in Cloudflare Dashboard:

1. **Add domain to Cloudflare** (if not already added)
2. **Create Pages project** (or use Wrangler)
3. **Create R2 bucket** (or use Wrangler)
4. **Configure custom domains** (Pages and R2)
5. **Set SSL/TLS mode** to Full (strict)
6. **Add environment variables** to Pages
7. **Configure CORS** for R2 bucket
8. **Set up DNS records**

## 13. Wrangler CLI Commands Reference

```bash
# Authentication
wrangler login
wrangler whoami

# Pages
wrangler pages project create labxr-web --production-branch main
wrangler pages deploy dist --project-name labxr-web

# R2
wrangler r2 bucket create labxr-assets
wrangler r2 bucket list
wrangler r2 object put labxr-assets/file.mp4 --file=./file.mp4
wrangler r2 object list labxr-assets/
wrangler r2 object get labxr-assets/file.mp4 --file=./downloaded.mp4

# Workers (future)
wrangler worker create labxr-forms
wrangler secret put SECRET_NAME
wrangler deploy
```

---

**Last updated:** 2026-08-11
