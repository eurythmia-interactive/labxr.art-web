# Theme System - LabXR.art

## Overview

LabXR.art uses a CSS Variable-based theme system. Changing **one import line** in `src/styles/global.css` switches the entire visual design.

## Available Themes

| Theme | File | Style | Inspiration |
|-------|------|-------|-------------|
| Cinematic Dark | `cinematic-dark.css` | Dark, cyan accent, cinematic | Default LabXR theme |
| Minimalist Monochrome | `minimal-mono.css` | Light, clean, professional | Linear, Vercel, Stripe |
| Neo-Brutalist | `neo-brutalist.css` | Bold, high-contrast, playful | Gumroad, Framer, Web3 |
| Glassmorphism | `glassmorphism.css` | Translucent, layered, glowing | Apple, modern SaaS |
| Frosted Glass | `gradient-frosted-glass.css` | Light, neutral, Apple-like | Apple.com, modern web |
| Sunset Glass | `gradient-sunset-glass.css` | Warm dark, golden hour | Tropical sunsets, creative energy |
| Aurora Glass | `gradient-aurora-glass.css` | Cool dark, ethereal | Northern lights, deep space |
| Neon Glass | `gradient-neon-glass.css` | Cyberpunk, neon glow | Cyberpunk aesthetics, futuristic |

## How to Switch Themes

### Runtime (Recommended — for users)

Users can switch themes instantly via the **Theme Switcher** in the navigation header (desktop) or mobile menu. Selection is persisted in `localStorage['labxr-theme']`. No reload required.

### Build-time (Optional)

For a fixed theme (no runtime switcher), edit `src/layouts/BaseLayout.astro` and remove the other theme `@import` lines. The `<html class="theme-cinematic">` default still applies the cinematic theme on first paint.

### Programmatic (For Developers)

```js
import { applyTheme } from '@/lib/themes'; // utility TBD

// Or directly:
document.documentElement.className = 'theme-aurora';
localStorage.setItem('labxr-theme', 'theme-aurora');
```

## Theme Architecture

Themes use **class-based scoping** (`html.theme-[name]`) so all 8 themes can coexist:

```css
html.theme-cinematic {
  --color-bg-primary: #0a0a0a;
  /* ... */
}
```

All 8 theme files are loaded eagerly in `BaseLayout.astro` via `@import`. The active theme is the one whose class matches `document.documentElement.className`.

**FOUC Prevention:** An inline `<script is:inline>` in `<head>` runs synchronously before paint and reads `localStorage['labxr-theme']` to apply the saved theme class. This eliminates the flash of unstyled/wrong-theme content on page load.

## Available Theme IDs

| File | Class | Label |
|------|-------|-------|
| `cinematic-dark.css` | `theme-cinematic` | Cinematic |
| `minimal-mono.css` | `theme-minimal` | Minimal |
| `neo-brutalist.css` | `theme-brutalist` | Brutalist |
| `glassmorphism.css` | `theme-glass` | Glass |
| `gradient-frosted-glass.css` | `theme-frosted` | Frosted |
| `gradient-sunset-glass.css` | `theme-sunset` | Sunset |
| `gradient-aurora-glass.css` | `theme-aurora` | Aurora |
| `gradient-neon-glass.css` | `theme-neon` | Neon |

## How to Create a New Theme

1. Copy any existing theme file (e.g., `cinematic-dark.css`)
2. Rename it (e.g., `my-custom-theme.css`)
3. Modify the CSS variable values in `:root`
4. Update the import in `global.css` to use your new theme

### Required CSS Variables

Every theme **must** define these variables:

**Colors:**
- `--color-bg-primary` - Main background (solid)
- `--color-bg-secondary` - Secondary background (cards)
- `--color-bg-tertiary` - Tertiary background (borders, inputs)
- `--color-bg-gradient` - **Optional** CSS gradient applied to body (e.g., `linear-gradient(...)`, `radial-gradient(...)`)
- `--color-text-primary` - Main text color
- `--color-text-secondary` - Secondary text (muted)
- `--color-text-tertiary` - Tertiary text (very muted)
- `--color-accent-primary` - Primary accent (CTAs, links)
- `--color-accent-secondary` - Secondary accent (hover states)
- `--color-accent-tertiary` - Tertiary accent (highlights)

**Spacing:**
- `--space-xs` through `--space-3xl` (7-step scale)

**Typography:**
- `--font-sans` - Sans-serif font stack
- `--font-mono` - Monospace font stack
- `--text-xs` through `--text-5xl` (9-step scale)
- `--leading-tight` through `--leading-loose` (line heights)
- `--font-weight-normal` through `--font-weight-bold` (weights)

**Borders:**
- `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg`, `--border-radius-full`

**Shadows:**
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

**Transitions:**
- `--transition-fast`, `--transition-base`, `--transition-slow`

**Z-Index:**
- `--z-index-dropdown` through `--z-index-tooltip` (7-step scale)

## Theme Architecture

```
src/styles/
 ├── themes/
 │   ├── cinematic-dark.css            # Current active theme
 │   ├── minimal-mono.css              # Alternative theme
 │   ├── neo-brutalist.css             # Alternative theme
 │   ├── glassmorphism.css             # Alternative theme
 │   ├── gradient-frosted-glass.css    # Gradient theme
 │   ├── gradient-sunset-glass.css     # Gradient theme
 │   ├── gradient-aurora-glass.css     # Gradient theme
 │   └── gradient-neon-glass.css       # Gradient theme
 └── global.css                        # Imports active theme + shadcn bridge
```

## Backgrounds

The theme system supports both **solid colors** and **CSS gradients** via two separate variables:

- `--color-bg-primary` — Solid background color (used for components, shadcn bridge, Tailwind classes)
- `--color-bg-gradient` — Optional CSS gradient applied to the body element via `background-image`

**How it works in `global.css`:**

```css
body {
  background-color: var(--color-bg-primary);  /* solid fallback */
  background-image: var(--color-bg-gradient); /* gradient overlay if defined */
}
```

This architecture ensures:
- ✅ Components keep using solid colors (no breaking changes)
- ✅ Body gets a gradient overlay for visual depth
- ✅ Themes without `--color-bg-gradient` work as solid colors only
- ✅ GPU-accelerated rendering, no JS overhead

**Gradient examples:**

- `linear-gradient(180deg, #0a0a0a 0%, #050505 100%)` — Subtle dark vignette
- `radial-gradient(ellipse at top, #1a1a3a 0%, #0f0f1e 70%)` — Purple glow
- `linear-gradient(135deg, #0a0e27 0%, #1a1f4a 35%, #2a1a4a 70%, #0a0e27 100%)` — Aurora effect

## How It Works

1. **Theme files** define CSS variables in `:root`
2. **global.css** imports the active theme
3. **Tailwind** reads CSS variables via `tailwind.config.mjs`
4. **shadcn bridge** maps custom tokens to shadcn standard names
5. **Components** use Tailwind classes or CSS variables

## Tips for Creating Themes

- **Test contrast ratios** - Ensure text is readable (WCAG AA minimum)
- **Consider dark/light modes** - Some themes work better in dark or light
- **Maintain consistency** - Use the same spacing scale across themes
- **Test all components** - Check buttons, cards, forms, modals
- **Mobile-first** - Test on mobile devices
- **Performance** - Avoid heavy gradients or complex effects

## Theme-Specific Notes

### Glassmorphism
> **Note:** Glassmorphism uses translucent `rgba()` backgrounds for `--color-bg-secondary` and `--color-bg-tertiary`. These work best when layered on top of `--color-bg-primary` (solid). Avoid using them as base backgrounds or in components without a solid backdrop, as transparency may cause readability issues.

## Future Enhancements

Potential features for the theme system:

- **System preference detection** - Auto-switch based on `prefers-color-scheme`
- **Theme picker UI** - Visual swatches instead of text labels
- **More themes** - Create additional themes (Swiss, Editorial, Cyberpunk, etc.)
- **Theme variants** - Light/dark variants of each theme
- **Per-section themes** - Allow different themes for different page sections
