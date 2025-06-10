import React from 'react';
import { Environment } from '@react-three/drei';
import { mockSongs } from '../data/mockSongs.js';
import WallShelf from './WallShelf.jsx';


export default function RecordStoreEnvironment({ onSelectAlbum }) {
  const records = mockSongs;
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
      {/* Shelf supporting the record player */}
      <mesh position={[0, -1.65, -8.5]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.2, 2.5]} />
        <meshStandardMaterial color="#7b5237" />
      </mesh>
      {/* Wall shelf of albums */}
      <WallShelf albums={records} onSelect={onSelectAlbum} />
    </group>
  );
}
