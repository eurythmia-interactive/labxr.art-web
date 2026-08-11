import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $prefersReducedMotion, setPrefersReducedMotion } from '@/lib/stores/motion';

export function useMotion() {
  const prefersReducedMotion = useStore($prefersReducedMotion);

  useEffect(() => {
    function checkMotion() {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }

    // Initial check
    checkMotion();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkMotion);
    return () => mediaQuery.removeEventListener('change', checkMotion);
  }, []);

  return { prefersReducedMotion };
}
