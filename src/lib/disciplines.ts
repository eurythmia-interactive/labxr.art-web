export const DISCIPLINES = [
  'xr',
  'ux-design',
  'dev',
  'videomapping',
  'interactivity',
  'museography',
  'products',
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  xr: 'XR Experiences',
  'ux-design': 'UX Design',
  dev: 'Development',
  videomapping: 'Video Mapping',
  interactivity: 'Interactivity',
  museography: 'Museography',
  products: 'Products',
};

export const DISCIPLINE_DESCRIPTIONS: Record<Discipline, string> = {
  xr: 'Immersive extended reality installations combining AR, VR, and spatial computing.',
  'ux-design': 'Interface and experience design for digital products and immersive systems.',
  dev: 'Front-end, back-end, and full-stack engineering for real-time interactive applications.',
  videomapping: 'Architectural projection mapping and large-scale audiovisual installations.',
  interactivity: 'Computer vision, gesture recognition, and sensor-driven interactive systems.',
  museography: 'Museum, gallery, and cultural institution experiences and exhibits.',
  products: 'Branded digital products, configurators, and white-label agency tools.',
};
