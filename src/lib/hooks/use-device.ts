import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $isMobile, setIsMobile } from '@/lib/stores/device';

export function useDevice() {
  const isMobile = useStore($isMobile);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
}
