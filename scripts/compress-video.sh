#!/bin/bash

# Video Compression Pipeline for LabXR.art
# Generates optimized formats for web delivery

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <input-video>"
    echo "Example: $0 hero-video.mp4"
    exit 1
fi

INPUT="$1"
BASENAME="${INPUT%.*}"
OUTPUT_DIR="public/videos"

echo "Compressing: $INPUT"
echo "Output directory: $OUTPUT_DIR"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# 1. MP4 (H.264) - Primary format
echo "Generating MP4 (H.264)..."
ffmpeg -i "$INPUT" \
    -c:v libx264 \
    -crf 20 \
    -preset medium \
    -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    -y \
    "$OUTPUT_DIR/${BASENAME}.mp4"

# 2. WebM (VP9) - Alternative format
echo "Generating WebM (VP9)..."
ffmpeg -i "$INPUT" \
    -c:v libvpx-vp9 \
    -crf 30 \
    -b:v 0 \
    -preset good \
    -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
    -c:a libopus \
    -b:a 128k \
    -y \
    "$OUTPUT_DIR/${BASENAME}.webm"

# 3. Poster frame (WebP) - Shown before video loads
echo "Generating poster frame..."
ffmpeg -i "$INPUT" \
    -vf "select=eq(n\,0),scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
    -frames:v 1 \
    -quality 80 \
    -y \
    "$OUTPUT_DIR/${BASENAME}-poster.webp"

# 4. Thumbnail (WebP) - Small preview
echo "Generating thumbnail..."
ffmpeg -i "$INPUT" \
    -vf "select=eq(n\,0),scale=640:360:force_original_aspect_ratio=decrease" \
    -frames:v 1 \
    -quality 80 \
    -y \
    "$OUTPUT_DIR/${BASENAME}-thumb.webp"

echo "✓ Compression complete!"
echo "Generated files:"
ls -lh "$OUTPUT_DIR/${BASENAME}"*
