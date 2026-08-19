---
title: "Sonic Bloom"
client: "International Music Festival"
category: "Live Event"
pubDate: 2025-04-08
year: 2025
coverImage: "https://placehold.co/1200x800/1a1a1a/a855f7?text=Sonic+Bloom"
description: "A massive audio-reactive LED and projection installation at the festival's main stage. The system ingests live audio feeds from the DJ booth, processing frequencies in real-time to drive generative visual algorithms, creating a unique visual show for every performance."
techStack: ["TouchDesigner", "Resolume", "MaxMSP", "NDI", "disguise"]
disciplines: ['interactivity', 'videomapping']
idea: "Each headliner's set needed a visually distinct identity without the logistical nightmare of shipping unique pre-rendered content for each act. The constraint: visual content must respond in real-time to whatever the DJ plays — there are no rehearsals, no predetermined set lists."
experience: "The main-stage visual system for one of LatAm's largest electronic music festivals, featuring 18 international headliners across a 4-day run. The installation spanned a 40-meter-wide, 12-meter-tall LED wall plus a secondary projection mapping layer. Visual-to-audio sync latency: 32ms (human perception threshold: 100ms)."
technology: "Audio analysis pipeline tapping directly into front-of-house mix (split into 8 frequency bands), processes spectral features (centroid, rolloff, flux) in MaxMSP, forwards OSC messages to TouchDesigner. 14 distinct visual 'moods' pre-selectable via custom OSC controller. Graceful degradation if any layer fails."
process: "Built audio analysis pipeline with 8-band frequency split. Developed MaxMSP spectral feature processing. Created TouchDesigner generative system with 14 visual moods. Implemented graceful degradation for live event reliability. Crew of 4 ran entire show without overtime."
venue: "Main Stage, International Music Festival"
scope: "AUDIO-REACTIVE LED · PROJECTION MAPPING · REAL-TIME GENERATIVE VISUALS"
---

# Sonic Bloom — Audio-Reactive Stage Installation

The main-stage visual system for one of LatAm's largest electronic music festivals, featuring 18 international headliners across a 4-day run. The installation spanned a 40-meter-wide, 12-meter-tall LED wall plus a secondary projection mapping layer on the architectural facade behind the stage.

## The Brief

The festival wanted each headliner's set to have a visually distinct identity without the logistical nightmare of shipping unique pre-rendered content for each act. The constraint: visual content must respond in real-time to whatever the DJ plays — there are no rehearsals, no predetermined set lists.

## The Solution

We built an audio analysis pipeline that taps directly into the front-of-house mix (split into 8 frequency bands), processes spectral features (centroid, rolloff, flux) in MaxMSP, and forwards OSC messages to TouchDesigner where the parameters drive a layered generative system. Each layer is independently reactive: low frequencies pump a volumetric fog simulation, mids sculpt a fluid dynamics shader, highs trigger a particle burst system.

The generative system includes 14 distinct visual "moods" (calm, chaotic, hypnotic, aggressive, etc.) that the lighting designer can pre-select via a custom OSC controller. The system gracefully degrades if any one layer fails (e.g., MIDI drops out, projector fails) — a hard requirement for live events where 30,000 people are watching.

## The Impact

- 18 unique visual shows across 4 days, no two alike
- Visual-to-audio sync latency: 32ms (human perception threshold: 100ms)
- Festival attendance up 22% YoY, attributed partly to viral visual content
- 47M+ organic TikTok views of crowd-filmed footage
- Featured in DJ Mag "Best Visual Productions 2025"
- Crew of 4 ran the entire show without overtime incidents