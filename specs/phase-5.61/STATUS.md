# Phase 5.61 — Task Status Tracker

**Phase:** Phase 5.61 — Multi-Page Routing & Runtime Theme Switcher  
**Created:** 2026-08-17  
**Last Updated:** 2026-08-17

---

## Task Status Table

| Task | Name | Status | Started | Completed | Notes |
|------|------|--------|---------|-----------|-------|
| 0.1 | Housekeeping (commit & push pending) | ⏳ IN PROGRESS | 2026-08-17 | — | Move specs, archive chat context |
| 1.1 | Refactor theme files (`:root` → `html.theme-*`) | ⬜ NOT_STARTED | — | — | All 8 themes |
| 1.2 | Update BaseLayout + global.css | ⬜ NOT_STARTED | — | — | FOUC script, html class |
| 1.3 | Create theme-switcher React island | ⬜ NOT_STARTED | — | — | `client:idle`, localStorage |
| 1.4 | Add ThemeSwitcher to desktop navigation | ⬜ NOT_STARTED | — | — | Header, right side |
| 1.5 | Add compact ThemeSwitcher to MobileMenu | ⬜ NOT_STARTED | — | — | Proper React child |
| 2.1 | Add disciplines field to content schemas | ⬜ NOT_STARTED | — | — | caseStudies + services |
| 2.2 | Tag existing content with disciplines | ⬜ NOT_STARTED | — | — | 4 markdown files |
| 2.3 | Create discipline-hero.astro section | ⬜ NOT_STARTED | — | — | Reusable |
| 2.4 | Refactor portfolio + services to accept filtered data | ⬜ NOT_STARTED | — | — | Optional data prop |
| 2.5 | Create discipline/[slug].astro dynamic route | ⬜ NOT_STARTED | — | — | 7 slugs |
| 2.6 | Add Work dropdown to navigation | ⬜ NOT_STARTED | — | — | Astro-native `<details>` |
| 3.1 | Validation: `npm run check` + `build` | � NOT_STARTED | — | — | 12 pages |
| 3.2 | Manual visual test | ⬜ NOT_STARTED | — | — | Themes, glassmorphism, mobile |
| 3.3 | Update all documentation | ⬜ NOT_STARTED | — | — | 8 doc files |
| 3.4 | Generate phase-5.61-report.md | ⬜ NOT_STARTED | — | — | Mirrors Phase 5.6 |
| 3.5 | Final commit + push | ⬜ NOT_STARTED | — | — | `feat: Phase 5.61` |

---

## Status Legend

- `NOT_STARTED` — Task has not begun
- `IN_PROGRESS` — Task is currently being worked on
- `DONE` — Task is complete and validated
- `BLOCKED` — Task cannot proceed due to dependency or external factor

---

## Completion Summary

**Total Tasks:** 16  
**Completed:** 0  
**In Progress:** 1  
**Not Started:** 15  
**Blocked:** 0

**Progress:** 0%

---

## Architecture Decisions

- **D014:** Allow runtime theme switching via `html.theme-*` class-based scoping. All 8 themes loaded in BaseLayout. FOUC prevention via inline `<script is:inline>` reading localStorage before paint.

---

## Dependencies

- Task 0.1 must complete before all others (clean baseline)
- Task 1.1 must complete before 1.2 (theme refactor)
- Task 1.2 must complete before 1.3 (FOUC script + html class)
- Task 1.3 must complete before 1.4 and 1.5 (island creation)
- Task 2.1 must complete before 2.2 (schema first)
- Task 2.4 must complete before 2.5 (sections accept filtered data)
- Task 3.1 must run last among code tasks
- Task 3.3 and 3.4 can run after 3.1
- Task 3.5 runs last

---

**Last Updated:** 2026-08-17  
**Next Task:** Task 0.1 (housekeeping) → Task 1.1 (theme refactor)
