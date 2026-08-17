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

// ModelPlaceholder: Lightweight procedural geometry
// TODO: Phase 6 - Replace with useGLTF('/models/labxr-model.glb') when real assets are ready
function ModelPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.2}
        emissive="#00d4ff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const { size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, scales } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    // Distribute particles in a shell around the model
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 1.5; // Shell from 2.5 to 4.0

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

export function ShowcaseWebGL() {
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
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
          
          {/* 3D Model */}
          <ModelPlaceholder />
          
          {/* Generative Particles */}
          <Particles />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
