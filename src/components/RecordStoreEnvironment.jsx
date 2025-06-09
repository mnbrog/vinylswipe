import React from 'react';
import { useTexture, Environment } from '@react-three/drei';
import { mockSongs } from '../data/mockSongs.js';

function VinylRecord({ image, position }) {
  const texture = useTexture(image);
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

export default function RecordStoreEnvironment() {
  const records = mockSongs.slice(0, 4);
  return (
    <group>
      <Environment preset="dawn" />
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#554433" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 2, -10]} receiveShadow>
        <boxGeometry args={[20, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      {/* Table */}
      <mesh position={[0, -1.9, 0]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.3, 4]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Simple Shelves */}
      <mesh position={[-3, 0, -3]} receiveShadow>
        <boxGeometry args={[0.4, 2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[3, 0, -3]} receiveShadow>
        <boxGeometry args={[0.4, 2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Records */}
      {records.map((song, idx) => (
        <VinylRecord key={song.id} image={song.image} position={[-1.5 + idx, -1.85, 1]} />
      ))}
    </group>
  );
}
