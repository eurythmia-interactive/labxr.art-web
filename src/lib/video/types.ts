export interface VideoConfig {
  src: {
    mp4: string;
    webm: string;
  };
  poster: string;
  thumbnail: string;
  alt: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

export interface VideoPlayerProps {
  config: VideoConfig;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
}
