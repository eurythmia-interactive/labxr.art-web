---
title: "AeroFlow Configurator"
client: "Premium Automotive Group"
category: "Web Application"
pubDate: 2025-01-22
year: 2025
coverImage: "https://placehold.co/1200x800/1a1a1a/00ff88?text=AeroFlow"
description: "A WebGL-powered 3D car configurator running at 60fps in the browser. Users can customize paint, rims, and interior materials in real-time with physically-based rendering (PBR), complete with dynamic environment lighting and seamless transition animations."
techStack: ["Three.js", "React", "GLSL", "glTF", "Cloudflare R2"]
disciplines: ['dev', 'products', 'ux-design']
idea: "Differentiate the digital showroom experience from dozens of 'me-too' configurators in the EV space. Three non-negotiables: must run smoothly on a 2019 iPhone, must feel cinematic on a 2024 gaming desktop, and must convert."
experience: "A high-end product configurator letting prospective buyers explore 47 paint colors, 12 wheel options, and 9 interior material combinations — all rendered in real-time PBR on a custom glTF model exceeding 4 million polygons. Median time-on-configurator: 6 min 12 sec (industry avg: 1 min 48 sec)."
technology: "Progressive enhancement pipeline: low-end devices get simplified PBR model with baked lighting, high-end devices unlock full dynamic IBL with 4K HDR environment maps streamed from R2. Custom shader chain uses clustered forward rendering with single-pass optimization."
process: "Built progressive enhancement pipeline for device scaling. Developed custom glTF model (4M+ polygons, instanced to 240k on screen). Implemented clustered forward rendering. Created persistent URL state for configuration sharing. localStorage + optional account sync."
venue: "Global (Web Application)"
scope: "WEBGL 3D CONFIGURATOR · PBR RENDERING · PROGRESSIVE ENHANCEMENT"
---

# AeroFlow — 3D Car Configurator

A high-end product configurator for a premium automotive client launching their flagship electric sedan. Built as a single-page web application, the configurator lets prospective buyers explore 47 paint colors, 12 wheel options, and 9 interior material combinations — all rendered in real-time PBR on a custom glTF model exceeding 4 million polygons (instanced to 240k on screen).

## The Brief

The client wanted to differentiate their digital showroom experience from the dozens of "me-too" configurators in the EV space. Three non-negotiables: must run smoothly on a 2019 iPhone, must feel cinematic on a 2024 gaming desktop, and must convert — every step had to be measured against a 15% lift target over the legacy Flash-based configurator.

## The Solution

We built a progressive enhancement pipeline: low-end devices get a simplified PBR model with baked lighting, while high-end devices unlock full dynamic IBL (image-based lighting) with 4K HDR environment maps streamed from R2. The custom shader chain uses clustered forward rendering with a single-pass optimization for the wheel and trim materials — a trick that brought the median mobile device from 22fps to a stable 58fps.

UX-wise, we stripped the configurator down to three core decisions (paint, wheels, interior) and parked everything else in a "details" drawer. Each choice commits immediately and updates a persistent URL state, so users can share their configuration with a single link. Saved configurations persist via localStorage and optional account sync.

## The Impact

- 15.4% conversion lift over the legacy configurator (target: 15%)
- 1.2M unique configurations saved in first 6 months
- Median time-on-configurator: 6 min 12 sec (industry avg: 1 min 48 sec)
- Featured in Awwwards "Sites of the Day" (March 2025)
- Lighthouse mobile score: 92 / desktop score: 98
- Loaded in under 2 seconds on 4G