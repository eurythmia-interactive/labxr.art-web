# Analytics Setup Guide

This guide documents the analytics implementation for LabXR.art, including tracked events and how to view analytics data.

## Analytics Provider

**Provider**: Plausible Analytics  
**Type**: Privacy-focused, cookieless analytics  
**Script**: Loaded with `defer` attribute for optimal performance  
**Compliance**: GDPR, CCPA, and PECR compliant (no cookie consent required)

## Implementation

### Script Location

The Plausible analytics script is loaded in `src/layouts/BaseLayout.astro`:

```html
<script is:inline defer data-domain="labxr.art" src="https://plausible.io/js/script.js"></script>
```

### Configuration

- **Domain**: `labxr.art`
- **Script Type**: Standard (no outbound links or file downloads tracking)
- **Cookie Usage**: None (completely cookieless)
- **Data Collection**: Anonymous, no personal data collected

## Tracked Events

The following custom events are tracked throughout the application:

### Video Events

| Event Name | Trigger | Properties | Location |
|------------|---------|------------|----------|
| `video_play` | Video starts playing | `video`: Video title/alt text | `video-player-island.tsx` |
| `video_pause` | Video is paused | `video`: Video title/alt text | `video-player-island.tsx` |

### Portfolio Events

| Event Name | Trigger | Properties | Location |
|------------|---------|------------|----------|
| `case_study_open` | Case study modal opens | `id`: Case study ID | `case-study-viewer.tsx` |

### Contact Form Events

| Event Name | Trigger | Properties | Location |
|------------|---------|------------|----------|
| `contact_form_submit` | Form submission initiated | None | `contact-form.tsx` |
| `contact_form_success` | Form submission successful | None | `contact-form.tsx` |
| `contact_form_error` | Form submission failed | None | `contact-form.tsx` |

### Service Card Events

| Event Name | Trigger | Properties | Location |
|------------|---------|------------|----------|
| `service_hover` | Service card hover (desktop) | `service`: Service title | `service-card.astro` |

### Navigation Events

| Event Name | Trigger | Properties | Location |
|------------|---------|------------|----------|
| `whatsapp_click` | WhatsApp button clicked | None | `whatsapp-button.astro` |

## Event Tracking Implementation

### Analytics Utility

All event tracking is centralized in `src/lib/analytics.ts`:

```typescript
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

trackEvent({ 
  name: AnalyticsEvents.VIDEO_PLAY, 
  properties: { video: 'Hero Background' } 
});
```

### Available Event Constants

```typescript
export const AnalyticsEvents = {
  VIDEO_PLAY: 'video_play',
  VIDEO_PAUSE: 'video_pause',
  CASE_STUDY_OPEN: 'case_study_open',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  SERVICE_HOVER: 'service_hover',
  WHATSAPP_CLICK: 'whatsapp_click',
} as const;
```

## Viewing Analytics Data

### Plausible Dashboard

1. Log in to [Plausible Analytics](https://plausible.io)
2. Select the `labxr.art` site
3. View real-time and historical data

### Key Metrics to Monitor

#### Traffic Metrics
- **Unique Visitors**: Number of individual visitors
- **Total Visits**: Total number of visits
- **Page Views**: Total page views
- **Bounce Rate**: Percentage of single-page visits
- **Visit Duration**: Average time spent on site

#### Conversion Metrics
- **Form Submissions**: Track `contact_form_success` events
- **Video Engagement**: Track `video_play` events
- **Portfolio Interest**: Track `case_study_open` events
- **WhatsApp Clicks**: Track `whatsapp_click` events

#### Custom Events Dashboard
1. Go to **Insights** > **Custom Events** in Plausible
2. View all tracked events and their frequency
3. Filter by date range
4. Export data for further analysis

### Setting Up Custom Reports

#### Conversion Funnel

Create a funnel report in Plausible:

1. **Step 1**: Page visit (`/`)
2. **Step 2**: Video play (`video_play` event)
3. **Step 3**: Case study open (`case_study_open` event)
4. **Step 4**: Form submit (`contact_form_submit` event)
5. **Step 5**: Form success (`contact_form_success` event)

#### Engagement Report

Track user engagement:

1. **Video Plays**: Total `video_play` events
2. **Average Videos per Visitor**: `video_play` events / unique visitors
3. **Case Study Views**: Total `case_study_open` events
4. **Service Interest**: Total `service_hover` events

## Privacy Compliance

### GDPR Compliance

- ✅ No cookies used
- ✅ No personal data collected
- ✅ No cross-site tracking
- ✅ Data processed in EU (if using EU hosting)
- ✅ No cookie consent banner required

### Data Collected

Plausible collects only:

- Page URL
- Referrer
- Device type (mobile/desktop/tablet)
- Browser
- Operating system
- Country/region (anonymized)

### Data NOT Collected

- ❌ IP addresses (anonymized before storage)
- ❌ Personal identifiers
- ❌ Cookie data
- ❌ Cross-site behavior
- ❌ Fingerprinting data

## Performance Impact

### Script Size
- **Plausible Script**: ~1KB (minified + gzipped)
- **Load Strategy**: Deferred (non-blocking)
- **Performance Impact**: Negligible (< 1ms)

### Core Web Vitals
- **LCP**: No impact
- **FID**: No impact
- **CLS**: No impact

## Development vs Production

### Development Mode

In development, events are logged to the console:

```typescript
if (import.meta.env.DEV) {
  console.log('[Analytics]', event.name, event.properties);
}
```

This allows you to verify events are firing correctly without sending data to Plausible.

### Production Mode

In production, events are sent to Plausible:

```typescript
if (window.plausible) {
  window.plausible(event.name, { props: event.properties });
}
```

## Testing Analytics

### Manual Testing

1. Open browser DevTools console
2. Perform actions that trigger events
3. Verify console logs show event data
4. Check Plausible dashboard for events (may take 1-2 minutes)

### Automated Testing

Add analytics tests to your test suite:

```typescript
describe('Analytics', () => {
  it('tracks video play events', () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    // Trigger video play
    expect(trackEventSpy).toHaveBeenCalledWith({
      name: 'video_play',
      properties: expect.any(Object)
    });
  });
});
```

## Troubleshooting

### Events Not Showing in Dashboard

**Issue**: Events not appearing in Plausible dashboard

**Solutions**:
1. Wait 1-2 minutes (Plausible has slight delay)
2. Check browser console for errors
3. Verify `window.plausible` is defined
4. Check network tab for Plausible API calls
5. Verify domain matches Plausible configuration

### Events Not Firing

**Issue**: Events not being tracked

**Solutions**:
1. Check console for tracking function calls
2. Verify component is mounted
3. Check event handler is attached
4. Verify analytics utility is imported correctly

### Duplicate Events

**Issue**: Same event firing multiple times

**Solutions**:
1. Check for duplicate event listeners
2. Verify `useEffect` cleanup functions
3. Check for multiple component instances
4. Add debouncing if needed

## Advanced Configuration

### Custom Properties

Add custom properties to events:

```typescript
trackEvent({
  name: AnalyticsEvents.CASE_STUDY_OPEN,
  properties: {
    id: caseStudyId,
    title: caseStudyTitle,
    client: caseStudyClient
  }
});
```

### Event Filtering

Filter events in Plausible dashboard:

1. Go to **Insights** > **Custom Events**
2. Click on specific event
3. Apply filters (date range, properties, etc.)
4. Export filtered data

### Goals and Conversions

Set up conversion goals in Plausible:

1. Go to **Settings** > **Goals**
2. Click **Add Goal**
3. Choose **Custom Event**
4. Enter event name (e.g., `contact_form_success`)
5. Save goal
6. View conversion rates in dashboard

## Integration with Other Tools

### Google Search Console

Link Plausible with Google Search Console:

1. Go to **Settings** > **Search Console**
2. Follow integration steps
3. View organic search performance alongside analytics

### Zapier Integration

Automate workflows with Zapier:

1. Go to **Settings** > **Integrations** > **Zapier**
2. Connect your Zapier account
3. Create zaps triggered by analytics events
4. Example: Send Slack notification on form submission

### Webhooks

Set up webhooks for real-time notifications:

1. Go to **Settings** > **Integrations** > **Webhooks**
2. Add webhook URL
3. Select events to trigger webhook
4. Receive real-time data in your systems

## Best Practices

### Event Naming

- Use clear, descriptive event names
- Follow consistent naming convention
- Use snake_case for event names
- Include context in properties

### Property Usage

- Keep properties simple and relevant
- Avoid sensitive data in properties
- Use consistent property names
- Limit number of properties per event

### Performance

- Don't track every user action
- Focus on meaningful interactions
- Avoid tracking in tight loops
- Use debouncing for frequent events

### Privacy

- Never track personal data
- Anonymize all user data
- Be transparent about tracking
- Provide opt-out mechanism if needed

## Future Enhancements

Potential analytics improvements:

1. **A/B Testing**: Track conversion rates for different CTAs
2. **Heatmaps**: Visualize user interaction patterns
3. **Session Replay**: Debug UX issues (with privacy safeguards)
4. **Cohort Analysis**: Track user behavior over time
5. **Predictive Analytics**: Forecast conversion trends

## Support

For analytics-related issues:

- **Plausible Documentation**: https://plausible.io/docs
- **Plausible Community**: https://github.com/plausible/analytics/discussions
- **Plausible Support**: support@plausible.io

---

**Last Updated**: 2026-08-15  
**Status**: Active and operational
