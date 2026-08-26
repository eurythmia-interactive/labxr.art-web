import { atom } from 'nanostores';

export const $activeServiceId = atom<string | null>(null);

export function openService(id: string) {
  $activeServiceId.set(id);
}

export function closeService() {
  $activeServiceId.set(null);
}
