import { atom } from 'nanostores';

export const $activeCaseStudyId = atom<string | null>(null);

export function openCaseStudy(id: string) {
  $activeCaseStudyId.set(id);
}

export function closeCaseStudy() {
  $activeCaseStudyId.set(null);
}
