import { useEffect, useRef, useState } from 'react';
import { useDevice } from '@/lib/hooks/use-device';
import { useMotion } from '@/lib/hooks/use-motion';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoConfig } from '@/lib/video/types';

interface VideoPlayerIslandProps {
  config: VideoConfig;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '21:9': 'aspect-[21/9]',
};

export function VideoPlayerIsland({
  config,
  aspectRatio = '16:9',
}: VideoPlayerIslandProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(config.muted ?? true);
  const [showControls, setShowControls] = useState(false);

  const { isMobile } = useDevice();
  const { prefersReducedMotion } = useMotion();
  const { ref: containerRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.25,
    triggerOnce: false,
  });

  const shouldAutoplay = !isMobile && !prefersReducedMotion && config.autoplay !== false;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasIntersected) return;

    if (!isLoaded) {
      video.src = config.src.mp4;
      video.load();
      setIsLoaded(true);
    }

    if (shouldAutoplay && isIntersecting) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay blocked:', error);
          setShowControls(true);
        });
      }
    } else if (!isIntersecting && isPlaying) {
      video.pause();
    }
  }, [isIntersecting, hasIntersected, isLoaded, shouldAutoplay, config.src.mp4, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      // Ensure video src is set before playing
      if (!video.src || video.src === '') {
        video.src = config.src.mp4;
        video.load();
        setIsLoaded(true);
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Video playback failed:', error);
        });
      }
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg bg-black', aspectRatioClasses[aspectRatio])}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Poster image - always visible until video loads */}
      {!isLoaded && (
        <img
          src={config.poster}
          alt={config.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        poster={config.poster}
        muted={isMuted}
        loop={config.loop}
        playsInline={config.playsInline ?? true}
        controls={config.controls}
        preload="metadata"
        aria-label={config.alt}
      />

      {/* Mobile play button overlay */}
      {isMobile && !isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
          aria-label="Play video"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
            <Play className="h-8 w-8 fill-black text-black" />
          </div>
        </button>
      )}

      {/* Desktop controls overlay */}
      {!isMobile && showControls && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity">
          <button
            onClick={handlePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 fill-white text-white" />
            )}
          </button>

          <button
            onClick={handleMuteToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
