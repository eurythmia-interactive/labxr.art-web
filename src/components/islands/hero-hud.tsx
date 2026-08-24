import { useEffect, useState } from 'react';

export function HeroHud() {
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    // Find the hero video element
    const video = document.querySelector('video[alt="Hero background video"]') as HTMLVideoElement | null;
    
    if (video) {
      // Set initial muted state
      video.muted = !soundOn;
    }
  }, [soundOn]);

  const handleSoundToggle = () => {
    setSoundOn(!soundOn);
  };

  return (
    <div className="mt-12 flex items-center gap-4 font-mono text-xs tracking-wider text-text-tertiary">
      <button
        onClick={handleSoundToggle}
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
