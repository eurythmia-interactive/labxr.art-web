# Phase 2 — Design System, UI Primitives, Global State, and Base Layout

## Phase Overview

**Phase Name:** Phase 2 — Design System, UI Primitives, Global State, and Base Layout  
**Duration:** Estimated 2-3 weeks  
**Dependencies:** Phase 1 complete  
**Next Phase:** Phase 3 — Hero Section and Manifesto

---

## 1. Phase Objectives

Establish the visual language and foundational UI architecture so that future phases (Hero, Portfolio, Services) can be assembled rapidly using pre-built, accessible, and perfectly styled blocks.

### Primary Goals

1. **Design System** — Create a cohesive visual language with dark cinematic theme
2. **Typography** — Establish type scale and font hierarchy
3. **Component Library** — Initialize shadcn/ui with custom theme
4. **Global State** — Implement state management strategy
5. **Device Detection** — Create utilities for responsive behavior
6. **Accessibility** — Ensure WCAG AA compliance foundation
7. **Reduced Motion** — Implement motion preference system

### Success Criteria

- [ ] Design tokens defined (colors, spacing, typography)
- [ ] Dark cinematic theme implemented
- [ ] shadcn/ui components customized
- [ ] Global state management working
- [ ] Device detection utilities functional
- [ ] Reduced motion system operational
- [ ] All components accessible (WCAG AA)
- [ ] Documentation complete

---

## 2. Non-Goals

- Do not build final UI sections (hero, portfolio, etc.)
- Do not implement Three.js or WebGL
- Do not add GSAP animations
- Do not create marketing pages
- Do not set up Cloudflare R2 (Phase 3+)
- Do not implement contact form (Phase 5)

---

## 3. Task Breakdown

### Task 2.0 — Phase 2 Specification and Tracking

**Objective:** Create Phase 2 tracking system

**Deliverables:**

- `specs/phase-2/00-phase-overview.md`
- `specs/phase-2/STATUS.md`

**Definition of Done:**

- All Phase 2 tasks listed
- Status tracking initialized
- No implementation yet

---

### Task 2.1 — Design Token System

**Objective:** Define design tokens as CSS variables

**Deliverables:**

- `src/styles/tokens.css` — CSS custom properties
- `src/styles/global.css` — Global styles import

**Design Tokens:**

```css
:root {
  /* Colors - Dark Cinematic Theme */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #2a2a2a;

  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-text-tertiary: #606060;

  --color-accent-primary: #00d4ff;
  --color-accent-secondary: #ff006e;
  --color-accent-tertiary: #ffbe0b;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;

  /* Borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);

  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
}
```

**Definition of Done:**

- All tokens defined
- Tokens imported in global.css
- Tokens accessible in Tailwind config

---

### Task 2.2 — Tailwind Theme Extension

**Objective:** Extend Tailwind config with design tokens

**Deliverables:**

- Updated `tailwind.config.mjs`

**Configuration:**

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          tertiary: 'var(--color-accent-tertiary)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
};
```

**Definition of Done:**

- Tailwind config extended
- All tokens accessible via utility classes
- Build passes without errors

---

### Task 2.3 — Typography System

**Objective:** Establish typography scale and font loading

**Deliverables:**

- `src/components/shared/heading.astro` — Heading component
- `src/components/shared/text.astro` — Text component
- Font loading strategy (Google Fonts or self-hosted)

**Typography Scale:**

| Level   | Size            | Weight | Line Height | Usage             |
| ------- | --------------- | ------ | ----------- | ----------------- |
| h1      | 3rem (48px)     | 700    | 1.2         | Page titles       |
| h2      | 2.25rem (36px)  | 700    | 1.3         | Section titles    |
| h3      | 1.875rem (30px) | 600    | 1.4         | Subsection titles |
| h4      | 1.5rem (24px)   | 600    | 1.4         | Card titles       |
| h5      | 1.25rem (20px)  | 600    | 1.5         | Small titles      |
| h6      | 1.125rem (18px) | 600    | 1.5         | Minor titles      |
| body-lg | 1.125rem (18px) | 400    | 1.6         | Lead text         |
| body    | 1rem (16px)     | 400    | 1.6         | Body text         |
| body-sm | 0.875rem (14px) | 400    | 1.5         | Small text        |
| caption | 0.75rem (12px)  | 400    | 1.4         | Captions          |

**Definition of Done:**

- Typography scale defined
- Heading component created
- Text component created
- Font loading optimized (preload, font-display: swap)

---

### Task 2.4 — shadcn/ui Initialization

**Objective:** Set up shadcn/ui with custom theme

**Deliverables:**

- shadcn/ui configuration
- Base components installed (button, input, dialog, form)
- Custom theme applied

**Installation:**

```bash
npx shadcn@latest init
```

**Configuration:**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.mjs",
    "css": "src/styles/global.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@components",
    "utils": "@lib/utils",
    "ui": "@components/ui",
    "lib": "@lib",
    "hooks": "@lib/hooks"
  }
}
```

**Components to Install:**

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add label
npx shadcn@latest add card
```

**Custom Theme:**

Update `src/components/ui/*.tsx` to use design tokens:

```tsx
// Example: button.tsx
className={cn(
  "bg-accent-primary text-text-primary hover:bg-accent-primary/90",
  className
)}
```

**Definition of Done:**

- shadcn/ui initialized
- Base components installed
- Custom theme applied
- Components use design tokens
- Build passes

---

### Task 2.5 — Global State Management

**Objective:** Implement state management strategy

**Deliverables:**

- `src/lib/store.ts` — State store
- `src/lib/hooks/use-store.ts` — Store hooks
- Documentation

**Strategy:** Nano Stores (lightweight, framework-agnostic)

**Installation:**

```bash
npm install nanostores @nanostores/react
```

**Store Structure:**

```typescript
// src/lib/store.ts
import { atom, computed } from 'nanostores';

// Device state
export const $deviceType = atom<'mobile' | 'tablet' | 'desktop'>('desktop');
export const $isMobile = computed($deviceType, (type) => type === 'mobile');

// Motion preferences
export const $reducedMotion = atom<boolean>(false);

// UI state
export const $isMenuOpen = atom<boolean>(false);
export const $activeModal = atom<string | null>(null);

// Theme state (future)
export const $theme = atom<'dark' | 'light'>('dark');
```

**Hooks:**

```typescript
// src/lib/hooks/use-store.ts
import { useStore } from '@nanostores/react';

export { useStore };
```

**Definition of Done:**

- Nano Stores installed
- Base stores created
- Hooks implemented
- Documentation written

---

### Task 2.6 — Device Detection System

**Objective:** Create device detection utilities

**Deliverables:**

- `src/lib/device.ts` — Device detection utilities
- `src/components/islands/device-detector.tsx` — Client-side detector

**Implementation:**

```typescript
// src/lib/device.ts
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
```

**Client-Side Detector:**

```tsx
// src/components/islands/device-detector.tsx
import { useEffect } from 'react';
import { $deviceType } from '@lib/store';
import { getDeviceType } from '@lib/device';

export function DeviceDetector() {
  useEffect(() => {
    const updateDevice = () => {
      $deviceType.set(getDeviceType());
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return null;
}
```

**Definition of Done:**

- Device detection utilities created
- Client-side detector implemented
- Store updates on resize
- Mobile-first approach validated

---

### Task 2.7 — Reduced Motion System

**Objective:** Implement motion preference system

**Deliverables:**

- `src/lib/motion.ts` — Motion utilities
- `src/components/islands/motion-detector.tsx` — Preference detector
- Animation wrapper component

**Implementation:**

```typescript
// src/lib/motion.ts
export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getAnimationDuration(base: number): number {
  const reduced = getReducedMotionPreference();
  return reduced ? 0 : base;
}
```

**Detector:**

```tsx
// src/components/islands/motion-detector.tsx
import { useEffect } from 'react';
import { $reducedMotion } from '@lib/store';
import { getReducedMotionPreference } from '@lib/motion';

export function MotionDetector() {
  useEffect(() => {
    const updateMotion = () => {
      $reducedMotion.set(getReducedMotionPreference());
    };

    updateMotion();
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, []);

  return null;
}
```

**Animation Wrapper:**

```tsx
// src/components/shared/animated.tsx
import { useStore } from '@nanostores/react';
import { $reducedMotion } from '@lib/store';

interface AnimatedProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export function Animated({ children, duration = 300, className }: AnimatedProps) {
  const reducedMotion = useStore($reducedMotion);
  const actualDuration = reducedMotion ? 0 : duration;

  return (
    <div className={className} style={{ transition: `all ${actualDuration}ms ease-in-out` }}>
      {children}
    </div>
  );
}
```

**Definition of Done:**

- Motion preference detection working
- Store updates on preference change
- Animation wrapper respects preferences
- Tested with OS-level reduced motion

---

### Task 2.8 — Reusable Layout Components

**Objective:** Create layout primitives

**Deliverables:**

- `src/components/shared/container.astro` — Container component
- `src/components/shared/section.astro` — Section wrapper
- `src/components/shared/grid.astro` — Grid system

**Container:**

```astro
---
// src/components/shared/container.astro
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const { size = 'md', className = '' } = Astro.props;

const sizes = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};
---

<div class={`mx-auto px-4 ${sizes[size]} ${className}`}>
  <slot />
</div>
```

**Section:**

```astro
---
// src/components/shared/section.astro
interface Props {
  id?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const { id, className = '', padding = 'lg' } = Astro.props;

const paddings = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};
---

<section id={id} class={`${paddings[padding]} ${className}`}>
  <slot />
</section>
```

**Definition of Done:**

- Container component created
- Section wrapper created
- Grid system created
- All components responsive
- Documentation written

---

### Task 2.9 — Accessibility Foundation

**Objective:** Ensure WCAG AA compliance

**Deliverables:**

- Skip navigation component
- Focus management utilities
- ARIA helper functions
- Accessibility documentation

**Skip Navigation:**

```astro
---
// src/components/shared/skip-nav.astro
---

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent-primary focus:text-text-primary focus:px-4 focus:py-2 focus:rounded"
>
  Skip to main content
</a>
```

**Focus Management:**

```typescript
// src/lib/focus.ts
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}
```

**Definition of Done:**

- Skip navigation implemented
- Focus trap utility created
- ARIA helpers documented
- Accessibility checklist created

---

### Task 2.10 — Design System Documentation

**Objective:** Document the design system

**Deliverables:**

- `docs/design-system.md` — Complete design system guide
- Component documentation
- Usage examples

**Documentation Structure:**

1. **Design Tokens**
   - Colors
   - Typography
   - Spacing
   - Shadows
   - Transitions

2. **Components**
   - Shared components
   - UI components (shadcn)
   - Islands (interactive)

3. **Patterns**
   - Layout patterns
   - Responsive patterns
   - Motion patterns
   - Accessibility patterns

4. **Guidelines**
   - Color usage
   - Typography usage
   - Spacing usage
   - Motion usage

**Definition of Done:**

- Design system documented
- All components documented
- Usage examples provided
- Guidelines clear

---

### Task 2.11 — Phase 2 Validation

**Objective:** Validate Phase 2 completion

**Deliverables:**

- `docs/phase-2-report.md` — Phase 2 validation report
- Updated `specs/phase-2/STATUS.md`

**Validation Checklist:**

- [ ] Design tokens defined and accessible
- [ ] Tailwind theme extended
- [ ] Typography system working
- [ ] shadcn/ui components customized
- [ ] Global state management functional
- [ ] Device detection working
- [ ] Reduced motion system operational
- [ ] Layout components created
- [ ] Accessibility foundation in place
- [ ] Documentation complete
- [ ] Build passes without errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] WCAG AA compliant

**Definition of Done:**

- All validation checks pass
- Report generated
- Status updated
- Ready for Phase 3

---

## 4. Dependencies

### Required Packages

```bash
# State management
npm install nanostores @nanostores/react

# shadcn/ui (will be installed via CLI)
npx shadcn@latest init
npx shadcn@latest add button input dialog form label card
```

### Optional Packages

```bash
# Additional utilities (if needed)
npm install clsx tailwind-merge  # for cn() utility
```

---

## 5. File Structure

```
src/
├── components/
│   ├── islands/
│   │   ├── device-detector.tsx
│   │   └── motion-detector.tsx
│   ├── sections/
│   │   └── (empty for now)
│   ├── shared/
│   │   ├── animated.tsx
│   │   ├── container.astro
│   │   ├── grid.astro
│   │   ├── heading.astro
│   │   ├── section.astro
│   │   ├── skip-nav.astro
│   │   └── text.astro
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   ├── device.ts
│   ├── focus.ts
│   ├── hooks/
│   │   └── use-store.ts
│   ├── motion.ts
│   ├── store.ts
│   └── utils.ts
└── styles/
    ├── global.css
    └── tokens.css
```

---

## 6. Testing Strategy

### Manual Testing

- [ ] Design tokens accessible in all components
- [ ] Dark theme renders correctly
- [ ] Typography scale consistent
- [ ] shadcn components customized
- [ ] Device detection works on resize
- [ ] Reduced motion respects OS preference
- [ ] Layout components responsive
- [ ] Skip navigation functional
- [ ] Focus trap working in modals
- [ ] No console errors

### Automated Testing

- Build passes (`npm run build`)
- Type check passes (`npm run check`)
- Lint passes (`npm run lint`)
- Format check passes (`npm run format:check`)

---

## 7. Performance Budgets

| Metric                   | Target  |
| ------------------------ | ------- |
| Initial CSS bundle       | < 50KB  |
| Initial JS bundle        | < 100KB |
| First Contentful Paint   | < 1.5s  |
| Largest Contentful Paint | < 2.5s  |
| Cumulative Layout Shift  | < 0.1   |

---

## 8. Risks and Mitigations

| Risk                           | Impact              | Mitigation                      |
| ------------------------------ | ------------------- | ------------------------------- |
| shadcn/ui conflicts with Astro | Build errors        | Test integration early          |
| Nano Stores complexity         | Over-engineering    | Keep stores minimal             |
| Font loading performance       | Slow FCP            | Use font-display: swap, preload |
| Reduced motion not working     | Accessibility issue | Test with OS preferences        |
| Design token inconsistencies   | Visual bugs         | Document tokens clearly         |

---

## 9. Phase 2 Definition of Done

Phase 2 is complete when:

- [ ] All 11 tasks completed
- [ ] Design system fully implemented
- [ ] Global state management working
- [ ] All components accessible
- [ ] Documentation complete
- [ ] Build passes without errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Phase 2 report generated
- [ ] Ready for Phase 3

---

## 10. Next Phase Preview

**Phase 3 — Hero Section and Manifesto**

Phase 3 will focus on:

- Hero section with interactive background
- Manifesto section
- Navigation header
- Footer
- Basic animations (CSS transitions)
- Video poster optimization
- Cloudflare R2 setup for media assets

---

**Phase 2 created:** 2026-08-11  
**Estimated duration:** 2-3 weeks  
**Ready to start:** After Phase 1 review
