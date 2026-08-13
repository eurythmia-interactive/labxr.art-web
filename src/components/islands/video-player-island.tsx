import { useEffect, useRef, useState } from 'react';
import { useDevice } from '@/lib/hooks/use-device';
import { useMotion } from '@/lib/hooks/use-motion';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoConfig } from '@/lib/video/types';

interface VideoPlayerIslandProps {
  config: VideoConfig;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  forceLoad?: boolean;
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
  forceLoad = false,
}: VideoPlayerIslandProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(config.muted ?? true);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isAttemptingPlay = useRef(false);

  const { isMobile } = useDevice();
  const { prefersReducedMotion } = useMotion();
  const { ref: containerRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.25,
    triggerOnce: false,
  });

  const shouldAutoplay = !isMobile && !prefersReducedMotion && config.autoplay !== false;
  const shouldLoad = forceLoad || hasIntersected;

  // Load video when visible or forced
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || isLoaded) return;

    video.src = config.src.mp4;
    video.load();
    setIsLoaded(true);
  }, [shouldLoad, isLoaded, config.src.mp4]);

  // Autoplay on desktop when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    if (shouldAutoplay && isIntersecting && !isPlaying) {
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
  }, [isIntersecting, isLoaded, shouldAutoplay, isPlaying]);

  // Event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      isAttemptingPlay.current = false;
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      // If we were trying to play and video is now ready, try again
      if (isAttemptingPlay.current) {
        video.play().catch((error) => {
          console.error('Play after canplay failed:', error);
          setHasError(true);
          setErrorMessage('Playback failed. Please try again.');
          setIsLoading(false);
          isAttemptingPlay.current = false;
        });
      }
    };
    const handleError = (e: Event) => {
      console.error('Video error:', e);
      const videoEl = e.target as HTMLVideoElement;
      let msg = 'Video unavailable';
      if (videoEl.error) {
        switch (videoEl.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            msg = 'Playback aborted';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            msg = 'Network error. Check your connection.';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            msg = 'Video format not supported';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            msg = 'Video source not found';
            break;
        }
      }
      setHasError(true);
      setErrorMessage(msg);
      setIsLoading(false);
      isAttemptingPlay.current = false;
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

  // Cleanup on unmount
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

  // Sync muted state
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video || isAttemptingPlay.current) return;

    if (isPlaying) {
      video.pause();
      return;
    }

    // Ensure video src is set
    if (!video.src || video.src === '') {
      video.src = config.src.mp4;
      video.load();
      setIsLoaded(true);
    }

    isAttemptingPlay.current = true;
    setIsLoading(true);
    setHasError(false);

    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.error('Video playback failed:', error);
      // Don't show error immediately - wait for canplay event
      // If video isn't ready, the canplay handler will retry
      setTimeout(() => {
        if (isAttemptingPlay.current && !isPlaying) {
          setHasError(true);
          setErrorMessage('Tap to retry playback');
          setIsLoading(false);
          isAttemptingPlay.current = false;
        }
      }, 3000);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleRetry = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setErrorMessage('');
    setIsLoading(true);
    isAttemptingPlay.current = true;

    video.src = config.src.mp4;
    video.load();
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Retry playback failed:', error);
        setHasError(true);
        setErrorMessage('Still failing. Please check your connection.');
        setIsLoading(false);
        isAttemptingPlay.current = false;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg bg-black', aspectRatioClasses[aspectRatio])}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
    >
      {/* Poster image - shown until video loads */}
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
          'absolute inset-0 h-full w-full object-cover',
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
        crossOrigin="anonymous"
        aria-label={config.alt}
      >
        <source
          src={config.src.mp4}
          type='video/mp4; codecs="avc1.4D401F, mp4a.40.2"'
        />
        {config.src.webm && (
          <source src={config.src.webm} type="video/webm" />
        )}
      </video>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
          <AlertCircle className="mb-2 h-8 w-8 text-red-400" />
          <p className="text-sm text-white">{errorMessage}</p>
          <button
            onClick={handleRetry}
            className="mt-3 rounded-lg bg-white/20 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 active:bg-white/40"
          >
            Retry
          </button>
        </div>
      )}

      {/* Mobile play button overlay */}
      {isMobile && !isPlaying && !isLoading && !hasError && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 transition-colors active:bg-black/50"
          aria-label="Play video"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-95">
            <Play className="h-10 w-10 fill-black text-black" />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-white/90">
            Tap to play
          </p>
        </button>
      )}

      {/* Desktop controls overlay */}
      {!isMobile && showControls && !isLoading && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
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
