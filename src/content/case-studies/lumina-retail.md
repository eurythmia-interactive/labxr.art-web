---
title: "Lumina Retail AR"
client: "Luxury Fashion House"
category: "Mobile Experience"
pubDate: 2024-11-05
year: 2024
coverImage: "https://placehold.co/1200x800/1a1a1a/ffbe0b?text=Lumina+AR"
description: "An augmented reality try-on experience for high-end accessories. Using advanced WebAR and LiDAR scanning on iOS, customers can visualize handbags and jewelry in their actual physical space with accurate scale, lighting, and occlusion."
techStack: ["WebXR", "Three.js", "LiDAR", "Apple ARKit", "8th Wall"]
disciplines: ['xr', 'products', 'ux-design']
idea: "The brand's flagship product is a handbag retailing at $4,800 USD. The conversion rate from website to purchase was 1.2%, well below industry benchmark (2.8%). The hypothesis: customers can't visualize scale and styling in their own context, so they hesitate."
experience: "A premium AR experience built natively into the brand's existing e-commerce site via a progressive web app. Customers place life-size handbags and jewelry in their own space with sub-centimeter accuracy, accurate lighting estimation, and real-world occlusion. Conversion rate on product pages with AR: 3.7% (vs. 1.2% baseline)."
technology: "WebAR pipeline using 8th Wall's SLAM engine with LiDAR depth fusion for supported iOS devices (iPhone Pro / iPad Pro 2020+). ARKit's environment probe API captures ambient HDR cubemap for accurate lighting estimation. Custom shader work for occlusion (4ms budget per frame)."
process: "Built WebAR pipeline with 8th Wall SLAM + LiDAR depth fusion. Implemented ARKit environment probe API for HDR cubemap capture. Developed custom occlusion shaders with depth buffer comparison. Entire pipeline runs in browser — no app download, no QR code."
venue: "Global (Mobile Web)"
scope: "WEBAR TRY-ON · LIDAR DEPTH FUSION · REAL-WORLD OCCLUSION"
---

# Lumina — AR Try-On for Luxury Accessories

A premium AR experience for a luxury fashion house launching their SS25 collection. Built natively into the brand's existing e-commerce site via a progressive web app, the experience lets customers place life-size handbags and jewelry in their own space with sub-centimeter accuracy, accurate lighting estimation, and real-world occlusion.

## The Brief

The brand's flagship product is a handbag retailing at $4,800 USD. The conversion rate from website to purchase was 1.2%, well below industry benchmark (2.8%). The hypothesis: customers can't visualize scale and styling in their own context, so they hesitate. Our job was to make "try it in your space" feel as natural as taking a photo.

## The Solution

We built a WebAR pipeline using 8th Wall's SLAM engine with LiDAR depth fusion for supported iOS devices (iPhone Pro / iPad Pro 2020+). The pipeline runs entirely in the browser — no app download, no QR code scan-and-jump, just a tap-to-try button in the product page.

For accurate lighting estimation, we use ARKit's environment probe API to capture the ambient HDR cubemap of the user's space, then apply it as image-based lighting to the 3D model. This makes the virtual handbag pick up real-world reflections from windows, lamps, and skin tones in the customer's actual room — a level of fidelity that previous WebAR demos had conspicuously lacked.

The trickiest part was occlusion: when the customer's hand or body crosses the virtual bag, we use depth buffer comparison to render the hand on top. This is a 4ms budget per frame and required custom shader work.

## The Impact

- Conversion rate on product pages with AR: 3.7% (vs. 1.2% baseline)
- Average AR session duration: 2 min 18 sec
- Return rate dropped 22% for customers who used AR before purchase
- Featured in Vogue Business "10 Innovations Reshaping Luxury Retail"
- Won Gold at Webby Awards 2025 (Best Shopping Experience)
- 38% of AR sessions resulted in social shares with branded watermark