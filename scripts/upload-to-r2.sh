#!/bin/bash

# Upload compressed videos to Cloudflare R2
# Requires: wrangler CLI, Cloudflare credentials in .env

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <video-basename>"
    echo "Example: $0 test-video"
    echo "Uploads all files matching public/videos/<basename>* to R2"
    exit 1
fi

BASENAME="$1"
VIDEO_DIR="public/videos"
BUCKET_NAME="labxr-assets"

echo "Uploading videos to R2 bucket: $BUCKET_NAME"
echo "Base name: $BASENAME"

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check for required environment variables
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ] || [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Error: CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN must be set in .env"
    exit 1
fi

# Upload MP4
if [ -f "$VIDEO_DIR/${BASENAME}.mp4" ]; then
    echo "Uploading ${BASENAME}.mp4..."
    wrangler r2 object put "$BUCKET_NAME/videos/${BASENAME}.mp4" \
        --file="$VIDEO_DIR/${BASENAME}.mp4" \
        --content-type="video/mp4"
    
    # Set cache headers via R2 API
    curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/videos/${BASENAME}.mp4" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: video/mp4" \
        -H "Cache-Control: public, max-age=31536000, immutable" \
        --data-binary "@$VIDEO_DIR/${BASENAME}.mp4"
fi

# Upload WebM
if [ -f "$VIDEO_DIR/${BASENAME}.webm" ]; then
    echo "Uploading ${BASENAME}.webm..."
    wrangler r2 object put "$BUCKET_NAME/videos/${BASENAME}.webm" \
        --file="$VIDEO_DIR/${BASENAME}.webm" \
        --content-type="video/webm"
    
    curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/videos/${BASENAME}.webm" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: video/webm" \
        -H "Cache-Control: public, max-age=31536000, immutable" \
        --data-binary "@$VIDEO_DIR/${BASENAME}.webm"
fi

# Upload poster
if [ -f "$VIDEO_DIR/${BASENAME}-poster.webp" ]; then
    echo "Uploading ${BASENAME}-poster.webp..."
    wrangler r2 object put "$BUCKET_NAME/videos/${BASENAME}-poster.webp" \
        --file="$VIDEO_DIR/${BASENAME}-poster.webp" \
        --content-type="image/webp"
    
    curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/videos/${BASENAME}-poster.webp" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: image/webp" \
        -H "Cache-Control: public, max-age=2592000" \
        --data-binary "@$VIDEO_DIR/${BASENAME}-poster.webp"
fi

# Upload thumbnail
if [ -f "$VIDEO_DIR/${BASENAME}-thumb.webp" ]; then
    echo "Uploading ${BASENAME}-thumb.webp..."
    wrangler r2 object put "$BUCKET_NAME/videos/${BASENAME}-thumb.webp" \
        --file="$VIDEO_DIR/${BASENAME}-thumb.webp" \
        --content-type="image/webp"
    
    curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/videos/${BASENAME}-thumb.webp" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: image/webp" \
        -H "Cache-Control: public, max-age=2592000" \
        --data-binary "@$VIDEO_DIR/${BASENAME}-thumb.webp"
fi

echo "✓ Upload complete!"
echo "Files available at: https://$BUCKET_NAME.${CLOUDFLARE_ACCOUNT_ID}.r2.cloud/videos/"
