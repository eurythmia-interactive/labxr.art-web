# Environment Variables Guide

This document explains how to use environment variables in the LabXR.art project.

## Overview

Environment variables are used to configure the application for different environments (development, preview, production) and to store sensitive data like API keys and secrets.

## Types of Variables

### Public Variables (Browser-accessible)

Public variables are exposed to the browser via Astro's `import.meta.env`. They must be prefixed with `PUBLIC_`.

**Examples:**

- `PUBLIC_SITE_URL` — Site URL for SEO and meta tags
- `PUBLIC_ENVIRONMENT` — Environment name (development, preview, production)
- `PUBLIC_CDN_URL` — CDN URL for media assets
- `PUBLIC_R2_BUCKET_NAME` — Cloudflare R2 bucket name
- `PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key

**Usage in code:**

```typescript
// In .astro files
---
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
---

// In .ts/.tsx files
const cdnUrl = import.meta.env.PUBLIC_CDN_URL;
```

### Private Variables (Server-only)

Private variables are NOT exposed to the browser. They do not have the `PUBLIC_` prefix.

**Examples:**

- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token
- `R2_ACCESS_KEY_ID` — R2 access key
- `R2_SECRET_ACCESS_KEY` — R2 secret key

**Usage in code:**

```typescript
// Only in server-side code (not in components)
import { env } from 'astro:env/server';

const accountId = env.CLOUDFLARE_ACCOUNT_ID;
```

## Where to Store Variables

### Local Development

Create a `.env` file in the project root (gitignored):

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ENVIRONMENT=development
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets

# Private variables
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

**Never commit `.env` to Git.**

### Cloudflare Pages (Production)

Add environment variables in the Cloudflare Dashboard:

1. Go to Workers & Pages → `labxr-web` → Settings → Environment variables
2. Add each variable with the appropriate value
3. Set variables for both Production and Preview environments

**Public variables:**

- `PUBLIC_SITE_URL` = `https://labxr.art`
- `PUBLIC_ENVIRONMENT` = `production`
- `PUBLIC_CDN_URL` = `https://cdn.labxr.art`
- `PUBLIC_R2_BUCKET_NAME` = `labxr-assets`
- `PUBLIC_TURNSTILE_SITE_KEY` = `<from Turnstile dashboard>`

**Private variables:**

- Add any private variables needed for server-side code
- Worker secrets should be stored in the Worker dashboard, not Pages

### Cloudflare Workers (Future)

For Worker-specific secrets (like `TURNSTILE_SECRET_KEY`, `DISCORD_WEBHOOK_URL`):

```bash
wrangler secret put TURNSTILE_SECRET_KEY
# Enter value when prompted
```

Or via Cloudflare Dashboard → Workers → `labxr-forms` → Settings → Variables.

## Security Rules

### DO

- ✅ Use `PUBLIC_` prefix for browser-accessible variables
- ✅ Store secrets in Cloudflare Pages dashboard for production
- ✅ Store secrets in Worker secrets for Workers
- ✅ Use `.env.example` as a template with safe placeholders
- ✅ Add `.env` to `.gitignore`

### DO NOT

- ❌ Commit `.env` to Git
- ❌ Commit API keys or tokens to Git
- ❌ Use `PUBLIC_` prefix for secrets
- ❌ Hardcode secrets in source code
- ❌ Log secrets to console
- ❌ Use wildcard CORS origins in production

## Variable Reference

### Public Variables

| Variable                               | Description        | Example                 | Required |
| -------------------------------------- | ------------------ | ----------------------- | -------- |
| `PUBLIC_SITE_URL`                      | Site URL           | `https://labxr.art`     | Yes      |
| `PUBLIC_ENVIRONMENT`                   | Environment name   | `production`            | Yes      |
| `PUBLIC_CDN_URL`                       | CDN URL            | `https://cdn.labxr.art` | Yes      |
| `PUBLIC_R2_BUCKET_NAME`                | R2 bucket name     | `labxr-assets`          | Yes      |
| `PUBLIC_CLOUDFLARE_PAGES_PROJECT_NAME` | Pages project name | `labxr-web`             | No       |
| `PUBLIC_TURNSTILE_SITE_KEY`            | Turnstile site key | `0x4AAAAAAA...`         | Phase 5  |

### Private Variables

| Variable                | Description           | Where to Store    | Required |
| ----------------------- | --------------------- | ----------------- | -------- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Local `.env` only | No       |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token  | Local `.env` only | No       |
| `R2_ACCESS_KEY_ID`      | R2 access key         | Local `.env` only | No       |
| `R2_SECRET_ACCESS_KEY`  | R2 secret key         | Local `.env` only | No       |
| `TURNSTILE_SECRET_KEY`  | Turnstile secret      | Worker secrets    | Phase 5  |
| `DISCORD_WEBHOOK_URL`   | Discord webhook       | Worker secrets    | Phase 5  |

## Environment-Specific Configuration

### Development (Local)

```
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ENVIRONMENT=development
PUBLIC_CDN_URL=https://cdn.labxr.art
```

### Preview (Cloudflare Pages PR deployments)

```
PUBLIC_SITE_URL=https://<commit-hash>.labxr-web.pages.dev
PUBLIC_ENVIRONMENT=preview
PUBLIC_CDN_URL=https://cdn.labxr.art
```

### Production (Cloudflare Pages main branch)

```
PUBLIC_SITE_URL=https://labxr.art
PUBLIC_ENVIRONMENT=production
PUBLIC_CDN_URL=https://cdn.labxr.art
```

## Accessing Variables in Code

### In Astro Components (.astro)

```astro
---
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const environment = import.meta.env.PUBLIC_ENVIRONMENT;
---

<html>
  <head>
    <meta property="og:url" content={siteUrl} />
  </head>
  <body>
    <p>Environment: {environment}</p>
  </body>
</html>
```

### In TypeScript/JavaScript Files

```typescript
// Public variables (browser-accessible)
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const cdnUrl = import.meta.env.PUBLIC_CDN_URL;

// Private variables (server-only)
import { env } from 'astro:env/server';
const accountId = env.CLOUDFLARE_ACCOUNT_ID;
```

### In React Components (.tsx)

```tsx
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

export function SiteLink() {
  return <a href={siteUrl}>Home</a>;
}
```

## Type Safety

For better TypeScript support, create a typed configuration object:

```typescript
// src/config/site.ts
export const siteConfig = {
  url: import.meta.env.PUBLIC_SITE_URL as string,
  environment: import.meta.env.PUBLIC_ENVIRONMENT as string,
  cdnUrl: import.meta.env.PUBLIC_CDN_URL as string,
  r2Bucket: import.meta.env.PUBLIC_R2_BUCKET_NAME as string,
};
```

Then use it in your code:

```typescript
import { siteConfig } from '@config/site';

console.log(siteConfig.url);
```

## Troubleshooting

### Variable is undefined

- Check spelling (case-sensitive)
- Ensure `PUBLIC_` prefix for browser-accessible variables
- Restart dev server after adding new variables to `.env`
- Verify variable is set in Cloudflare Pages dashboard for production

### Variable is exposed to browser but shouldn't be

- Remove `PUBLIC_` prefix
- Use `import { env } from 'astro:env/server'` for server-only access

### Build fails with "env is not defined"

- Ensure variable is set in Cloudflare Pages dashboard
- Check variable name spelling
- Verify `.env` file exists for local development

## Best Practices

1. **Use `.env.example` as a template** — Keep it updated with all required variables
2. **Document each variable** — Explain purpose and example values
3. **Validate required variables** — Check at build time if critical variables are missing
4. **Use typed configuration** — Create a `siteConfig` object for type safety
5. **Rotate secrets regularly** — Update API tokens and keys periodically
6. **Use different values per environment** — Development, preview, and production should have separate configs

## Related Documentation

- `docs/cloudflare-setup.md` — Cloudflare infrastructure setup
- `docs/architecture.md` — Technical architecture
- `.env.example` — Environment variable template

---

**Last updated:** 2026-08-11
