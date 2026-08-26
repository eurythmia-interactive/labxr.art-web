# LabXR.art - Session Context Prompt

Use this prompt when starting a new session to provide context about the LabXR.art project.

---

## Quick Start Prompt

Copy and paste this into a new session:

```
Read these documents to understand the LabXR.art project:
- AGENTS.md (project rules and constraints)
- CONTEXT.md (current state and architecture)
- docs/PROJECT-STATUS.md (phase completion status)
- docs/phase-6.0-report.md (latest phase completion)
- src/styles/themes/README.md (if working with themes)

Wait for my instructions before taking any action.
```

---

## What This Does

When you start a new opencode session in this directory:
- **AGENTS.md** is automatically read (it's in the project root)
- The Session Start Protocol in AGENTS.md instructs the AI to read CONTEXT.md, PROJECT-STATUS.md, and the latest phase report
- The AI will wait for your instructions before taking action

If you're starting a session in a different directory or need to manually provide context, use the prompt above.

---

## Current Project State

**Lab Terminal Redesign Complete (Phases 6.1-6.9):**
- ✅ Lab Terminal theme with HUD aesthetic (obsidian base, laser cyan/phosphor green accents)
- ✅ HUD navigation with live clock, coordinates, 4-pillar nav, mobile tactical overlay
- ✅ Video background hero with autoplay, muted, loop
- ✅ 4 new pages: /projects, /what-we-do, /about, /contact
- ✅ Enhanced case study viewer with 4-section blueprint (idea, experience, technology, process)
- ✅ Custom cursor system with 5 states (default, hover, text, drag, crosshair)
- ✅ View Transitions API for smooth page transitions
- ✅ Smart sticky header with scroll detection
- ✅ Glitch text effect and registration crosshairs
- ✅ Total pages: 16 (5 base + 7 discipline + 4 new routes)

**Post-Redesign Bug Fixes (2026-08-19):**
- ✅ Hero: Replaced WebGL with video background for better performance
- ✅ Modal sizing: Fixed overflow with max-h-[85vh], sticky header pattern
- ✅ Modal UX: Close button always visible, scrollable content area
- ✅ Service cards: Fixed hover video autoplay
- ✅ Case study cards: Fixed click-to-open modal functionality

**Previous Phases:**
- Phase 6.0: Fictional Content Population (10 case studies, 7 services, 6 team members)
- Phase 5.5: Cinematic Hero & WebGL Showcase
- Phase 5.6: CSS Variable Theme System (8 themes)
- Phase 5.61: Multi-Page Routing & Runtime Theme Switcher

**Next:** Awaiting user instructions for future enhancements (real assets, SEO, i18n, etc.)

---

## Key Constraints

- React 18.3.1 (NOT React 19)
- TypeScript strict mode
- Mobile-first design
- No secrets in Git
- Conventional commits

---

## After Session Work

When completing work in a session:
1. Update `CONTEXT.md` with session log entry
2. Update `docs/PROJECT-STATUS.md` with current state
3. Generate phase report if completing a phase
4. Commit and push changes

---

**Last Updated:** 2026-08-19 (Lab Terminal Redesign complete, bug fixes applied)
