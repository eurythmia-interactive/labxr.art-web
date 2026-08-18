---
title: "Pulse CDMX"
client: "Smart City Initiative"
category: "Data Visualization"
pubDate: 2025-05-14
year: 2025
coverImage: "https://placehold.co/1200x800/1a1a1a/3b82f6?text=Pulse+CDMX"
description: "A real-time data visualization dashboard for urban mobility. We built a custom WebGL engine ingesting live API feeds from the city's transit system, rendering thousands of moving data points to visualize traffic flow and public transport efficiency."
techStack: ["Three.js", "WebSockets", "GLSL", "Cloudflare Workers", "Mapbox GL"]
disciplines: ['dev', 'interactivity']
---

# Pulse CDMX — Real-Time Urban Mobility Dashboard

A permanent installation at CDMX's new Smart City command center, visualizing real-time data from the city's transit, traffic, and emergency response systems. The dashboard ingests 14 distinct data streams (Subway, Metrobus, traffic cameras, ambulances, weather, etc.) at up to 50 messages per second, rendering thousands of moving data points on a 6-meter-wide 8K display wall.

## The Brief

The CDMX government wanted a public-facing display that would make smart-city data tangible to citizens, journalists, and visiting dignitaries. The challenge wasn't data collection (the city already had the feeds) — it was making the data legible, beautiful, and honest. No greenwashing congestion as "smooth flow" just because the dashboard looked clean.

## The Solution

We built a custom WebGL engine (not Mapbox, not deck.gl — both too high-level for our needs) that handles 50,000 simultaneously-moving data points at 60fps on the command center's hardware. The visualization uses three visual layers: a base map of the city rendered as a custom cartogram (no Google Maps branding, no external dependencies), a flow layer showing traffic as animated streams along actual streets, and an alert layer that surfaces incidents.

The data pipeline runs through a Cloudflare Worker that aggregates and filters raw feeds before they hit the client. We use server-sent events (SSE) for the client connection — simpler than WebSockets, perfectly suited for one-way streaming.

The dashboard includes a "historical replay" mode where visitors can scrub through any hour of any day in the past 30 days. This turned out to be the most popular feature with journalists, who use it to fact-check official statements about traffic incidents.

## The Impact

- Permanent installation at CDMX's Smart City command center since April 2025
- Displayed during 12+ official press conferences
- 3 local newspapers built daily visualizations off the open data API
- 99.97% uptime over 6 months (Cloudflare Workers SLA exceeded)
- Open data API publishes aggregated metrics, contributing to civic tech ecosystem
- Featured in MIT Technology Review "Civic Tech 2025"