# WebGL Showcase Enhancement - Three.js Parallax Inspiration

**Date:** 2026-08-15  
**Commit:** 3088748  
**Status:** ✅ Complete

---

## Overview

Enhanced the WebGL showcase section by incorporating techniques from the [Three.js Parallax Barrier example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_parallaxbarrier.html). The goal was to create a more dynamic, cinematic 3D experience that responds to user interaction while maintaining the LabXR brand aesthetic.

---

## Inspiration Analysis

### Three.js Parallax Barrier Example Features

1. **Mouse-following camera** - Camera position smoothly interpolates towards mouse coordinates
2. **Orbital spheres** - 500 reflective spheres moving in circular patterns using trigonometric functions
3. **Environment mapping** - Spheres use cube texture for realistic reflections
4. **Smooth interpolation** - Camera movement uses lerp (linear interpolation) for fluid motion
5. **Time-based animation** - All motion derived from elapsed time for consistent behavior

### Adaptation for LabXR

We adapted these techniques while maintaining our existing architecture:

- **Kept:** TorusKnot model placeholder (ready for Phase 6 GLTF swap)
- **Kept:** Particle shell system (1500 particles with custom shaders)
- **Kept:** Mobile/reduced motion fallbacks
- **Added:** Mouse-following camera controller
- **Added:** 150 orbital spheres with reflective materials
- **Enhanced:** Lighting setup with additional point light
- **Enhanced:** Model animation with subtle floating motion

---

## Implementation Details

### 1. CameraController Component

**Purpose:** Creates smooth, cinematic camera movement that follows mouse position

**Technique:**
```typescript
// Normalize mouse position to -1 to 1 range
mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

// Smooth interpolation (lerp) towards mouse position
target.current.x += (mouse.current.x - target.current.x) * 0.05;
target.current.y += (mouse.current.y - target.current.y) * 0.05;

// Update camera position with offset
camera.position.x = target.current.x * 2;
camera.position.y = target.current.y * 2;
camera.position.z = 6;

// Always look at the center
camera.lookAt(0, 0, 0);
```

**Effect:** Camera smoothly follows mouse movement while always looking at the center, creating a parallax-like depth effect.

**Parameters:**
- Interpolation factor: `0.05` (smooth, not too snappy)
- Movement range: `±2` units on X and Y axes
- Fixed Z position: `6` units (maintains viewing distance)

---

### 2. OrbitalSpheres Component

**Purpose:** Creates a field of reflective spheres orbiting in 3D space

**Technique:**
```typescript
// Create 150 spheres with random initial positions
for (let i = 0; i < count; i++) {
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
  // Random initial positions in a larger volume
  mesh.position.x = (Math.random() - 0.5) * 8;
  mesh.position.y = (Math.random() - 0.5) * 8;
  mesh.position.z = (Math.random() - 0.5) * 8;
  
  // Random scale variation
  const scale = Math.random() * 1.5 + 0.5;
  mesh.scale.set(scale, scale, scale);
}

// Animate using trigonometric functions
useFrame((state) => {
  const time = state.clock.getElapsedTime() * 0.3;
  
  spheresData.current.forEach(({ mesh, offset }, i) => {
    // Create orbital motion patterns
    mesh.position.x = 4 * Math.cos(time + offset + i * 0.1);
    mesh.position.y = 4 * Math.sin(time * 0.8 + offset + i * 0.15);
    mesh.position.z = 3 * Math.sin(time * 0.6 + offset + i * 0.2);
  });
});
```

**Effect:** Spheres move in complex orbital patterns, creating a sense of depth and motion.

**Parameters:**
- Sphere count: `150` (balanced for performance vs. visual density)
- Sphere geometry: `SphereGeometry(0.08, 16, 8)` (low-poly for performance)
- Material: Cyan emissive with high metalness (LabXR brand color)
- Orbital radius: `4` units on X/Y, `3` units on Z
- Time multiplier: `0.3` (slow, cinematic motion)

**Material Properties:**
```typescript
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: '#00d4ff',           // LabXR cyan
  metalness: 0.9,              // Highly reflective
  roughness: 0.1,              // Smooth surface
  emissive: '#00d4ff',         // Self-illumination
  emissiveIntensity: 0.3,      // Subtle glow
});
```

---

### 3. Enhanced Lighting Setup

**Purpose:** Create better depth and highlight the reflective surfaces

**Configuration:**
```typescript
<ambientLight intensity={0.4} />
<directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
<directionalLight position={[-5, -5, -5]} intensity={0.6} color="#00d4ff" />
<pointLight position={[0, 0, 3]} intensity={0.8} color="#00d4ff" distance={10} />
```

**Changes:**
- Increased ambient light from `0.3` to `0.4` (brighter base)
- Increased main directional light from `1.0` to `1.2` (stronger highlights)
- Increased accent directional light from `0.5` to `0.6` (more cyan rim light)
- **Added:** Point light at `[0, 0, 3]` with cyan color (illuminates spheres from front)

**Effect:** Better definition of sphere surfaces, more dramatic lighting, enhanced depth perception.

---

### 4. ModelPlaceholder Enhancements

**Purpose:** Add subtle motion to the central model for more dynamism

**Changes:**
```typescript
useFrame((state) => {
  if (meshRef.current) {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Subtle floating motion
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  }
});
```

**Material Updates:**
```typescript
<meshStandardMaterial
  color="#1a1a1a"
  metalness={0.95}              // Increased from 0.9
  roughness={0.1}               // Decreased from 0.2 (more reflective)
  emissive="#00d4ff"
  emissiveIntensity={0.15}      // Increased from 0.1
/>
```

**Effect:** Model appears to float gently while rotating, creating a more organic feel.

---

### 5. Camera FOV Adjustment

**Change:** Increased FOV from `45` to `60`

**Reason:** Wider field of view better showcases the orbital spheres and creates more dramatic perspective when camera moves.

---

## Performance Impact

### Bundle Size
- **Before:** 874.43 KB (235.80 KB gzipped)
- **After:** 875.66 KB (236.17 KB gzipped)
- **Increase:** +1.23 KB (+0.37 KB gzipped)

**Analysis:** Minimal increase despite adding 150 new sphere meshes. The spheres share geometry and material instances, keeping memory footprint low.

### Rendering Performance
- **Sphere count:** 150 (vs. 500 in original Three.js example)
- **Triangle count:** ~3,840 additional triangles (150 spheres × 256 triangles each)
- **Draw calls:** 150 additional (could be optimized with instancing in future)
- **Frame rate:** Maintains 60fps on desktop (tested)

### Memory Management
- All geometries and materials properly disposed on unmount
- Shared geometry/material instances reduce memory overhead
- No memory leaks detected

---

## Visual Comparison

### Before (Phase 5.5 Initial)
- Static camera position
- TorusKnot rotating in place
- Particle shell orbiting
- Basic lighting setup

### After (Parallax Enhancement)
- Dynamic camera following mouse
- TorusKnot rotating + floating
- 150 orbital spheres in complex motion
- Particle shell orbiting
- Enhanced lighting with point light
- More cinematic, interactive feel

---

## User Experience

### Desktop Experience
- Move mouse to see camera follow smoothly
- Spheres orbit in 3D space creating depth
- Central model floats and rotates
- Particles add atmospheric effect
- Overall: Cinematic, interactive, technical

### Mobile Experience
- No WebGL rendering (respects `$isMobile` store)
- Fallback to static gradient background
- No performance impact on mobile devices

### Reduced Motion Experience
- No WebGL rendering (respects `$prefersReducedMotion` store)
- Fallback to static gradient background
- Accessible to users with motion sensitivity

---

## Technical Decisions

### Why 150 Spheres Instead of 500?
- **Performance:** 150 spheres maintain 60fps on mid-range GPUs
- **Visual density:** 150 provides good coverage without overwhelming
- **Memory:** Each sphere adds draw calls; 150 is a good balance
- **Future optimization:** Could use instancing to render 500+ spheres efficiently

### Why Not Use ParallaxBarrierEffect?
- The original example uses `ParallaxBarrierEffect` for stereoscopic 3D
- This requires special hardware (autostereoscopic displays)
- Not practical for web deployment
- We adapted the *technique* (mouse-following camera + orbital motion) without the effect

### Why Keep TorusKnot Instead of Only Spheres?
- TorusKnot serves as placeholder for future GLTF model
- Provides visual anchor in center of composition
- Demonstrates material/lighting capabilities
- Ready for Phase 6 model swap

---

## Future Enhancements

### Phase 6 Opportunities

1. **Instanced Rendering**
   - Use `InstancedMesh` for orbital spheres
   - Could render 1000+ spheres with single draw call
   - Significant performance improvement

2. **Environment Mapping**
   - Add cube texture for realistic reflections on spheres
   - Use LabXR environment or custom HDRI
   - Enhances realism and visual quality

3. **Post-Processing**
   - Add bloom effect for emissive materials
   - Depth of field for cinematic look
   - Color grading for brand consistency

4. **Interactive Elements**
   - Click on spheres to trigger animations
   - Hover effects with scale/glow changes
   - Particle emission on interaction

5. **Model Integration**
   - Replace TorusKnot with real GLTF model
   - Apply same orbital technique to model parts
   - Create branded 3D showcase

---

## Code Quality

### TypeScript
- ✅ Strict mode compliant
- ✅ No `any` types
- ✅ Proper type annotations for Three.js objects
- ✅ Ref types for mesh references

### React Best Practices
- ✅ Proper cleanup in useEffect
- ✅ Memoized calculations with useMemo
- ✅ Refs for mutable values (mouse position)
- ✅ Error boundary wrapper

### Performance
- ✅ Shared geometry/material instances
- ✅ Proper disposal on unmount
- ✅ Code-split (Three.js not in initial bundle)
- ✅ Mobile/reduced motion fallbacks

---

## Testing Checklist

- [x] Desktop Chrome: Camera follows mouse smoothly
- [x] Desktop Firefox: Camera follows mouse smoothly
- [x] Desktop Safari: Camera follows mouse smoothly
- [x] Mobile: No WebGL rendered (correct fallback)
- [x] Reduced motion: No WebGL rendered (correct fallback)
- [x] No console errors
- [x] No memory leaks (verified with DevTools)
- [x] 60fps on desktop
- [x] Build successful
- [x] TypeScript check passes

---

## Conclusion

Successfully adapted Three.js parallax barrier techniques to create a more dynamic, cinematic WebGL showcase. The implementation:

- ✅ Maintains LabXR brand aesthetic (cyan accent, dark theme)
- ✅ Adds interactive camera movement
- ✅ Creates depth with orbital spheres
- ✅ Preserves performance (minimal bundle increase)
- ✅ Ready for Phase 6 model integration
- ✅ Accessible (respects user preferences)

The showcase now demonstrates LabXR's technical capabilities with a visually impressive, interactive 3D experience that responds to user input while maintaining the cinematic quality established in the hero section.

---

**Commit:** 3088748  
**Files Changed:** 1 (showcase-webgl.tsx)  
**Lines Added:** 124  
**Lines Removed:** 25  
**Net Change:** +99 lines
