---
title: "Velvet & Steel"
client: "Artisan Jewelry Brand"
category: "E-commerce"
pubDate: 2024-10-02
year: 2024
coverImage: "https://placehold.co/1200x800/1a1a1a/ec4899?text=Velvet+Steel"
description: "A cinematic e-commerce experience focusing on macro-photography and micro-interactions. The site features smooth scroll-triggered reveals, 3D product spinners, and a bespoke checkout flow that increased conversion rates by 34%."
techStack: ["GSAP", "Three.js", "Lenis", "Stripe", "Astro"]
disciplines: ['ux-design', 'products', 'dev']
---

# Velvet & Steel — Cinematic E-commerce

A complete digital flagship for an artisan jewelry brand specializing in hand-forged steel pieces set with ethically sourced gemstones. The site functions simultaneously as a brand showcase and a high-conversion storefront, with an unusually heavy emphasis on macro-photography and slow, deliberate scroll storytelling.

## The Brief

The brand's pieces are intricate, hand-finished objects meant to be examined up close. Standard e-commerce templates — small thumbnails, product detail pages with bullet points, generic stock photography — weren't doing them justice. They needed a site where every interaction rewarded slowing down. Bonus: the existing site converted at 1.8%; they wanted 2.5%+.

## The Solution

We shot 14 days of macro product photography and videography (4K, 60fps, focus-stacked), capturing every facet of every piece. The site uses Lenis for buttery scroll smoothing and GSAP ScrollTrigger for orchestrated reveals: as a product image enters the viewport, it crossfades through 3 macro angles, then reveals a 3D-rotatable model rendered with Three.js. Every micro-interaction is tuned for ~250ms response — fast enough to feel responsive, slow enough to feel considered.

The checkout flow was rebuilt from scratch as a single-page progressive form, using Stripe Elements for PCI compliance and a custom state machine to handle the brand's unusual requirements (engraving, gift wrapping, custom sizing). We use Astro for the static pages with React islands only for the cart and checkout — most of the site ships zero JS to the browser.

## The Impact

- Conversion rate: 2.42% (up from 1.8% baseline, +34% lift)
- Average order value: up 18% (driven by engraving upgrades + gift wrap)
- Cart abandonment dropped from 71% to 54%
- Time-on-site for product pages: 4 min 32 sec (up from 1 min 18 sec)
- Featured in Awwwards, FWA, and CSS Design Awards 2025
- Site ships only 32KB of JS (excluding islands) for the entire PDP journey