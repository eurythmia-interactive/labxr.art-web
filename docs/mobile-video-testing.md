# Mobile Video Playback Testing Guide

## Overview
This guide documents the testing process for video playback across all mobile devices and browsers.

## Test Matrix

### Android Devices
- **Chrome** (latest)
- **Firefox** (latest)
- **Samsung Internet** (latest)
- **Edge** (latest)

### iOS Devices
- **Safari** (iOS 14+)
- **Chrome** (iOS 14+)

### Tablet Devices
- **iPad** (portrait and landscape)
- **Android tablets** (various sizes)

## Test Scenarios

### 1. Hero Section Video (Autoplay)
**Desktop:**
- [ ] Video autoplays muted
- [ ] Video loops continuously
- [ ] No controls visible by default
- [ ] Controls appear on hover

**Mobile:**
- [ ] Play button overlay visible
- [ ] "Tap to play" text visible
- [ ] Tap play button starts video
- [ ] Video plays inline (not fullscreen)
- [ ] Pause button works
- [ ] Loading indicator shows during buffering

### 2. Portfolio Modal Videos
**Desktop:**
- [ ] Click portfolio card opens modal
- [ ] Video autoplays muted in modal
- [ ] Controls visible
- [ ] Close modal stops video

**Mobile:**
- [ ] Tap portfolio card opens modal
- [ ] Play button visible in modal
- [ ] Tap play starts video
- [ ] Video plays inline
- [ ] Close modal stops video

### 3. Diagnostic Route (/dev/video-player)
**All Devices:**
- [ ] Test 1: Autoplay muted (desktop) / tap to play (mobile)
- [ ] Test 2: Manual play with controls
- [ ] Test 3: Square aspect ratio
- [ ] Diagnostic info displays correctly

## Known Issues & Fixes

### Issue 1: Android Chrome Not Playing
**Symptoms:**
- Click play button, nothing happens
- No error messages visible

**Fixes Applied:**
1. Added `webkit-playsinline`, `x5-playsinline`, `x5-video-player-type` attributes
2. Improved touch event handling with `onTouchStart`
3. Added proper error handling with retry button
4. Increased play button size for better touch targets
5. Added "Tap to play" text for clarity

### Issue 2: iOS Autoplay Restrictions
**Symptoms:**
- Video doesn't autoplay even when muted

**Fixes Applied:**
1. Added `playsInline` attribute
2. Added `webkit-playsinline` for Safari
3. Ensured `muted` attribute is set
4. Implemented tap-to-play fallback

### Issue 3: Modal Video Not Loading
**Symptoms:**
- Modal opens but video shows loading spinner indefinitely

**Fixes Applied:**
1. Added proper state management for dialog open/close
2. Ensured video player re-initializes when modal opens
3. Added loading indicator
4. Added error state with retry option

## Video Encoding Requirements

### Mobile-Compatible Settings
- **Codec:** H.264 (AVC) - universal support
- **Resolution:** Max 1920x1080 (1080p)
- **Frame Rate:** 30fps
- **Audio:** AAC, 128kbps
- **Container:** MP4

### Compression Script
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 20 \
  -preset medium \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  output.mp4
```

## Browser-Specific Notes

### Android Chrome
- Requires user interaction for autoplay (even muted)
- Supports `playsInline` attribute
- May block autoplay if battery saver is on

### iOS Safari
- Requires `playsInline` attribute
- Requires `muted` attribute for autoplay
- Strict autoplay policy
- May show native controls

### Samsung Internet
- Similar to Chrome
- Supports `x5-playsinline` attribute
- May have different autoplay policies

## Debugging Tips

### Remote Debugging Android
1. Enable USB debugging on device
2. Connect via USB
3. Open Chrome on desktop
4. Navigate to `chrome://inspect`
5. Select device and tab
6. Inspect console for errors

### Remote Debugging iOS
1. Enable Web Inspector on device (Settings > Safari > Advanced)
2. Connect via USB
3. Open Safari on Mac
4. Enable Develop menu (Preferences > Advanced)
5. Select device and tab
6. Inspect console for errors

## Performance Considerations

### Mobile Optimization
- Use `preload="metadata"` to reduce initial load
- Lazy load videos with IntersectionObserver
- Compress videos to < 2MB when possible
- Use poster images to prevent layout shift

### Memory Management
- Pause videos when off-screen
- Remove video src when modal closes
- Clean up event listeners on unmount

## Testing Checklist

Before deploying, verify:
- [ ] Videos play on Android Chrome
- [ ] Videos play on iOS Safari
- [ ] Videos play on iPad
- [ ] Autoplay works on desktop
- [ ] Tap-to-play works on mobile
- [ ] Modal videos work correctly
- [ ] Loading indicators show properly
- [ ] Error states handled gracefully
- [ ] No console errors
- [ ] Performance is acceptable (LCP < 2.5s)

---

**Last Updated:** 2026-08-13  
**Status:** Fixes applied, testing in progress
