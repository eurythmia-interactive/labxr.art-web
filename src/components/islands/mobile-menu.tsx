import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isMobileMenuOpen, setIsMobileMenuOpen } from '@/lib/stores/ui';
import { useDevice } from '@/lib/hooks/use-device';
import { trapFocus } from '@/lib/focus';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';
import { DISCIPLINES, DISCIPLINE_LABELS } from '@/lib/disciplines';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#contact', label: 'Contact' },
];

export function MobileMenu() {
  const isOpen = useStore($isMobileMenuOpen);
  const { isMobile } = useDevice();
  const [isScrolled, setIsScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const menu = document.getElementById('mobile-menu');
    let cleanup: (() => void) | undefined;

    if (menu) {
      cleanup = trapFocus(menu);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (cleanup) cleanup();
    };
  }, [isOpen]);

  if (!isMobile) return null;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isOpen)}
        className={cn(
          'fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm transition-colors hover:bg-secondary',
          isScrolled && 'shadow-lg'
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-md transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-4 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          {/* Work accordion (mobile) */}
          <div className="flex w-full max-w-xs flex-col items-center">
            <button
              type="button"
              onClick={() => setWorkOpen(!workOpen)}
              aria-expanded={workOpen}
              className="flex items-center gap-2 text-2xl font-medium text-foreground transition-colors hover:text-primary"
            >
              Work
              <ChevronDown
                className={cn('h-5 w-5 transition-transform', workOpen && 'rotate-180')}
              />
            </button>
            {workOpen && (
              <ul className="mt-3 flex flex-col items-center gap-3">
                {DISCIPLINES.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/discipline/${slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-foreground/70 transition-colors hover:text-primary"
                    >
                      {DISCIPLINE_LABELS[slug]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 w-64">
            <ThemeSwitcher variant="mobile" />
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
