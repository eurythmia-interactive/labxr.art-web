export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  
  if (window.plausible) {
    window.plausible(event.name, { props: event.properties });
  }
  
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event.name, event.properties);
  }
}

export const AnalyticsEvents = {
  VIDEO_PLAY: 'video_play',
  VIDEO_PAUSE: 'video_pause',
  CASE_STUDY_OPEN: 'case_study_open',
  CASE_STUDY_CLOSE: 'case_study_close',
  SERVICE_HOVER: 'service_hover',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  NAVIGATION_CLICK: 'navigation_click',
  WHATSAPP_CLICK: 'whatsapp_click',
} as const;
