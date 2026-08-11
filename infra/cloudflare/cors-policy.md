# CORS Policy

## Overview

Cross-Origin Resource Sharing (CORS) policy for Cloudflare R2 bucket (`labxr-assets`) accessed via custom domain (`cdn.labxr.art`).

## Allowed Origins

### Production Origins

- `https://labxr.art` — Main production site
- `https://www.labxr.art` — WWW production site (redirects to root)

### Development Origins

- `http://localhost:4321` — Local Astro dev server
- `http://localhost:3000` — Alternative local port (if used)

### Preview Origins

- `https://*.labxr-web.pages.dev` — Cloudflare Pages preview deployments
- `https://labxr-web.pages.dev` — Pages production URL (before custom domain)

### Origin List

```json
[
  "https://labxr.art",
  "https://www.labxr.art",
  "http://localhost:4321",
  "http://localhost:3000",
  "https://*.labxr-web.pages.dev"
]
```

## Allowed Methods

### Read Operations (Primary)

- `GET` — Retrieve assets
- `HEAD` — Check asset metadata

### Future Write Operations (If Needed)

- `PUT` — Upload assets (admin only)
- `DELETE` — Remove assets (admin only)

### Method List

```json
["GET", "HEAD"]
```

## Allowed Headers

### Standard Headers

- `Accept` — Content type acceptance
- `Accept-Encoding` — Compression preferences
- `Accept-Language` — Language preferences
- `Cache-Control` — Cache directives
- `Content-Type` — Request content type
- `Origin` — Request origin
- `Referer` — Referring page

### Custom Headers (Future)

- `Authorization` — Bearer tokens (if needed)
- `X-Requested-With` — AJAX request identification

### Header List

```json
["*"]
```

**Note:** Using wildcard `*` for allowed headers is acceptable for public read-only bucket.

## Exposed Headers

### Response Headers to Expose

- `Content-Length` — Asset size
- `Content-Range` — Partial content range
- `Accept-Ranges` — Range request support
- `Cache-Control` — Cache directives
- `ETag` — Entity tag for caching
- `Last-Modified` — Last modification date

### Exposed Header List

```json
["Content-Length", "Content-Range", "Accept-Ranges", "Cache-Control", "ETag", "Last-Modified"]
```

## Max Age

### Preflight Cache Duration

- **Value:** `3600` seconds (1 hour)
- **Reason:** Reduce OPTIONS request overhead
- **Trade-off:** Changes to CORS policy take up to 1 hour to propagate

### Max Age Configuration

```json
{
  "MaxAgeSeconds": 3600
}
```

## Credentials

### Allow Credentials

- **Value:** `false`
- **Reason:** Public read-only bucket, no authentication required
- **Security:** Prevents credential leakage

### Credentials Configuration

```json
{
  "AllowCredentials": false
}
```

## CORS Configuration

### R2 Bucket CORS Policy

```json
[
  {
    "AllowedOrigins": [
      "https://labxr.art",
      "https://www.labxr.art",
      "http://localhost:4321",
      "http://localhost:3000",
      "https://*.labxr-web.pages.dev"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposedHeaders": [
      "Content-Length",
      "Content-Range",
      "Accept-Ranges",
      "Cache-Control",
      "ETag",
      "Last-Modified"
    ],
    "MaxAgeSeconds": 3600,
    "AllowCredentials": false
  }
]
```

## Setting CORS Policy

### Via Cloudflare Dashboard

1. Go to Cloudflare Dashboard → R2
2. Select bucket: `labxr-assets`
3. Navigate to Settings → CORS Policy
4. Click "Edit CORS"
5. Paste JSON configuration
6. Save changes

### Via Wrangler CLI

```bash
# Create CORS configuration file
cat > cors-config.json << 'EOF'
[
  {
    "AllowedOrigins": [
      "https://labxr.art",
      "https://www.labxr.art",
      "http://localhost:4321",
      "https://*.labxr-web.pages.dev"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
EOF

# Apply CORS policy (if supported)
# Note: Wrangler CLI may not support CORS configuration directly
# Use Dashboard or API instead
```

### Via Cloudflare API

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/labxr-assets/cors" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '@cors-config.json'
```

## Testing CORS

### Browser Console Test

```javascript
// Test from browser console
fetch('https://cdn.labxr.art/videos/test.mp4', {
  method: 'GET',
  headers: {
    Origin: 'https://labxr.art',
  },
})
  .then((response) => {
    console.log('CORS OK:', response.status);
    console.log('Headers:', response.headers);
  })
  .catch((error) => {
    console.error('CORS Error:', error);
  });
```

### Curl Test

```bash
# Preflight OPTIONS request
curl -X OPTIONS \
  -H "Origin: https://labxr.art" \
  -H "Access-Control-Request-Method: GET" \
  -I https://cdn.labxr.art/videos/test.mp4

# Expected response headers:
# Access-Control-Allow-Origin: https://labxr.art
# Access-Control-Allow-Methods: GET, HEAD
# Access-Control-Max-Age: 3600
```

## Security Warnings

### DO NOT Use Wildcard Origins in Production

**Bad:**

```json
{
  "AllowedOrigins": ["*"]
}
```

**Why:**

- Allows any website to access assets
- Potential for abuse and bandwidth theft
- Violates security best practices
- May expose sensitive metadata

**Good:**

```json
{
  "AllowedOrigins": ["https://labxr.art", "https://www.labxr.art"]
}
```

### DO NOT Enable Credentials for Public Buckets

**Bad:**

```json
{
  "AllowCredentials": true
}
```

**Why:**

- Public bucket doesn't require authentication
- Credentials could be leaked
- Increases attack surface

**Good:**

```json
{
  "AllowCredentials": false
}
```

### DO NOT Allow All Methods for Public Buckets

**Bad:**

```json
{
  "AllowedMethods": ["GET", "HEAD", "PUT", "DELETE", "POST"]
}
```

**Why:**

- Public bucket should be read-only
- Write operations should be authenticated
- Increases security risk

**Good:**

```json
{
  "AllowedMethods": ["GET", "HEAD"]
}
```

## Troubleshooting

### CORS Error: No 'Access-Control-Allow-Origin' Header

**Cause:** Origin not in allowed list

**Solution:**

1. Check origin URL (exact match required)
2. Add origin to CORS policy
3. Wait for propagation (up to 1 hour)
4. Clear browser cache

### CORS Error: Preflight Response Doesn't Pass Access Control Check

**Cause:** Method or header not allowed

**Solution:**

1. Check allowed methods in CORS policy
2. Check allowed headers in CORS policy
3. Update CORS configuration
4. Wait for propagation

### CORS Works in Development but Not Production

**Cause:** Production origin not in allowed list

**Solution:**

1. Add production origin to CORS policy:
   - `https://labxr.art`
   - `https://www.labxr.art`
2. Verify CORS policy is applied
3. Test with curl

### CORS Error Only on Some Assets

**Cause:** Inconsistent CORS configuration

**Solution:**

1. Verify CORS policy is applied to entire bucket
2. Check individual object metadata
3. Re-upload affected objects
4. Clear CDN cache

## Monitoring

### Cloudflare Analytics

- Monitor R2 request logs
- Track CORS preflight requests
- Identify unusual access patterns

### Logging

```bash
# Enable R2 access logs (if available)
# View in Cloudflare Dashboard → R2 → Logs
```

### Alerts

- Set up alerts for unusual CORS errors
- Monitor bandwidth usage
- Track request volume spikes

## Related Documentation

- `infra/cloudflare/r2-plan.md` — R2 bucket configuration
- `infra/cloudflare/pages-plan.md` — Pages configuration
- `docs/cloudflare-setup.md` — Full Cloudflare setup guide
- `src/config/env.md` — Environment variables

---

**Last updated:** 2026-08-11
