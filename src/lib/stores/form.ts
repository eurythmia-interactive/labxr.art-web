import { atom } from 'nanostores';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const $formStatus = atom<FormStatus>('idle');
export const $formError = atom<string | null>(null);

export function resetForm() {
  $formStatus.set('idle');
  $formError.set(null);
}
