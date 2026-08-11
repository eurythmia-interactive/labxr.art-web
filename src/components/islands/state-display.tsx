import { useStore } from '@nanostores/react';
import { $isMobile } from '@/lib/stores/device';
import { $prefersReducedMotion } from '@/lib/stores/motion';
import { useDevice } from '@/lib/hooks/use-device';
import { useMotion } from '@/lib/hooks/use-motion';

export function StateDisplay() {
  useDevice();
  useMotion();
  const isMobile = useStore($isMobile);
  const prefersReducedMotion = useStore($prefersReducedMotion);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-card-foreground mb-3">Nano Store State (Live)</h3>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">$isMobile</span>
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold ${
              isMobile
                ? 'bg-accent-primary/20 text-accent-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {String(isMobile)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">$prefersReducedMotion</span>
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold ${
              prefersReducedMotion
                ? 'bg-accent-primary/20 text-accent-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {String(prefersReducedMotion)}
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Resize the browser or toggle OS reduced motion to see live updates.
      </p>
    </div>
  );
}
