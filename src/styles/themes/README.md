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

## How to Switch Themes

1. Open `src/styles/global.css`
2. Find the theme import line:
   ```css
   @import './themes/cinematic-dark.css';
   ```
3. Change it to your desired theme:
   ```css
   @import './themes/minimal-mono.css';
   ```
4. Save and refresh the browser.

## How to Create a New Theme

1. Copy any existing theme file (e.g., `cinematic-dark.css`)
2. Rename it (e.g., `my-custom-theme.css`)
3. Modify the CSS variable values in `:root`
4. Update the import in `global.css` to use your new theme

### Required CSS Variables

Every theme **must** define these variables:

**Colors:**
- `--color-bg-primary` - Main background
- `--color-bg-secondary` - Secondary background (cards)
- `--color-bg-tertiary` - Tertiary background (borders, inputs)
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
 │   ├── cinematic-dark.css    # Current active theme
 │   ├── minimal-mono.css      # Alternative theme
 │   ├── neo-brutalist.css     # Alternative theme
 │   └── glassmorphism.css     # Alternative theme
 └── global.css                # Imports active theme + shadcn bridge
```

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

- **Runtime theme switcher** - Allow users to switch themes via UI
- **Theme persistence** - Save theme preference in localStorage
- **System preference detection** - Auto-switch based on `prefers-color-scheme`
- **More themes** - Create additional themes (Swiss, Editorial, Cyberpunk, etc.)
- **Theme variants** - Light/dark variants of each theme
