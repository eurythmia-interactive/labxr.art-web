import { atom } from 'nanostores';

export const $prefersReducedMotion = atom<boolean>(false);

export function setPrefersReducedMotion(value: boolean) {
  $prefersReducedMotion.set(value);
}
