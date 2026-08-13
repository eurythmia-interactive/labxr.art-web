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

# Generate MP4 (H.264) - Legacy-compatible encoding
# Uses Main profile Level 3.1 for maximum device compatibility
echo "Generating MP4 (H.264 - legacy compatible)..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -profile:v main \
  -level 3.1 \
  -pix_fmt yuv420p \
  -b:v 2500k \
  -maxrate 3000k \
  -bufsize 5000k \
  -preset medium \
  -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
  -c:a aac \
  -ac 2 \
  -ar 44100 \
  -b:a 128k \
  -movflags +faststart \
  -y \
  "$OUTPUT_DIR/${BASENAME}.mp4"

# Generate WebM (VP9) - Alternative format for Android/Desktop
echo "Generating WebM (VP9)..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -crf 31 \
  -b:v 2000k \
  -maxrate 2500k \
  -bufsize 4000k \
  -pix_fmt yuv420p \
  -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
  -c:a libopus \
  -ac 2 \
  -ar 48000 \
  -b:a 128k \
  -y \
  "$OUTPUT_DIR/${BASENAME}.webm"

# Generate poster image (WebP)
echo "Generating poster image..."
ffmpeg -i "$INPUT" \
  -vf "select=eq(n\,0),scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
  -frames:v 1 \
  -quality 80 \
  -y \
  "$OUTPUT_DIR/${BASENAME}-poster.webp"

# Generate thumbnail (WebP)
echo "Generating thumbnail..."
ffmpeg -i "$INPUT" \
  -vf "select=eq(n\,0),scale=640:-1:force_original_aspect_ratio=decrease" \
  -frames:v 1 \
  -quality 75 \
  -y \
  "$OUTPUT_DIR/${BASENAME}-thumb.webp"

echo "✓ Compression complete!"
echo "Generated files:"
ls -lh "$OUTPUT_DIR/${BASENAME}"*
