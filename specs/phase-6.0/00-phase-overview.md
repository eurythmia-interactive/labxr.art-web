Here is a comprehensive, task-by-task plan designed for OpenCode to populate your site with rich, fictional content. 

Since you will provide AI-generated images and videos in a future phase, this plan uses **high-quality placeholder image URLs** (via `placehold.co`) and **placeholder video URLs** so the UI looks complete and professional right now.

---

# Phase 6.1: Fictional Content Population Plan

## The Fictional Universe Brief (Context for OpenCode)
**LabXR.art** is positioning itself as the "secret technical arm" for top-tier LatAm ad agencies. The fictional projects should reflect high-end, award-winning work for major global and regional brands (telecom, automotive, fashion, museums, music festivals). The tone should be technical, cinematic, and premium.

---

## TASK 1: Create Fictional Case Studies (Portfolio)

**Objective:** Create 8 rich, fictional case studies that cover all 7 disciplines, ensuring every discipline page has at least 2 projects.

**Prompt for OpenCode:**
```text
We need to populate the portfolio with 8 fictional case studies. Create the following Markdown files in `src/content/case-studies/`. 

Use `https://placehold.co/1200x800/1a1a1a/00d4ff?text=Project+Name` for the `coverImage` and `gallery` images for now.

File 1: `neon-nexus.md`
---
title: "Neon Nexus"
client: "Global Telecom Brand"
year: "2025"
disciplines: ['xr', 'interactivity']
coverImage: "https://placehold.co/1200x800/1a1a1a/00d4ff?text=Neon+Nexus"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/00d4ff?text=Neon+Nexus+1"
  - "https://placehold.co/1200x800/1a1a1a/00d4ff?text=Neon+Nexus+2"
---
An immersive, multi-sensory brand activation blending real-time motion capture with volumetric lighting. Visitors stepped into a neon-lit digital realm where their movements generated cascading particle effects, translating physical energy into a living, breathing digital artwork.

File 2: `echoes-maya.md`
---
title: "Echoes of the Maya"
client: "National Museum of Anthropology"
year: "2024"
disciplines: ['museography', 'videomapping']
coverImage: "https://placehold.co/1200x800/1a1a1a/ff006e?text=Echoes+Maya"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/ff006e?text=Echoes+1"
---
A 360-degree projection mapping experience transforming the museum's central courtyard. We mapped 4K laser projectors onto ancient stone textures, bringing pre-Hispanic mythology to life through synchronized audio-reactive visuals and spatial sound design.

File 3: `aeroflow.md`
---
title: "AeroFlow Configurator"
client: "Premium Automotive Group"
year: "2025"
disciplines: ['dev', 'products', 'ux-design']
coverImage: "https://placehold.co/1200x800/1a1a1a/00ff88?text=AeroFlow"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/00ff88?text=AeroFlow+1"
---
A WebGL-powered 3D car configurator running at 60fps in the browser. Users can customize paint, rims, and interior materials in real-time with physically-based rendering (PBR), complete with dynamic environment lighting and seamless transition animations.

File 4: `lumina-retail.md`
---
title: "Lumina Retail AR"
client: "Luxury Fashion House"
year: "2024"
disciplines: ['xr', 'products', 'ux-design']
coverImage: "https://placehold.co/1200x800/1a1a1a/ffbe0b?text=Lumina+AR"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/ffbe0b?text=Lumina+1"
---
An augmented reality try-on experience for high-end accessories. Using advanced WebAR and LiDAR scanning on iOS, customers can visualize handbags and jewelry in their actual physical space with accurate scale, lighting, and occlusion.

File 5: `sonic-bloom.md`
---
title: "Sonic Bloom"
client: "International Music Festival"
year: "2025"
disciplines: ['interactivity', 'videomapping']
coverImage: "https://placehold.co/1200x800/1a1a1a/a855f7?text=Sonic+Bloom"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/a855f7?text=Sonic+1"
---
A massive audio-reactive LED and projection installation at the festival's main stage. The system ingests live audio feeds from the DJ booth, processing frequencies in real-time to drive generative visual algorithms, creating a unique visual show for every performance.

File 6: `terra-verde.md`
---
title: "Terra Verde Exhibit"
client: "Environmental NGO"
year: "2024"
disciplines: ['museography', 'xr', 'interactivity']
coverImage: "https://placehold.co/1200x800/1a1a1a/10b981?text=Terra+Verde"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/10b981?text=Terra+1"
---
An interactive digital exhibit educating visitors about deforestation. Touch-sensitive capacitive surfaces trigger localized projection mapping on physical topographic models, revealing data layers about biodiversity loss and climate impact in real-time.

File 7: `pulse-cdmx.md`
---
title: "Pulse CDMX"
client: "Smart City Initiative"
year: "2025"
disciplines: ['dev', 'interactivity']
coverImage: "https://placehold.co/1200x800/1a1a1a/3b82f6?text=Pulse+CDMX"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/3b82f6?text=Pulse+1"
---
A real-time data visualization dashboard for urban mobility. We built a custom WebGL engine ingesting live API feeds from the city's transit system, rendering thousands of moving data points to visualize traffic flow and public transport efficiency.

File 8: `velvet-steel.md`
---
title: "Velvet & Steel"
client: "Artisan Jewelry Brand"
year: "2024"
disciplines: ['ux-design', 'products', 'dev']
coverImage: "https://placehold.co/1200x800/1a1a1a/ec4899?text=Velvet+Steel"
gallery:
  - "https://placehold.co/1200x800/1a1a1a/ec4899?text=Velvet+1"
---
A cinematic e-commerce experience focusing on macro-photography and micro-interactions. The site features smooth scroll-triggered reveals, 3D product spinners, and a bespoke checkout flow that increased conversion rates by 34%.
```

**Validation:**
- 8 new `.md` files exist in `src/content/case-studies/`.
- All files have valid frontmatter and `disciplines` arrays.
- Run `npm run check` to ensure no schema errors.

---

## TASK 2: Create Fictional Services

**Objective:** Create 7 comprehensive service offerings that map to the disciplines.

**Prompt for OpenCode:**
```text
Create 7 fictional service files in `src/content/services/`. 
Use `https://placehold.co/800x600/1a1a1a/00d4ff?text=Service+Name` for the `coverImage`.
For `previewVideoUrl`, use a placeholder MP4 link or leave it empty for now.

File 1: `interactive-installations.md`
---
title: "Interactive Installations"
slug: "interactive-installations"
description: "Physical spaces that respond to human presence. We blend sensors, real-time engines, and custom hardware to create unforgettable brand activations."
disciplines: ['interactivity', 'museography']
coverImage: "https://placehold.co/800x600/1a1a1a/00d4ff?text=Interactive+Installations"
---
From capacitive touch walls to LiDAR-driven particle systems, we engineer physical-digital hybrids. Our installations are built for high-traffic public spaces, featuring robust error handling, 24/7 uptime architecture, and remote monitoring capabilities.

File 2: `webgl-3d-web.md`
---
title: "WebGL & 3D Web Experiences"
slug: "webgl-3d-web"
description: "Cinematic 3D experiences running natively in the browser. No downloads, no plugins, just pure, high-performance visual storytelling."
disciplines: ['dev', 'products', 'ux-design']
coverImage: "https://placehold.co/800x600/1a1a1a/00d4ff?text=WebGL+3D"
---
We push the boundaries of what's possible in WebGL. Using Three.js, custom GLSL shaders, and physically-based rendering, we create product configurators, virtual showrooms, and immersive narrative experiences that load in seconds and run at 60fps.

File 3: `projection-mapping.md`
---
title: "Projection Mapping & Videomapping"
slug: "projection-mapping"
description: "Transforming architecture and physical objects into dynamic, living canvases through precision-aligned multi-projector setups."
disciplines: ['videomapping', 'museography']
coverImage: "https://placehold.co/800x600/1a1a1a/ff006e?text=Videomapping"
---
Our videomapping pipeline handles everything from 3D scanning and UV unwrapping of physical surfaces to real-time rendering and edge-blending across multiple 4K laser projectors. Perfect for building facades, stage design, and museum exhibits.

File 4: `extended-reality.md`
---
title: "Extended Reality (AR/VR/MR)"
slug: "extended-reality"
description: "Bridging the digital and physical worlds through Augmented, Virtual, and Mixed Reality experiences optimized for mobile and headsets."
disciplines: ['xr', 'products']
coverImage: "https://placehold.co/800x600/1a1a1a/a855f7?text=XR"
---
We build WebAR and native XR experiences that drive engagement. From virtual try-ons and spatial computing apps to immersive VR training modules, we focus on intuitive UX and seamless tracking to ensure the technology feels like magic.

File 5: `digital-museography.md`
---
title: "Digital Museography"
slug: "digital-museography"
description: "Reimagining cultural heritage through interactive digital exhibits, touchscreens, and immersive audiovisual environments."
disciplines: ['museography', 'interactivity', 'videomapping']
coverImage: "https://placehold.co/800x600/1a1a1a/10b981?text=Museography"
---
We partner with museums and cultural institutions to create exhibits that educate and inspire. Our solutions include interactive timelines, holographic displays, and responsive environments that adapt to visitor flow and engagement.

File 6: `real-time-video.md`
---
title: "Real-Time Video Systems"
slug: "real-time-video"
description: "Low-latency video processing pipelines for live events, broadcasts, and interactive installations."
disciplines: ['dev', 'interactivity']
coverImage: "https://placehold.co/800x600/1a1a1a/ffbe0b?text=Real-Time+Video"
---
Using NDI, WebRTC, and custom FFmpeg pipelines, we build systems that ingest, process, and output video with sub-frame latency. Ideal for live VJing, interactive video mirrors, and real-time compositing with virtual sets.

File 7: `creative-tech-consulting.md`
---
title: "Creative Technology Consulting"
slug: "creative-tech-consulting"
description: "Technical direction and feasibility analysis for ambitious creative campaigns. We help agencies dream bigger."
disciplines: ['ux-design', 'dev', 'xr']
coverImage: "https://placehold.co/800x600/1a1a1a/ec4899?text=Consulting"
---
Before a single line of code is written, we help you define the technical architecture. We provide hardware specs, software stack recommendations, and proof-of-concept prototypes to ensure your creative vision is technically and financially viable.
```

**Validation:**
- 7 new `.md` files exist in `src/content/services/`.
- Run `npm run check`.

---

## TASK 3: Create Fictional Team Members

**Objective:** Create 6 fictional core team members to populate the Team section.

**Prompt for OpenCode:**
```text
Create 6 fictional team member files in `src/content/team/`.
Use `https://placehold.co/400x400/1a1a1a/00d4ff?text=Initials` for the `avatar`.

File 1: `mateo-vargas.md`
---
name: "Mateo Vargas"
role: "Creative Director"
bio: "15 years bridging art and technology. Former VJ and installation artist turned technical director. Obsessed with the intersection of physical space and digital light."
avatar: "https://placehold.co/400x400/1a1a1a/00d4ff?text=MV"
---

File 2: `elena-rostova.md`
---
name: "Elena Rostova"
role: "Technical Director"
bio: "Full-stack engineer and WebGL specialist. Elena architects the complex real-time systems that power our largest installations. She speaks fluent C++, GLSL, and TypeScript."
avatar: "https://placehold.co/400x400/1a1a1a/ff006e?text=ER"
---

File 3: `diego-fuentes.md`
---
name: "Diego Fuentes"
role: "Lead Creative Developer"
bio: "The bridge between design and code. Diego ensures every micro-interaction feels buttery smooth and every GSAP timeline is perfectly synchronized with the brand's rhythm."
avatar: "https://placehold.co/400x400/1a1a1a/00ff88?text=DF"
---

File 4: `sofia-mendoza.md`
---
name: "Sofia Mendoza"
role: "3D & WebGL Artist"
bio: "Sofia builds the digital worlds we inhabit. From low-poly optimized assets to complex PBR materials, she ensures our 3D experiences look cinematic without sacrificing performance."
avatar: "https://placehold.co/400x400/1a1a1a/ffbe0b?text=SM"
---

File 5: `javier-torres.md`
---
name: "Javier Torres"
role: "UX/UI Designer"
bio: "Javier designs the invisible interfaces. He specializes in spatial UX for AR/VR and intuitive touch interfaces for public installations, ensuring technology never gets in the way of the experience."
avatar: "https://placehold.co/400x400/1a1a1a/a855f7?text=JT"
---

File 6: `camila-rojas.md`
---
name: "Camila Rojas"
role: "Executive Producer"
bio: "The glue that holds it all together. Camila manages client relationships, timelines, and budgets, ensuring our wildest creative concepts are delivered on time and on spec."
avatar: "https://placehold.co/400x400/1a1a1a/ec4899?text=CR"
---
```

**Validation:**
- 6 new `.md` files exist in `src/content/team/`.
- Run `npm run check`.

---

## TASK 4: Update Homepage to Showcase New Content Volume

**Objective:** The homepage currently renders all case studies and services. With 8 case studies, we should feature a "Selected Work" grid and perhaps highlight 3 "Featured Services".

**Prompt for OpenCode:**
```text
Update `src/pages/index.astro` to handle the new volume of content gracefully.

1. In the `<Portfolio>` section, instead of showing all 8 case studies, only show the first 6. Add a "View All Projects" button at the bottom that links to `/discipline/xr` (or a future `/work` page).
2. In the `<Services>` section, show only the first 3 services in a featured grid. Add a "View All Services" button linking to `/services` (or just hide the button for now if we don't have a dedicated services page).
3. Ensure the `<Team>` section shows all 6 members in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile).

Validation:
- Homepage loads without errors.
- Portfolio grid shows 6 items.
- Services grid shows 3 items.
- Team grid shows 6 items.
- Run `npm run build` to ensure all pages compile.
```

---

## TASK 5: Final Validation & Content Audit

**Objective:** Verify that all discipline pages are populated and look correct.

**Prompt for OpenCode:**
```text
Run a final audit of the discipline pages to ensure the new content is distributed correctly.

1. Check `/discipline/xr`: Should show Neon Nexus, Lumina Retail, Terra Verde, Extended Reality service.
2. Check `/discipline/interactivity`: Should show Neon Nexus, Sonic Bloom, Terra Verde, Pulse CDMX, Interactive Installations service, Real-Time Video service.
3. Check `/discipline/dev`: Should show AeroFlow, Pulse CDMX, WebGL 3D service, Real-Time Video service.
4. Check `/discipline/museography`: Should show Echoes of the Maya, Terra Verde, Interactive Installations service, Projection Mapping service, Digital Museography service.
5. Check `/discipline/videomapping`: Should show Echoes of the Maya, Sonic Bloom, Projection Mapping service, Digital Museography service.
6. Check `/discipline/products`: Should show AeroFlow, Lumina Retail, Velvet & Steel, WebGL 3D service, Extended Reality service.
7. Check `/discipline/ux-design`: Should show AeroFlow, Lumina Retail, Velvet & Steel, WebGL 3D service, Creative Tech Consulting service.

If any discipline page is empty, adjust the `disciplines` array in the respective Markdown files to ensure every page has at least 2 case studies and 1 service.

Validation:
- All 7 discipline pages have content.
- No "No projects available" empty states on any discipline page.
- Run `npm run check` and `npm run build`.
```

---

## Summary of What This Plan Achieves

1.  **8 High-End Case Studies:** Covers every discipline, giving the portfolio a robust, agency-level feel.
2.  **7 Comprehensive Services:** Clearly defines what LabXR does, mapping perfectly to the navigation dropdown.
3.  **6 Core Team Members:** Adds a human element to the "lab" identity.
4.  **Placeholder Media Strategy:** Uses `placehold.co` with thematic colors so the UI is fully functional and visually coherent until you provide the AI-generated assets.
5.  **Zero Breaking Changes:** Integrates seamlessly with the Phase 5.61 architecture (discipline filtering, runtime themes).

**Next Step:** Copy and paste **TASK 1** into OpenCode to begin generating the fictional case studies. Let me know if you want to adjust the project names, client types, or disciplines before starting!