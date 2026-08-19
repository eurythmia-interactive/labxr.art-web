---
title: "Terra Verde Exhibit"
client: "Environmental NGO"
category: "Museum Exhibit"
pubDate: 2024-06-21
year: 2024
coverImage: "https://placehold.co/1200x800/1a1a1a/10b981?text=Terra+Verde"
description: "An interactive digital exhibit educating visitors about deforestation. Touch-sensitive capacitive surfaces trigger localized projection mapping on physical topographic models, revealing data layers about biodiversity loss and climate impact in real-time."
techStack: ["TouchDesigner", "Capacitive Sensors", "Three.js", "Mapbox", "D3.js"]
disciplines: ['museography', 'xr', 'interactivity']
idea: "The NGO's existing educational materials (printed infographics, video loops) weren't moving the needle on visitor engagement or post-visit behavior change. They wanted something that made the data visceral — that turned passive viewers into active explorers."
experience: "A traveling museum exhibit featuring a 4-meter-wide physical topographic model of the Amazon basin, lit by 12 overhead projectors and wrapped in a hidden capacitive sensing grid. Visitors touch any point on the model and watch the projection layer change — revealing biodiversity loss, deforestation rates, or climate projections. Average dwell time: 11 minutes (vs. 90 seconds for static exhibits)."
technology: "Custom capacitive sensing grid using 64-electrode ITO (indium tin oxide) array, sampled at 120Hz. Touch coordinates triangulated with sub-centimeter accuracy, forwarded as OSC to TouchDesigner, driving 12 ceiling-mounted projectors via NDI. Data layers: deforestation, biodiversity, climate scenarios, indigenous territories."
process: "Built custom capacitive sensing grid with 64-electrode ITO array. Developed touch triangulation with sub-centimeter accuracy. Created OSC forwarding to TouchDesigner. Configured 12 ceiling-mounted projectors via NDI. Implemented personalized 'report card' email system."
venue: "Traveling exhibit (7 museums across Mexico, Colombia, Brazil, Argentina)"
scope: "INTERACTIVE TOPOGRAPHIC MODEL · CAPACITIVE SENSING · DATA VISUALIZATION"
---

# Terra Verde — Interactive Climate Education

A traveling museum exhibit for one of LatAm's largest environmental NGOs. The centerpiece: a 4-meter-wide physical topographic model of the Amazon basin, lit by 12 overhead projectors and wrapped in a hidden capacitive sensing grid. Visitors touch any point on the model and watch the projection layer change — revealing biodiversity loss, deforestation rates, or climate projections specific to that exact geographic coordinate.

## The Brief

The NGO's existing educational materials (printed infographics, video loops) weren't moving the needle on visitor engagement or post-visit behavior change. They wanted something that made the data visceral — that turned passive viewers into active explorers. Budget: lean. Timeline: 4 months.

## The Solution

We built a custom capacitive sensing grid underneath the topographic model using a 64-electrode ITO (indium tin oxide) array, sampled at 120Hz. Touch coordinates are triangulated with sub-centimeter accuracy and forwarded as OSC to TouchDesigner, which uses the data to drive 12 ceiling-mounted projectors via NDI.

Each touch reveals a different data layer: deforestation since 2000 (color-coded loss), biodiversity hotspots (animated fauna icons), projected climate scenarios (time-lapse tree die-off animations), and indigenous territory overlays. Visitors can layer multiple data types, and the system remembers their selections to generate a personalized "report card" they can email to themselves.

## The Impact

- Visited 7 museums across Mexico, Colombia, Brazil, and Argentina in first 18 months
- Average dwell time: 11 minutes (vs. 90 seconds for static exhibits)
- 73% of visitors reported increased awareness of deforestation impact
- 18,000+ personalized report cards generated
- Recipient of the 2025 AAM MUSE Award for Interpretive Interactive Media
- Open-sourced the capacitive grid design for other NGOs to replicate