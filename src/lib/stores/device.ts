import { atom } from 'nanostores';

export const $isMobile = atom<boolean>(false);

export function setIsMobile(value: boolean) {
  $isMobile.set(value);
}
