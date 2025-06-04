import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

function Vinyl({ albumCoverUrl, playing, flipped, onFlip }) {
  const ref = useRef();
  const texture = useTexture(albumCoverUrl);
  useFrame(() => {
    if (playing && !flipped && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    onFlip();
  };

  return (
    <group ref={ref} castShadow onPointerDown={handlePointerDown}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.02, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* top label */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.001, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* bottom label */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.011, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.001, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}

function Tonearm() {
  return (
    <group>
      <mesh position={[-0.8, 0.05, 0.8]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
        <meshStandardMaterial color="#b0b0b0" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.02, 0.2]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.1]} />
        <meshStandardMaterial color="silver" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Turntable({ children }) {
  const wood = '#654321';
  return (
    <group>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color={wood} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.1, 64]} />
        <meshStandardMaterial color="#888" metalness={1} roughness={0.4} />
      </mesh>
      {children}
      <Tonearm />
    </group>
  );
}

function InfoPanel({ artistInfo }) {
  const { name, title, genres, bio } = artistInfo || {};
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 text-white p-4 rounded">
      <h2 className="text-lg font-bold mb-1">{name}</h2>
      <p className="text-sm italic mb-2">{title}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {genres && genres.map((g) => (
          <span key={g} className="bg-blue-700 text-xs px-2 py-1 rounded">
            {g}
          </span>
        ))}
      </div>
      <p className="text-sm text-center">{bio}</p>
    </div>
  );
}

function ThreeDRecordPlayer({ playing: controlledPlaying = false, albumCoverUrl, artistInfo, onToggle }) {
  const [localPlaying, setLocalPlaying] = useState(controlledPlaying);
  const [flipped, setFlipped] = useState(false);
  const isControlled = typeof onToggle === 'function';
  const playing = isControlled ? controlledPlaying : localPlaying;

  const handleToggle = () => {
    if (isControlled) {
      onToggle(!controlledPlaying);
    } else {
      setLocalPlaying(!localPlaying);
    }
  };

  const handleFlip = () => {
    setFlipped((f) => !f);
  };

  return (
    <div className="relative w-full h-full">
      <Canvas shadows camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <Turntable>
          <Vinyl albumCoverUrl={albumCoverUrl} playing={playing} flipped={flipped} onFlip={handleFlip} />
        </Turntable>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
        <OrbitControls />
      </Canvas>
      {flipped && <InfoPanel artistInfo={artistInfo} />}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        <button onClick={handleToggle} className="bg-blue-600 text-white px-2 py-1 rounded">
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleFlip} className="bg-gray-700 text-white px-2 py-1 rounded">
          Flip
        </button>
      </div>
    </div>
  );
}

export default ThreeDRecordPlayer;
