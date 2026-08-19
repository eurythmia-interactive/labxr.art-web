import { useEffect, useState } from 'react';

export function HeroHud() {
  const [fps, setFps] = useState(60);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      rafId = requestAnimationFrame(measureFps);
    };

    rafId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="mt-12 flex items-center gap-4 font-mono text-xs tracking-wider text-text-tertiary">
      <span className="hidden md:inline" data-cursor="drag">[DRAG TO ROTATE]</span>
      <span className="text-text-tertiary">|</span>
      <span className={fps >= 55 ? 'text-accent-secondary' : fps >= 30 ? 'text-accent-primary' : 'text-accent-tertiary'}>
        [FPS: {fps}]
      </span>
      <span className="text-text-tertiary">|</span>
      <button
        onClick={() => setSoundOn(!soundOn)}
        className="cursor-none transition-colors hover:text-accent-primary"
        data-cursor="hover"
        aria-label={soundOn ? 'Mute audio' : 'Enable audio'}
      >
        [SOUND: {soundOn ? 'ON' : 'OFF'}]
      </button>
    </div>
  );
}

export default HeroHud;
