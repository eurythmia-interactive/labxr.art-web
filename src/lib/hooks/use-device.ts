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

  // Detect iOS devices
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Detect Android devices
  const isAndroid = typeof window !== 'undefined' && /Android/.test(navigator.userAgent);

  return { isMobile, isIOS, isAndroid };
}
