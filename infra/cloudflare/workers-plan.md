# Cloudflare Workers Plan

## Overview

Cloudflare Workers will provide serverless backend functionality for LabXR.art, handling form submissions, validation, and future API endpoints.

**Status:** Not implemented in Phase 1. This document outlines the future Worker strategy.

## Planned Workers

### 1. Contact Form Handler (`labxr-forms`)

**Purpose:** Process contact form submissions

**Functionality:**

- Receive form data via POST request
- Validate form fields (name, email, message)
- Validate Cloudflare Turnstile token
- Send notification via Discord webhook
- Send email notification (optional)
- Return success/error response

**Trigger:** HTTP POST to `https://api.labxr.art/contact`

**Environment Variables:**

- `TURNSTILE_SECRET_KEY` — Turnstile validation secret
- `DISCORD_WEBHOOK_URL` — Discord notification webhook
- `EMAIL_API_KEY` — Email service API key (optional)

**Rate Limiting:**

- 5 requests per minute per IP
- Prevents spam and abuse

**Response Format:**

```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

### 2. Turnstile Validation (`labxr-auth`)

**Purpose:** Server-side Turnstile token validation

**Functionality:**

- Receive Turnstile token from client
- Validate token with Cloudflare Turnstile API
- Return validation result
- Optionally issue session token

**Trigger:** HTTP POST to `https://api.labxr.art/validate`

**Environment Variables:**

- `TURNSTILE_SECRET_KEY` — Turnstile validation secret

**Response Format:**

```json
{
  "success": true,
  "validated": true
}
```

### 3. Future API Endpoints

**Potential endpoints:**

- `/api/portfolio` — Dynamic portfolio data (if needed)
- `/api/analytics` — Custom analytics tracking
- `/api/newsletter` — Newsletter subscription handler
- `/api/webhooks` — External service webhooks

## Worker Architecture

### Technology Stack

- **Runtime:** Cloudflare Workers (V8 isolates)
- **Language:** TypeScript
- **Framework:** Hono (lightweight web framework)
- **Validation:** Zod (schema validation)
- **Testing:** Vitest

### Project Structure

```
workers/
├── labxr-forms/
│   ├── src/
│   │   ├── index.ts
│   │   ├── handlers/
│   │   │   └── contact.ts
│   │   ├── validators/
│   │   │   └── contact.ts
│   │   └── utils/
│   │       └── discord.ts
│   ├── wrangler.toml
│   ├── package.json
│   └── tsconfig.json
└── labxr-auth/
    └── [similar structure]
```

### Hono Framework Example

```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { contactHandler } from './handlers/contact';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['https://labxr.art', 'https://www.labxr.art'],
  })
);

app.post('/contact', contactHandler);

export default app;
```

## Secrets Handling

### Worker Secrets

Secrets are stored securely in Cloudflare and not accessible in code.

**Setting secrets:**

```bash
wrangler secret put TURNSTILE_SECRET_KEY
# Enter value when prompted

wrangler secret put DISCORD_WEBHOOK_URL
# Enter value when prompted
```

**Accessing secrets:**

```typescript
export interface Env {
  TURNSTILE_SECRET_KEY: string;
  DISCORD_WEBHOOK_URL: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const secret = env.TURNSTILE_SECRET_KEY;
    // Use secret...
  },
};
```

### Secret Management

- **Never commit secrets to Git**
- **Use different secrets per environment** (development, preview, production)
- **Rotate secrets periodically** (every 90 days)
- **Audit secret access** via Cloudflare logs

## Environment Variables

### Development (Local)

```toml
# wrangler.toml
[vars]
ENVIRONMENT = "development"
TURNSTILE_SECRET_KEY = "test-secret-key"
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/test"
```

### Production

Set via Cloudflare Dashboard or Wrangler CLI:

```bash
wrangler secret put TURNSTILE_SECRET_KEY --env production
wrangler secret put DISCORD_WEBHOOK_URL --env production
```

## Rate Limiting

### Strategy

- **Per-IP rate limiting** using Cloudflare KV or Durable Objects
- **Sliding window** algorithm
- **Configurable limits** per endpoint

### Implementation

```typescript
import { rateLimiter } from 'hono-rate-limiter';

app.use(
  '*',
  rateLimiter({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // 5 requests per minute
    standardHeaders: 'draft-6',
    keyGenerator: (c) => c.req.header('cf-connecting-ip'),
  })
);
```

### Rate Limit Response

```json
{
  "error": "Too many requests",
  "retryAfter": 60
}
```

## Logging

### Structured Logging

```typescript
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  requestId: string;
  ip: string;
  path: string;
  method: string;
  status: number;
  duration: number;
}

function log(entry: LogEntry) {
  console.log(JSON.stringify(entry));
}
```

### Log Destinations

- **Cloudflare Logs** — Built-in request logs
- **Discord webhook** — Error alerts
- **Email** — Critical errors (optional)

### Log Levels

- **INFO** — Successful requests, form submissions
- **WARN** — Rate limit hits, validation failures
- **ERROR** — Worker errors, external service failures

## Local Testing with Wrangler

### Development Server

```bash
# Start local Worker
wrangler dev

# Test endpoint
curl -X POST http://localhost:8787/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### Local Secrets

Create `.dev.vars` file (gitignored):

```
TURNSTILE_SECRET_KEY=test-secret
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/test
```

### Testing Turnstile

Use test keys from Cloudflare Turnstile dashboard:

- **Site key:** `1x00000000000000000000AA`
- **Secret key:** `1x0000000000000000000000000000000AA`

## Deployment

### Deployment Workflow

1. Develop locally with `wrangler dev`
2. Test with `wrangler tail` (live logs)
3. Deploy to preview: `wrangler deploy --env preview`
4. Test preview deployment
5. Deploy to production: `wrangler deploy --env production`

### Wrangler Configuration

```toml
# wrangler.toml
name = "labxr-forms"
main = "src/index.ts"
compatibility_date = "2026-08-11"

[env.production]
name = "labxr-forms-production"
route = { pattern = "api.labxr.art/contact", zone_name = "labxr.art" }

[env.preview]
name = "labxr-forms-preview"
route = { pattern = "preview-api.labxr.art/contact", zone_name = "labxr.art" }
```

### Deployment Commands

```bash
# Deploy to production
wrangler deploy --env production

# Deploy to preview
wrangler deploy --env preview

# Rollback
wrangler deployments rollback
```

## Monitoring

### Cloudflare Dashboard

- **Worker metrics** — Requests, errors, CPU time
- **Logs** — Real-time log streaming
- **Traces** — Request tracing

### External Monitoring

- **Uptime monitoring** — Ping endpoint every 5 minutes
- **Error tracking** — Sentry or similar service
- **Performance monitoring** — Track response times

### Alerts

- **Error rate > 1%** — Discord notification
- **Response time > 1s** — Discord notification
- **Worker down** — Email + Discord notification

## Security Considerations

### Input Validation

- Validate all input with Zod schemas
- Sanitize user input
- Reject unexpected fields
- Limit field lengths

### Authentication

- Turnstile validation for forms
- API keys for admin endpoints (future)
- JWT tokens for user sessions (future)

### HTTPS Only

- Enforce HTTPS for all endpoints
- Redirect HTTP to HTTPS
- HSTS headers

### CORS

- Restrict allowed origins
- No wildcard origins in production
- Validate Origin header

## Cost Considerations

### Workers Pricing

- **Free tier:** 100,000 requests/day
- **Paid:** $0.30/million requests (after free tier)
- **CPU time:** Included (up to 10ms per request on free tier)

### Estimated Costs (Launch)

- **Requests:** ~10k/month (contact form)
- **Cost:** $0 (within free tier)

### Cost Optimization

- Cache responses where possible
- Minimize CPU time per request
- Use KV for rate limiting (cheap storage)

## Human Confirmation Required

Before implementing Workers:

- [ ] Cloudflare account has Workers enabled
- [ ] Domain `api.labxr.art` is available
- [ ] Turnstile secret key is available
- [ ] Discord webhook URL is available
- [ ] Worker naming convention is approved

## Implementation Timeline

### Phase 5 (Contact Form)

- Implement `labxr-forms` Worker
- Set up Turnstile validation
- Configure Discord webhook
- Deploy to production

### Phase 6+ (Future)

- Implement additional Workers as needed
- Add authentication layer
- Build admin dashboard (optional)

## Related Documentation

- `docs/cloudflare-setup.md` — Full Cloudflare setup guide
- `infra/cloudflare/pages-plan.md` — Pages configuration
- `infra/cloudflare/r2-plan.md` — R2 bucket configuration
- `src/config/env.md` — Environment variables

---

**Last updated:** 2026-08-11
