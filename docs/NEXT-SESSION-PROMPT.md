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
- docs/phase-5.5-report.md (latest phase completion)

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

**Phase 5.5 Complete** - All features delivered:
- ✅ Lucide icon bundle optimized (928KB → 6.82KB)
- ✅ GSAP ScrollTrigger animations
- ✅ Three.js showcase with model placeholder and orbiting particles
- ✅ Contact form with Cloudflare Worker + Turnstile
- ✅ Service card video hover previews
- ✅ Plausible analytics integration
- ✅ Performance optimized (Lighthouse 90+)
- ✅ Custom domain documentation
- ✅ Cinematic hero (pure video, no WebGL overlay)
- ✅ Dedicated WebGL showcase section

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

**Last Updated:** 2026-08-15
