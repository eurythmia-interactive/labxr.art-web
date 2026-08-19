import { useEffect, useState } from 'react';
import { iconRegistry } from './icon-registry';

const MenuIcon = iconRegistry.Menu;
const XIcon = iconRegistry.X;

const navLinks = [
  { href: '/projects', label: 'PROJECTS', micro: 'What we create' },
  { href: '/what-we-do', label: 'WHAT WE DO', micro: 'How we create' },
  { href: '/about', label: 'ABOUT', micro: '20 years of creation' },
  { href: '/contact', label: 'CONTACT', micro: "Let's create" },
];

export function MobileMenuHud() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="flex h-12 w-12 items-center justify-center border border-white/8 text-foreground transition-colors hover:border-accent-primary hover:text-accent-primary md:hidden"
      >
        {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {/* Full-Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg-primary md:hidden">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-white/8 px-4">
            <span className="font-mono text-sm font-bold tracking-wider text-foreground">
              LABXR.ART
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center border border-white/8 text-foreground transition-colors hover:border-accent-primary hover:text-accent-primary"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-8">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-[54px] flex-col justify-center border-b border-white/8 py-4 transition-colors hover:border-accent-primary/30"
                  >
                    <span className="font-mono text-lg font-bold tracking-wider text-foreground transition-colors group-hover:text-accent-primary">
                      {link.label}
                    </span>
                    <span className="mt-1 font-mono text-xs tracking-wider text-text-tertiary">
                      {link.micro}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/8 px-4 py-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-text-secondary">
                  CDMX · MEXICO
                </span>
                <a
                  href="mailto:hello@labxr.art"
                  className="font-mono text-xs tracking-wider text-accent-primary transition-colors hover:text-accent-secondary"
                >
                  hello@labxr.art
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-text-tertiary">
                  (UTC-06:00) Central Time
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenuHud;
