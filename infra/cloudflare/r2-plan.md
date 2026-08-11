# Cloudflare R2 Plan

## Bucket Configuration

- **Bucket name:** `labxr-assets`
- **Location:** Automatic (Cloudflare manages region)
- **Public access:** Enabled (for CDN delivery)
- **Custom domain:** `cdn.labxr.art`

## Bucket Purpose

Store and serve static media assets:

- Videos (portfolio pieces, hero backgrounds)
- Images (team photos, case studies, OG images)
- Posters (video thumbnails)
- Future: 3D models, textures, audio files

## Public Read Strategy

### Option A: Public Bucket (Recommended)

- Enable public access in R2 settings
- Assets accessible via public URL
- No authentication required for reads
- Ideal for CDN delivery

**Public URL format:**

```
https://pub-<HASH>.r2.dev/<object-key>
```

### Option B: Custom Domain (cdn.labxr.art)

- Map custom domain to R2 bucket
- Cleaner URLs for asset delivery
- Better branding and cache control

**Custom domain URL format:**

```
https://cdn.labxr.art/videos/hero.mp4
```

## Future Private Bucket Strategy

For white-label client assets that should not be publicly accessible:

### Private Bucket: `labxr-client-assets`

- No public access
- Signed URLs for temporary access
- Used for client-specific deliverables
- Access controlled via Workers

**Signed URL generation:**

```typescript
// In Cloudflare Worker
const signedUrl = await r2.get('client-asset.mp4', {
  range: { offset: 0, length: 1024 },
});
```

## Folder Structure Inside R2

```
labxr-assets/
├── videos/
│   ├── posters/           # Video thumbnails
│   │   ├── hero-poster.jpg
│   │   ├── case-01-poster.jpg
│   │   └── case-02-poster.jpg
│   ├── hero-background.mp4
│   ├── case-01-demo.mp4
│   └── case-02-demo.mp4
├── images/
│   ├── og/                # Open Graph images
│   │   ├── home-og.jpg
│   │   └── case-01-og.jpg
│   ├── team/              # Team member photos
│   │   ├── member-01.jpg
│   │   └── member-02.jpg
│   └── case-studies/      # Case study images
│       ├── case-01-hero.jpg
│       └── case-01-detail.jpg
└── [future assets]
```

## File Naming Conventions

### Videos

- **Format:** `<descriptive-name>.mp4`
- **Examples:** `hero-background.mp4`, `case-01-demo.mp4`
- **Posters:** `<video-name>-poster.jpg`

### Images

- **Format:** `<category>/<descriptive-name>.<ext>`
- **Examples:** `team/member-01.jpg`, `og/home-og.jpg`
- **Use lowercase and hyphens**
- **No spaces or special characters**

### General Rules

- Use kebab-case (lowercase with hyphens)
- Be descriptive but concise
- Include version number if needed: `hero-v2.mp4`
- Avoid special characters: `@#$%^&*()`

## Cache Control Strategy

### Videos

```
Cache-Control: public, max-age=31536000, immutable
```

- 1 year cache (31536000 seconds)
- Immutable (hashed filenames not used, but videos rarely change)
- Reduces bandwidth costs

### Images

```
Cache-Control: public, max-age=2592000
```

- 30 days cache (2592000 seconds)
- Allows updates without long cache invalidation

### Posters

```
Cache-Control: public, max-age=86400
```

- 1 day cache (86400 seconds)
- Posters may update more frequently

### Setting Cache Headers

**Via Wrangler CLI:**

```bash
wrangler r2 object put labxr-assets/videos/hero.mp4 \
  --file=./hero.mp4 \
  --content-type=video/mp4 \
  --cache-control="public, max-age=31536000, immutable"
```

**Via Dashboard:**

1. Upload file
2. Edit metadata
3. Add `Cache-Control` header

## CDN Delivery Strategy

### Custom Domain: cdn.labxr.art

1. Create CNAME record: `cdn.labxr.art` → R2 bucket
2. Enable proxy (orange cloud) in Cloudflare DNS
3. SSL/TLS mode: Full (strict)

### Benefits

- Global edge caching via Cloudflare CDN
- Lower latency worldwide
- Reduced R2 egress costs (Cloudflare-to-Cloudflare traffic free)
- Automatic compression and optimization

### Access Pattern

```html
<!-- In Astro components -->
<video src="https://cdn.labxr.art/videos/hero.mp4" />
<img src="https://cdn.labxr.art/images/team/member-01.jpg" />
```

## Backup Strategy

### Local Backup

- Keep original source files in local repository or external storage
- Document file locations in `docs/media-assets.md` (future)

### R2 Versioning (Future)

- Enable object versioning for critical assets
- Protect against accidental deletion
- Retain previous versions for 30 days

### Export Strategy

```bash
# Download all assets
wrangler r2 object list labxr-assets/ --json > assets-manifest.json

# Download specific folder
wrangler r2 object get labxr-assets/videos/ --file=./backup/videos/
```

## Local Upload Workflow

### Development

1. Place test assets in `public/temp/` (gitignored)
2. Upload to R2 for testing
3. Verify CDN delivery
4. Remove local temp files

### Production

1. Optimize assets locally (compress videos, resize images)
2. Upload to R2 via Wrangler CLI or Dashboard
3. Set appropriate cache headers
4. Update source code to use new asset URLs
5. Test in preview deployment
6. Merge to production

## Wrangler Commands

### Bucket Management

```bash
# Create bucket
wrangler r2 bucket create labxr-assets

# List buckets
wrangler r2 bucket list

# Delete bucket (caution!)
wrangler r2 bucket delete labxr-assets
```

### Object Management

```bash
# Upload file
wrangler r2 object put labxr-assets/videos/hero.mp4 \
  --file=./hero.mp4 \
  --content-type=video/mp4

# Upload with cache control
wrangler r2 object put labxr-assets/images/team/member-01.jpg \
  --file=./member-01.jpg \
  --content-type=image/jpeg \
  --cache-control="public, max-age=2592000"

# List objects
wrangler r2 object list labxr-assets/videos/

# Download object
wrangler r2 object get labxr-assets/videos/hero.mp4 \
  --file=./downloaded-hero.mp4

# Delete object
wrangler r2 object delete labxr-assets/videos/old-video.mp4
```

### Test Upload

```bash
# Upload test file
echo "test" > test.txt
wrangler r2 object put labxr-assets/test.txt --file=./test.txt

# Verify upload
wrangler r2 object list labxr-assets/

# Clean up
wrangler r2 object delete labxr-assets/test.txt
rm test.txt
```

## Manual Dashboard Fallback

If Wrangler CLI is unavailable:

1. Go to Cloudflare Dashboard → R2
2. Select bucket: `labxr-assets`
3. Click "Upload" button
4. Drag and drop files or select from file picker
5. Edit metadata (content-type, cache-control) after upload
6. Verify public URL

## Cost Considerations

### R2 Pricing

- **Storage:** $0.015/GB per month
- **Class A operations (writes):** $4.50/million requests
- **Class B operations (reads):** $0.36/million requests
- **Egress:** FREE (no data transfer fees)

### Estimated Costs (Launch)

- **Storage:** 10GB = $0.15/month
- **Operations:** ~100k reads/month = $0.036/month
- **Egress:** Unlimited (free)
- **Total:** ~$0.19/month

### Cost Optimization

- Use appropriate cache headers to reduce reads
- Compress videos before upload
- Use image optimization (WebP, AVIF)
- Monitor usage in Cloudflare Dashboard

## Human Confirmation Required

Before proceeding:

- [ ] Cloudflare account has R2 enabled
- [ ] Bucket name `labxr-assets` is available
- [ ] Custom domain `cdn.labxr.art` is available
- [ ] Wrangler CLI is authenticated

## Security Considerations

- Do not upload sensitive or private assets to public bucket
- Use signed URLs for private assets (future)
- Monitor bucket access logs
- Set up alerts for unusual activity
- Regularly review public assets

## Related Documentation

- `docs/cloudflare-setup.md` — Full Cloudflare setup guide
- `infra/cloudflare/cors-policy.md` — CORS configuration
- `src/config/env.md` — Environment variables

---

**Last updated:** 2026-08-11
