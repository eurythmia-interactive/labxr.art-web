import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useStore } from '@nanostores/react';
import { $prefersReducedMotion } from '@/lib/stores/motion';
import { gsap } from '@/lib/gsap/register-plugins';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useStore($prefersReducedMotion);

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('.scroll-reveal-item');
      
      if (elements.length === 0) {
        const singleElement = containerRef.current;
        const initialProps = getInitialProps(direction);
        
        gsap.set(singleElement, { opacity: 0, ...initialProps });
        
        gsap.to(singleElement, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: singleElement,
            start: 'top 80%',
            once: true,
          },
        });
      } else {
        const initialProps = getInitialProps(direction);
        
        gsap.set(elements, { opacity: 0, ...initialProps });
        
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

function getInitialProps(direction: 'up' | 'down' | 'left' | 'right') {
  switch (direction) {
    case 'up':
      return { y: 40 };
    case 'down':
      return { y: -40 };
    case 'left':
      return { x: 40 };
    case 'right':
      return { x: -40 };
    default:
      return { y: 40 };
  }
}
