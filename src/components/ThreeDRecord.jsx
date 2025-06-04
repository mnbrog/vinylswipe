import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RecordMesh({ playing }) {
  const ref = useRef();
  useFrame(() => {
    if (playing && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={ref} castShadow>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.02, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.022, 32]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
    </group>
  );
}

function ThreeDRecord({ playing = false }) {
  if (typeof document !== 'undefined') {
    const testCanvas = document.createElement('canvas');
    const gl =
      testCanvas.getContext('webgl') ||
      testCanvas.getContext('experimental-webgl');
    if (!gl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
          WebGL not supported
        </div>
      );
    }
  }

  return (
    <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <RecordMesh playing={playing} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.011, 0]}
        receiveShadow
      >
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDRecord;
