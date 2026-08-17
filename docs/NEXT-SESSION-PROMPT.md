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
- docs/phase-5.6-report.md (latest phase completion)
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

**Phase 5.6 Complete** - Theme System delivered:
- ✅ CSS Variable-based theme system architecture
- ✅ 8 themes available: cinematic-dark (default), minimal-mono, neo-brutalist, glassmorphism, gradient-frosted-glass, gradient-sunset-glass, gradient-aurora-glass, gradient-neon-glass
- ✅ Real CSS gradients (linear-gradient, radial-gradient) via `--color-bg-gradient` variable
- ✅ Single-file theme switching (change one import line in global.css)
- ✅ Complete theme system documentation
- ✅ Zero breaking changes to existing components

**Active Phase:** Phase 5.6 (Theme System)
- From Phase 5.5: Lucide icon bundle optimized (928KB → 6.82KB)
- From Phase 5.5: GSAP ScrollTrigger animations
- From Phase 5.5: Three.js showcase with model placeholder and orbiting particles
- From Phase 5.5: Contact form with Cloudflare Worker + Turnstile
- From Phase 5.5: Service card video hover previews
- From Phase 5.5: Plausible analytics integration
- From Phase 5.5: Performance optimized (Lighthouse 90+)
- From Phase 5.5: Custom domain documentation
- From Phase 5.5: Cinematic hero (pure video, no WebGL overlay)
- From Phase 5.5: Dedicated WebGL showcase section

**Next:** Phase 6 specification needed (content production, SEO, i18n)

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

**Last Updated:** 2026-08-17
