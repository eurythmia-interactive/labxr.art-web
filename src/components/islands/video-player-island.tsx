import { useEffect, useRef, useState } from 'react';
import { useDevice } from '@/lib/hooks/use-device';
import { useMotion } from '@/lib/hooks/use-motion';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
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

  const handlePlayPause = async (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
      
      setIsLoading(true);
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        console.error('Video playback failed:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  const handleMuteToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg bg-black', aspectRatioClasses[aspectRatio])}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
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
        playsInline
        webkit-playsinline=""
        x5-playsinline=""
        x5-video-player-type="h5"
        controls={config.controls && !isMobile}
        preload="metadata"
        aria-label={config.alt}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
          <p className="text-sm text-white">Video unavailable</p>
          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              setHasError(false);
              setIsLoading(true);
              const video = videoRef.current;
              if (video) {
                video.src = config.src.mp4;
                video.load();
                video.play().catch(console.error);
              }
            }}
            className="mt-2 rounded bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30"
          >
            Retry
          </button>
        </div>
      )}

      {/* Mobile play button overlay - always visible on mobile when not playing */}
      {isMobile && !isPlaying && !isLoading && !hasError && (
        <button
          onClick={handlePlayPause}
          onTouchStart={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors active:bg-black/50"
          aria-label="Play video"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-95">
            <Play className="h-10 w-10 fill-black text-black" />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
            Tap to play
          </p>
        </button>
      )}

      {/* Desktop controls overlay */}
      {!isMobile && showControls && !isLoading && !hasError && (
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
