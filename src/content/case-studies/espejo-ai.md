---
title: "Espejo AI — Interactive Mirror Installation"
client: "Museo Soumaya"
category: "Interactive Installation"
pubDate: 2024-06-15
description: "AI-powered interactive mirror that transforms visitors into digital art in real-time using computer vision and generative algorithms."
videoUrl: "/videos/test-video.mp4"
posterUrl: "/videos/test-video-poster.webp"
techStack: ["TensorFlow.js", "WebGL", "Three.js", "MediaPipe"]
metrics:
  interactions: "12,000+ visitors"
  uptime: "99.8%"
disciplines: ['interactivity', 'museography', 'xr']
---

A groundbreaking interactive installation that uses AI to transform museum visitors into living digital artworks. The system analyzes visitor movements and generates real-time visual responses projected onto a large-scale mirror display.

## Technical Challenge

Processing video input at 60fps while running multiple AI models simultaneously required careful optimization of WebGL shaders and model inference pipelines.

## Solution

Custom TensorFlow.js models optimized for browser execution, combined with GPU-accelerated particle systems in Three.js, created a seamless interactive experience.
