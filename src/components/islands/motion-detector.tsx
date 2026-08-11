import { useMotion } from '@/lib/hooks/use-motion';

export function MotionDetector() {
  const { prefersReducedMotion } = useMotion();

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-bg-secondary border border-text-tertiary rounded-md px-3 py-2 text-xs text-text-secondary shadow-lg">
      <span className="font-mono">
        {prefersReducedMotion ? '⏸️ Reduced Motion' : '▶️ Animations'}
      </span>
    </div>
  );
}
