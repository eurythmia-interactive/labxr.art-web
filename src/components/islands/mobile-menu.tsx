import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $isMobileMenuOpen, setIsMobileMenuOpen } from '@/lib/stores/ui';
import { useDevice } from '@/lib/hooks/use-device';
import { trapFocus } from '@/lib/focus';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#contact', label: 'Contact' },
];

export function MobileMenu() {
  const isOpen = useStore($isMobileMenuOpen);
  const { isMobile } = useDevice();
  const [isScrolled, setIsScrolled] = useState(false);

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
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
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
