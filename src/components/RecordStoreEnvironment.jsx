import React from 'react';
import { Environment } from '@react-three/drei';
import { mockSongs } from '../data/mockSongs.js';
import WallShelf from './WallShelf.jsx';

export default function RecordStoreEnvironment({ onSelectAlbum, hiddenIndex }) {
  const records = mockSongs;
  return (
    <group>
      <Environment preset="dawn" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#554433" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -10]} receiveShadow>
        <boxGeometry args={[20, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Left Wall — lengthened from 20 → 30 */}
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Right Wall — lengthened from 20 → 30 */}
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 2, 10]} receiveShadow>
        <boxGeometry args={[20, 8, 0.1]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Album Shelf */}
      <WallShelf albums={records} onSelect={onSelectAlbum} hiddenIndex={hiddenIndex} />
    </group>
  );
}
