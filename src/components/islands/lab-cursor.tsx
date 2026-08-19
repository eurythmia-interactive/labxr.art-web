import { useEffect, useRef, useState, useCallback } from 'react';

type CursorState = 'default' | 'hover' | 'text' | 'drag' | 'crosshair';

const CURSOR_CONFIG: Record<CursorState, { size: number; border: boolean; label?: string; mixBlend: boolean }> = {
  default: { size: 8, border: false, mixBlend: false },
  hover: { size: 48, border: true, mixBlend: false },
  text: { size: 4, border: false, label: undefined, mixBlend: false },
  drag: { size: 56, border: true, label: 'DRAG', mixBlend: false },
  crosshair: { size: 32, border: true, label: undefined, mixBlend: false },
};

export function LabCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const isTouchDevice = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );

  const updateCursor = useCallback(() => {
    const config = CURSOR_CONFIG[state];
    const dx = mousePos.current.x - cursorPos.current.x;
    const dy = mousePos.current.y - cursorPos.current.y;
    const ease = state === 'default' ? 0.15 : 0.08;

    cursorPos.current.x += dx * ease;
    cursorPos.current.y += dy * ease;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - config.size / 2}px, ${cursorPos.current.y - config.size / 2}px, 0)`;
      cursorRef.current.style.width = `${config.size}px`;
      cursorRef.current.style.height = `${config.size}px`;
    }

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${mousePos.current.x - 2}px, ${mousePos.current.y - 2}px, 0)`;
    }

    rafId.current = requestAnimationFrame(updateCursor);
  }, [state]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorAttr === 'drag') setState('drag');
      else if (cursorAttr === 'crosshair') setState('crosshair');
      else if (cursorAttr === 'text') setState('text');
      else if (target.closest('a, button, [role="button"], [data-cursor="hover"]')) setState('hover');
    };

    const handleHoverEnd = () => setState('default');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(updateCursor);

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = '';
    };
  }, [isTouchDevice, visible, updateCursor]);

  if (isTouchDevice) return null;

  const config = CURSOR_CONFIG[state];

  return (
    <>
      {/* Outer ring — follows with easing */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height] duration-200"
        style={{
          width: config.size,
          height: config.size,
          opacity: visible ? 1 : 0,
          border: config.border ? '1px solid var(--color-accent-primary)' : 'none',
          backgroundColor: config.border ? 'transparent' : 'var(--color-accent-primary)',
          mixBlendMode: config.mixBlend ? 'difference' : 'normal',
        }}
      />
      {/* Inner dot — follows exactly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 rounded-full transition-opacity duration-200"
        style={{
          backgroundColor: 'var(--color-accent-primary)',
          opacity: visible && state !== 'default' ? 0 : visible ? 1 : 0,
        }}
      />
    </>
  );
}

export default LabCursor;
