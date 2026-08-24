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

// Camera controller that follows mouse movement with smooth interpolation
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Smooth interpolation (lerp) towards mouse position
    target.current.x += (mouse.current.x - target.current.x) * 0.05;
    target.current.y += (mouse.current.y - target.current.y) * 0.05;

    // Update camera position with offset
    camera.position.x = target.current.x * 2;
    camera.position.y = target.current.y * 2;
    camera.position.z = 6;

    // Always look at the center
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Orbital spheres inspired by Three.js parallax barrier example
function OrbitalSpheres() {
  const spheresRef = useRef<THREE.Group>(null);
  const spheresData = useRef<Array<{ mesh: THREE.Mesh; offset: number }>>([]);

  const { spheres } = useMemo(() => {
    const count = 150;
    const sphereGeometry = new THREE.SphereGeometry(0.08, 16, 8);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: '#00d4ff',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#00d4ff',
      emissiveIntensity: 0.3,
    });

    const sphereArray: Array<{ mesh: THREE.Mesh; offset: number }> = [];

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      
      // Random initial positions in a larger volume
      mesh.position.x = (Math.random() - 0.5) * 8;
      mesh.position.y = (Math.random() - 0.5) * 8;
      mesh.position.z = (Math.random() - 0.5) * 8;
      
      // Random scale variation
      const scale = Math.random() * 1.5 + 0.5;
      mesh.scale.set(scale, scale, scale);
      
      sphereArray.push({ mesh, offset: Math.random() * Math.PI * 2 });
    }

    spheresData.current = sphereArray;
    return { spheres: sphereArray, count };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.3;

    spheresData.current.forEach(({ mesh, offset }, i) => {
      // Create orbital motion patterns
      mesh.position.x = 4 * Math.cos(time + offset + i * 0.1);
      mesh.position.y = 4 * Math.sin(time * 0.8 + offset + i * 0.15);
      mesh.position.z = 3 * Math.sin(time * 0.6 + offset + i * 0.2);
    });
  });

  useEffect(() => {
    return () => {
      // Cleanup geometries and materials
      spheresData.current.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <group ref={spheresRef}>
      {spheres.map(({ mesh }, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}

// ModelPlaceholder: Lightweight procedural geometry
// TODO: Phase 6 - Replace with useGLTF('/models/labxr-model.glb') when real assets are ready
function ModelPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
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
        color="#00d4ff"
        metalness={0.95}
        roughness={0.1}
        emissive="#00d4ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);

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

  useFrame((state) => {
    if (points.current) {
      const material = points.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
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
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          {/* Camera controller for mouse-following */}
          <CameraController />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#00d4ff" />
          <pointLight position={[0, 0, 3]} intensity={0.8} color="#00d4ff" distance={10} />
          
          {/* Central 3D Model */}
          <ModelPlaceholder />
          
          {/* Orbital spheres (inspired by Three.js parallax example) */}
          <OrbitalSpheres />
          
          {/* Generative particle shell */}
          <Particles />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
