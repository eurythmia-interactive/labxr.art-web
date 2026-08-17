# LabXR.art Design System Documentation

## Overview

The LabXR.art design system provides a cohesive visual language for building cinematic, dark-themed web experiences. This document serves as the single source of truth for design tokens, components, and usage patterns.

---

## Theme System

LabXR.art uses a CSS Variable-based theme system where changing **one import line** in `src/styles/global.css` switches the entire visual design.

**Available Themes:**

| Theme | File | Style | Inspiration |
|-------|------|-------|-------------|
| Cinematic Dark (default) | `cinematic-dark.css` | Dark, cyan accent, cinematic | Default LabXR theme |
| Minimalist Monochrome | `minimal-mono.css` | Light, clean, professional | Linear, Vercel, Stripe |
| Neo-Brutalist | `neo-brutalist.css` | Bold, high-contrast, playful | Gumroad, Framer, Web3 |
| Glassmorphism | `glassmorphism.css` | Translucent, layered, glowing | Apple, modern SaaS |

**How to Switch Themes:**

```css
/* In src/styles/global.css */
@import './themes/cinematic-dark.css';  /* Change this line */
```

**How to Create a New Theme:**

1. Copy any existing theme file (e.g., `cinematic-dark.css`)
2. Rename it (e.g., `my-custom-theme.css`)
3. Modify the CSS variable values in `:root`
4. Update the import in `global.css`

**Required CSS Variables:** Every theme must define the full token set (colors, spacing, typography, borders, shadows, transitions, z-index). See `src/styles/themes/README.md` for the complete specification.

**Theme-Specific Notes:**

- **Glassmorphism:** Uses translucent `rgba()` backgrounds for `--color-bg-secondary` and `--color-bg-tertiary`. These work best when layered on `--color-bg-primary` (solid). Avoid using them as base backgrounds.

---

## Design Tokens

Design tokens are the atomic values that define our visual language. They are defined as CSS custom properties in `src/styles/themes/<theme-name>.css` (active theme: `cinematic-dark.css`) and mapped to Tailwind utility classes.

### Colors

#### Background Colors

- `--color-bg-primary: #0a0a0a` — Main background (deep black)
- `--color-bg-secondary: #1a1a1a` — Secondary surfaces (cards, panels)
- `--color-bg-tertiary: #2a2a2a` — Tertiary surfaces (hover states, borders)

**Tailwind Classes:**

```html
<div class="bg-bg-primary">Main background</div>
<div class="bg-bg-secondary">Card background</div>
<div class="bg-bg-tertiary">Hover state</div>
```

#### Text Colors

- `--color-text-primary: #ffffff` — Primary text (headings, important content)
- `--color-text-secondary: #a0a0a0` — Secondary text (body text)
- `--color-text-tertiary: #606060` — Tertiary text (captions, muted content)

**Tailwind Classes:**

```html
<h1 class="text-text-primary">Heading</h1>
<p class="text-text-secondary">Body text</p>
<span class="text-text-tertiary">Caption</span>
```

#### Accent Colors

- `--color-accent-primary: #00d4ff` — Primary accent (cyan)
- `--color-accent-secondary: #ff006e` — Secondary accent (pink)
- `--color-accent-tertiary: #ffbe0b` — Tertiary accent (yellow)

**Tailwind Classes:**

```html
<button class="bg-accent-primary text-bg-primary">Primary CTA</button>
<a class="text-accent-primary">Link</a>
<div class="border-accent-secondary">Accent border</div>
```

---

### Typography

#### Font Families

- `--font-sans: 'Inter'` — Primary font for UI and body text
- `--font-mono: 'JetBrains Mono'` — Monospace font for code and technical content

**Tailwind Classes:**

```html
<p class="font-sans">Body text</p>
<code class="font-mono">Code snippet</code>
```

#### Font Sizes

- `--text-xs: 0.75rem` (12px) — Small captions
- `--text-sm: 0.875rem` (14px) — Secondary text
- `--text-base: 1rem` (16px) — Body text
- `--text-lg: 1.125rem` (18px) — Lead text
- `--text-xl: 1.25rem` (20px) — Small headings
- `--text-2xl: 1.5rem` (24px) — H4 headings
- `--text-3xl: 1.875rem` (30px) — H3 headings
- `--text-4xl: 2.25rem` (36px) — H2 headings
- `--text-5xl: 3rem` (48px) — H1 headings

**Tailwind Classes:**

```html
<h1 class="text-5xl">Large heading</h1>
<p class="text-base">Body text</p>
<span class="text-sm">Small text</span>
```

#### Font Weights

- `--font-weight-normal: 400` — Regular
- `--font-weight-medium: 500` — Medium
- `--font-weight-semibold: 600` — Semibold
- `--font-weight-bold: 700` — Bold

**Tailwind Classes:**

```html
<p class="font-normal">Regular</p>
<p class="font-medium">Medium</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>
```

---

### Spacing

Spacing scale based on 4px grid:

- `--space-xs: 0.25rem` (4px)
- `--space-sm: 0.5rem` (8px)
- `--space-md: 1rem` (16px)
- `--space-lg: 1.5rem` (24px)
- `--space-xl: 2rem` (32px)
- `--space-2xl: 3rem` (48px)
- `--space-3xl: 4rem` (64px)

**Tailwind Classes:**

```html
<div class="p-md">Padding</div>
<div class="m-lg">Margin</div>
<div class="gap-sm">Gap</div>
```

---

### Border Radius

- `--border-radius-sm: 0.25rem` (4px) — Small elements
- `--border-radius-md: 0.5rem` (8px) — Buttons, inputs
- `--border-radius-lg: 1rem` (16px) — Cards, modals
- `--border-radius-full: 9999px` — Circular elements

**Tailwind Classes:**

```html
<button class="rounded-md">Button</button>
<div class="rounded-lg">Card</div>
<div class="rounded-full">Avatar</div>
```

---

### Shadows

- `--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3)` — Subtle elevation
- `--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4)` — Medium elevation
- `--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5)` — High elevation
- `--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6)` — Maximum elevation

**Tailwind Classes:**

```html
<div class="shadow-sm">Subtle shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">High shadow</div>
```

---

### Transitions

- `--transition-fast: 150ms` — Quick interactions
- `--transition-base: 300ms` — Standard transitions
- `--transition-slow: 500ms` — Complex animations

**Tailwind Classes:**

```html
<button class="transition-fast">Quick hover</button>
<div class="transition-base">Standard animation</div>
```

---

## Components

### Shared Components (Astro)

#### Container

Responsive container with max-width and horizontal padding.

**Props:**

- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'full'` (default: `'md'`)
- `className`: Additional CSS classes

**Usage:**

```astro
---
import Container from '@components/shared/Container.astro';
---

<Container size="lg">
  <p>Content with max-width and padding</p>
</Container>
```

#### Section

Vertical spacing wrapper for page sections.

**Props:**

- `id`: Section ID for anchor links
- `padding`: `'sm' | 'md' | 'lg' | 'xl'` (default: `'lg'`)
- `className`: Additional CSS classes

**Usage:**

```astro
---
import Section from '@components/shared/Section.astro';
---

<Section id="about" padding="xl">
  <h2>About Section</h2>
</Section>
```

#### Grid

Responsive grid layout system.

**Props:**

- `cols`: `1 | 2 | 3 | 4` (default: `1`)
- `gap`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `className`: Additional CSS classes

**Usage:**

```astro
---
import Grid from '@components/shared/Grid.astro';
---

<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Heading

Semantic heading component with typographic scale.

**Props:**

- `level`: `1 | 2 | 3 | 4 | 5 | 6` (default: `1`)
- `className`: Additional CSS classes

**Usage:**

```astro
---
import Heading from '@components/shared/Heading.astro';
---

<Heading level={1}>Main Title</Heading>
<Heading level={2}>Section Title</Heading>
```

#### Text

Paragraph and text component with size and weight options.

**Props:**

- `size`: `'xs' | 'sm' | 'base' | 'lg' | 'xl'` (default: `'base'`)
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` (default: `'normal'`)
- `color`: `'primary' | 'secondary' | 'tertiary'` (default: `'secondary'`)
- `className`: Additional CSS classes

**Usage:**

```astro
---
import Text from '@components/shared/Text.astro';
---

<Text size="lg" weight="medium" color="primary"> Important paragraph </Text>
```

#### SkipNav

Accessibility component for keyboard navigation.

**Props:**

- `href`: Target anchor (default: `'#main-content'`)

**Usage:**

```astro
---
import SkipNav from '@components/shared/SkipNav.astro';
---

<SkipNav />
<main id="main-content">
  <!-- Page content -->
</main>
```

---

### UI Components (React/shadcn)

#### Button

Interactive button component with multiple variants.

**Variants:**

- `default` — Primary action (cyan background)
- `destructive` — Danger action (red background)
- `outline` — Secondary action (border)
- `secondary` — Tertiary action (dark background)
- `ghost` — Minimal action (transparent)
- `link` — Text link style

**Sizes:**

- `default` — Standard size
- `sm` — Small size
- `lg` — Large size
- `icon` — Icon-only button

**Usage:**

```tsx
import { Button } from '@components/ui/button';

<Button variant="default" size="lg">
  Primary Action
</Button>

<Button variant="outline">
  Secondary Action
</Button>
```

#### Input

Form input component.

**Props:**

- All standard HTML input attributes
- `className`: Additional CSS classes

**Usage:**

```tsx
import { Input } from '@components/ui/input';

<Input type="email" placeholder="Enter your email" />;
```

#### Card

Container component for grouped content.

**Sub-components:**

- `Card` — Main container
- `CardHeader` — Header section
- `CardTitle` — Title text
- `CardDescription` — Description text
- `CardContent` — Main content area
- `CardFooter` — Footer section

**Usage:**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>;
```

---

### Interactive Components (React Islands)

#### DeviceDetector

Displays current device type (mobile/desktop) in a fixed badge.

**Usage:**

```astro
---
import DeviceDetector from '@components/islands/device-detector';
---

<DeviceDetector client:load />
```

#### MotionDetector

Displays current motion preference in a fixed badge.

**Usage:**

```astro
---
import MotionDetector from '@components/islands/motion-detector';
---

<MotionDetector client:load />
```

---

## Global State Management

### Nano Stores

The application uses Nano Stores for lightweight, framework-agnostic state management.

#### Device Store

Tracks mobile/desktop state.

**Store:** `$isMobile` (boolean)
**Hook:** `useDevice()` — Returns `{ isMobile }`

**Usage:**

```tsx
import { useDevice } from '@lib/hooks/use-device';

function MyComponent() {
  const { isMobile } = useDevice();
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

#### Motion Store

Tracks reduced motion preference.

**Store:** `$prefersReducedMotion` (boolean)
**Hook:** `useMotion()` — Returns `{ prefersReducedMotion }`

**Usage:**

```tsx
import { useMotion } from '@lib/hooks/use-motion';

function AnimatedComponent() {
  const { prefersReducedMotion } = useMotion();
  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'all 300ms',
      }}
    >
      Content
    </div>
  );
}
```

#### UI Store

Tracks UI state like mobile menu.

**Store:** `$isMobileMenuOpen` (boolean)
**Actions:** `setIsMobileMenuOpen()`, `toggleMobileMenu()`

**Usage:**

```tsx
import { useStore } from '@nanostores/react';
import { $isMobileMenuOpen, toggleMobileMenu } from '@lib/stores/ui';

function MenuButton() {
  const isOpen = useStore($isMobileMenuOpen);
  return <button onClick={toggleMobileMenu}>{isOpen ? 'Close' : 'Open'} Menu</button>;
}
```

---

## Accessibility

### Focus Management

The design system includes utilities for managing focus in interactive components.

**Functions:**

- `trapFocus(element)` — Trap focus within an element (for modals)
- `getFocusableElements(container)` — Get all focusable elements
- `focusFirstElement(container)` — Focus the first focusable element

**Usage:**

```tsx
import { trapFocus } from '@lib/focus';

useEffect(() => {
  const modal = document.getElementById('modal');
  if (modal) {
    const cleanup = trapFocus(modal);
    return cleanup;
  }
}, []);
```

### Skip Navigation

All pages should include the `<SkipNav />` component to allow keyboard users to skip to main content.

```astro
<SkipNav />
<main id="main-content">
  <!-- Page content -->
</main>
```

### Reduced Motion

Always respect the user's motion preference:

```tsx
const { prefersReducedMotion } = useMotion();

<div
  style={{
    transition: prefersReducedMotion ? 'none' : 'all 300ms ease',
  }}
>
  Content
</div>;
```

---

## Usage Patterns

### Page Layout

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Container from '@components/shared/Container.astro';
import Section from '@components/shared/Section.astro';
import Heading from '@components/shared/Heading.astro';
import Text from '@components/shared/Text.astro';
import SkipNav from '@components/shared/SkipNav.astro';
---

<BaseLayout title="Page Title" description="Page description">
  <SkipNav />

  <main id="main-content">
    <Section padding="xl">
      <Container size="lg">
        <Heading level={1}>Page Title</Heading>
        <Text size="lg">Page description</Text>
      </Container>
    </Section>
  </main>
</BaseLayout>
```

### Card Grid

```astro
---
import Container from '@components/shared/Container.astro';
import Grid from '@components/shared/Grid.astro';
---

<Container size="xl">
  <Grid cols={3} gap="lg">
    <!-- Card items -->
  </Grid>
</Container>
```

### Interactive Component

```astro
---
import { Button } from '@components/ui/button';
---

<Button client:load variant="default" size="lg"> Click Me </Button>
```

---

## Best Practices

### 1. Use Semantic Tokens

Always use design tokens instead of hardcoded values:

```html
<!-- Good -->
<div class="bg-bg-primary text-text-primary">
  <!-- Bad -->
  <div class="bg-[#0a0a0a] text-[#ffffff]"></div>
</div>
```

### 2. Mobile-First

Write mobile-first responsive styles:

```html
<div class="text-base md:text-lg lg:text-xl"></div>
```

### 3. Respect Motion Preferences

Always check for reduced motion:

```tsx
const { prefersReducedMotion } = useMotion();
```

### 4. Accessible Components

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

### 5. Performance

- Lazy load images and videos
- Use `client:visible` for below-fold islands
- Optimize fonts (already done with `font-display: swap`)

---

## File Structure

```
src/
├── components/
│   ├── islands/          # React interactive components
│   │   ├── device-detector.tsx
│   │   └── motion-detector.tsx
│   ├── shared/           # Astro layout components
│   │   ├── Container.astro
│   │   ├── Section.astro
│   │   ├── Grid.astro
│   │   ├── Heading.astro
│   │   ├── Text.astro
│   │   └── SkipNav.astro
│   └── ui/               # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
├── lib/
│   ├── hooks/            # React hooks
│   │   ├── use-device.ts
│   │   └── use-motion.ts
│   ├── stores/           # Nano Stores
│   │   ├── device.ts
│   │   ├── motion.ts
│   │   └── ui.ts
│   ├── focus.ts          # Focus management utilities
│   └── utils.ts          # General utilities (cn)
    └── styles/
        ├── global.css        # Global styles, font imports, shadcn bridge
        └── themes/           # Theme system (CSS variable themes)
            ├── cinematic-dark.css   # Active theme
            ├── minimal-mono.css
            ├── neo-brutalist.css
            └── glassmorphism.css
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Nano Stores Documentation](https://github.com/nanostores/nanostores)
- [Astro Documentation](https://docs.astro.build)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last updated:** 2026-08-17
**Version:** 1.1.0 (Theme System added)
