import React from 'react';
import { useTexture, Html } from '@react-three/drei';

function Album({ album, position, onClick, hidden }) {
  if (hidden) return null;
  const texture = useTexture(album.image);
  return (
    <group position={position}>
      <mesh onClick={onClick} castShadow>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Html distanceFactor={0} position={[0, -0.8, 0]} style={{ pointerEvents: 'none' }}>
        <div className="text-xs text-white bg-black bg-opacity-60 px-1 rounded">
          {album.title} – {album.artist}
        </div>
      </Html>
    </group>
  );
}

export default function RoomShelf({ albums = [], onSelect, hiddenIndex }) {
  const boardWidth = 18;
  const boardHeight = 3.5;
  const rows = 2;
  const perRow = 10;
  const total = rows * perRow;
  const extended = Array.from({ length: total }, (_, i) => albums[i % albums.length]);

  const xStep = boardWidth / perRow;
  const yStep = 1.7;
  const xStart = -boardWidth / 2 + xStep / 2;
  const yStart = 1.3;

  const walls = [
    { key: 'back',  position: [0, 0, -9.6], rotation: [0, 0, 0] },
    { key: 'left',  position: [-9.6, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { key: 'right', position: [9.6, 0, 0],  rotation: [0, -Math.PI / 2, 0] },
    { key: 'front', position: [0, 0,  9.6], rotation: [0, Math.PI, 0] },
  ];

  return (
    <>
      {walls.map(({ key, position, rotation }) => (
        <group key={key} position={position} rotation={rotation}>
          {/* shelf board */}
          <mesh position={[0, -1.4, 0]} receiveShadow castShadow>
            <boxGeometry args={[boardWidth, 0.2, 2]} />
            <meshStandardMaterial color="#7b5237" />
          </mesh>
          <mesh position={[0, 0.4, -0.05]} receiveShadow>
            <boxGeometry args={[boardWidth, boardHeight, 0.1]} />
            <meshStandardMaterial color="#333" />
          </mesh>

          {/* albums */}
          {extended.map((album, idx) => {
            const x = xStart + (idx % perRow) * xStep;
            const y = yStart - Math.floor(idx / perRow) * yStep;
            return (
              <Album
                key={`${key}-${album.id}-${idx}`}
                album={album}
                position={[x, y, 0.06]}
                onClick={() =>
                  onSelect &&
                  onSelect(album, [x, y, 
                    key === 'back'  ? -9.54 :
                    key === 'front' ?  9.54 :
                    0
                  ], idx)
                }
                hidden={idx === hiddenIndex}
              />
            );
          })}
        </group>
      ))}
    </>
  );
}
