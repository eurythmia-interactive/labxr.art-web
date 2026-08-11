import { useDevice } from '@/lib/hooks/use-device';

export function DeviceDetector() {
  const { isMobile } = useDevice();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-bg-secondary border border-text-tertiary rounded-md px-3 py-2 text-xs text-text-secondary shadow-lg">
      <span className="font-mono">{isMobile ? '📱 Mobile' : '🖥️ Desktop'}</span>
    </div>
  );
}
