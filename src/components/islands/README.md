# Islands — Interactive React Components

This directory contains React-powered interactive components that require client-side hydration.

## Usage Rules

- Only use React components here that require state, event listeners, or WebGL.
- Use appropriate hydration directives: `client:visible`, `client:idle`, or `client:only="react"`.
- Never use `client:load` unless absolutely critical for above-the-fold interactivity.
- Always wrap in Error Boundaries to prevent full-page crashes.

## Examples

- Video player controls
- Portfolio modal
- Contact form
- WebGL canvas
- Interactive blueprint

## File Naming

Use PascalCase for component files: `VideoPlayer.tsx`, `PortfolioModal.tsx`
