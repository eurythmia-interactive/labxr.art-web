import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useStore } from '@nanostores/react';
import { $isMobile } from '@/lib/stores/device';
import { $prefersReducedMotion } from '@/lib/stores/motion';
import { isWebGLAvailable } from '@/lib/three/webgl-detect';
import * as THREE from 'three';

import vertexShader from '@/assets/shaders/particles.vert?raw';
import fragmentShader from '@/assets/shaders/particles.frag?raw';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const { size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, scales } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * 2 + 0.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      scales[i] = Math.random() * 0.5 + 0.5;
    }

    return { positions, scales };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame((state) => {
    if (points.current) {
      const material = points.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    }
  });

  useEffect(() => {
    return () => {
      if (points.current) {
        const geometry = points.current.geometry;
        const material = points.current.material as THREE.ShaderMaterial;
        
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroWebGL() {
  const isMobile = useStore($isMobile);
  const prefersReducedMotion = useStore($prefersReducedMotion);
  const [webGLAvailable, setWebGLAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebGLAvailable(isWebGLAvailable());
    }
  }, []);

  if (isMobile || prefersReducedMotion || !webGLAvailable) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Particles />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
