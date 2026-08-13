export const VIDEO_ASPECT_RATIOS = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '21:9': 'aspect-[21/9]',
} as const;

export const VIDEO_CACHE_HEADERS = {
  video: 'public, max-age=31536000, immutable',
  image: 'public, max-age=2592000',
} as const;
