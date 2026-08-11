import { atom } from 'nanostores';

export const $isMobileMenuOpen = atom<boolean>(false);

export function setIsMobileMenuOpen(value: boolean) {
  $isMobileMenuOpen.set(value);
}

export function toggleMobileMenu() {
  $isMobileMenuOpen.set(!$isMobileMenuOpen.get());
}
