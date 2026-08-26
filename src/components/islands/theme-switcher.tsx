import { useEffect, useRef, useState } from 'react';
import { iconRegistry } from './icon-registry';
import { cn } from '@/lib/utils';

const PaletteIcon = iconRegistry.Palette;
const CheckIcon = iconRegistry.Check;

export const THEMES = [
  { id: 'theme-frosted', label: 'Frosted' },
  { id: 'theme-lab', label: 'Terminal' },
  { id: 'theme-cinematic', label: 'Cinematic' },
  { id: 'theme-minimal', label: 'Minimal' },
  { id: 'theme-brutalist', label: 'Brutalist' },
  { id: 'theme-glass', label: 'Glass' },
  { id: 'theme-sunset', label: 'Sunset' },
  { id: 'theme-aurora', label: 'Aurora' },
  { id: 'theme-neon', label: 'Neon' },
  { id: 'theme-rainforest', label: 'Rainforest' },
  { id: 'theme-desert', label: 'Desert' },
  { id: 'theme-mountain', label: 'Mountain' },
  { id: 'theme-caribbean', label: 'Caribbean' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

const STORAGE_KEY = 'labxr-theme';
const DEFAULT_THEME: ThemeId = 'theme-frosted';

function applyTheme(themeId: ThemeId): void {
  document.documentElement.className = themeId;
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    /* localStorage unavailable */
  }
}

function getActiveTheme(): ThemeId {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  const classes = document.documentElement.className.split(/\s+/);
  const found = THEMES.find((t) => classes.includes(t.id));
  return found?.id ?? DEFAULT_THEME;
}

interface ThemeSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export function ThemeSwitcher({ variant = 'desktop' }: ThemeSwitcherProps) {
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = variant === 'mobile';

  useEffect(() => {
    setCurrent(getActiveTheme());

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function selectTheme(id: ThemeId) {
    applyTheme(id);
    setCurrent(id);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn('relative', isMobile ? 'w-full' : 'inline-block')}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Switch theme"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'flex items-center justify-center rounded-md transition-colors',
          'hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
          isMobile
            ? 'h-12 w-full gap-2 px-4 text-sm font-medium text-foreground'
            : 'h-9 w-9 text-foreground/80 hover:text-foreground'
        )}
      >
        <PaletteIcon className={cn(isMobile ? 'h-5 w-5' : 'h-5 w-5')} />
        {isMobile && <span>Theme</span>}
      </button>

      {open && (
        <ul
          role="menu"
          aria-label="Available themes"
          className={cn(
            'absolute z-tooltip min-w-[180px] overflow-hidden rounded-md border border-border bg-bg-secondary shadow-lg',
            isMobile ? 'right-0 left-0 top-full mt-2' : 'right-0 top-full mt-2'
          )}
        >
          {THEMES.map((t) => {
            const isActive = current === t.id;
            return (
              <li
                key={t.id}
                role="menuitemradio"
                aria-checked={isActive}
                tabIndex={0}
                onClick={() => selectTheme(t.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectTheme(t.id);
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-bg-tertiary text-foreground'
                    : 'text-foreground/80 hover:bg-bg-tertiary hover:text-foreground'
                )}
              >
                <span>{t.label}</span>
                {isActive && <CheckIcon className="h-4 w-4 text-accent-primary" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ThemeSwitcher;
