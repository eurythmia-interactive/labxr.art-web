# Media Pipeline Documentation

## Overview

LabXR.art uses a multi-format video delivery pipeline optimized for web performance and cross-browser compatibility.

## Compression Pipeline

### Script: `scripts/compress-video.sh`

Generates four outputs from a source video:

1. **MP4 (H.264)** — Primary format, universal browser support
   - CRF 20 (high quality)
   - Max 1920x1080 resolution
   - AAC audio @ 128kbps
   - `faststart` flag for streaming
   - File: `{basename}.mp4`

2. **WebM (VP9)** — Alternative format, better compression
   - CRF 30 (good quality)
   - Max 1920x1080 resolution
   - Opus audio @ 128kbps
   - File: `{basename}.webm`

3. **Poster Frame** — Shown before video loads
   - WebP format, quality 80
   - Max 1920x1080 resolution
   - First frame of video
   - File: `{basename}-poster.webp`

4. **Thumbnail** — Small preview image
   - WebP format, quality 80
   - 640x360 resolution
   - File: `{basename}-thumb.webp`

### Usage

```bash
./scripts/compress-video.sh input-video.mp4
```

Outputs are written to `public/videos/`.

## Upload Pipeline

### Script: `scripts/upload-to-r2.sh`

Uploads compressed videos to Cloudflare R2 with proper cache headers.

### Usage

```bash
./scripts/upload-to-r2.sh test-video
```

Uploads all files matching `public/videos/test-video*` to R2 bucket `labxr-assets`.

### Cache Headers

- Videos (`.mp4`, `.webm`): `Cache-Control: public, max-age=31536000, immutable`
- Images (`.webp`): `Cache-Control: public, max-age=2592000`

## Cloudflare R2 Configuration

### Bucket: `labxr-assets`

- **Location:** WNAM (West North America)
- **Storage Class:** Standard
- **CORS Policy:** See `infra/cloudflare/r2-cors.json`

### CORS Origins

- `http://localhost:4321` (development)
- `https://labxr-art-web.pages.dev` (preview)
- `https://*.pages.dev` (all preview URLs)
- `https://labxr.art` (production)
- `https://*.labxr.art` (production subdomains)

### Allowed Methods

- `GET` — Download assets
- `HEAD` — Check asset existence

## Video Player Integration

The video player component (`src/components/shared/video-player.astro`) implements:

- **Lazy loading** via IntersectionObserver
- **Format fallback** — Tries WebM first, falls back to MP4
- **Poster images** — Prevents CLS, shows preview before load
- **iOS Safari compatibility** — Play button overlay, no autoplay on mobile
- **Memory management** — Pauses and unloads off-screen videos
- **Reduced motion** — Respects `prefers-reduced-motion` preference

## File Naming Convention

```
{video-name}.mp4              # MP4 version
{video-name}.webm             # WebM version
{video-name}-poster.webp      # Poster frame (1920x1080)
{video-name}-thumb.webp       # Thumbnail (640x360)
```

## Performance Targets

- **Lighthouse Performance:** > 90
- **CLS:** 0 (no layout shift)
- **LCP:** < 2.5s (poster image loads instantly)
- **Total video size:** < 2MB per video (compressed)

## Environment Variables

```bash
PUBLIC_CDN_URL=https://cdn.labxr.art
PUBLIC_R2_BUCKET_NAME=labxr-assets
```

## Local Development

Videos are served from `public/videos/` during development.

```bash
npm run dev
# Access: http://localhost:4321/videos/test-video.mp4
```

## Production

Videos are served from Cloudflare R2 via CDN.

```
https://cdn.labxr.art/videos/test-video.mp4
```

## Dependencies

- **FFmpeg** — Required for compression
  - Install: `sudo apt install ffmpeg`
  - Version: 6.1.1+

## Troubleshooting

### FFmpeg not found
```bash
sudo apt update && sudo apt install ffmpeg
```

### WebP encoding fails
Ensure FFmpeg is compiled with `--enable-libwebp`.

### R2 upload fails
Check Cloudflare API credentials in `.env`:
```bash
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```
