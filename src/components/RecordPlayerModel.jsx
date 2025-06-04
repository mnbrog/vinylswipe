import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

function Vinyl({ album, playing, lifted, showBack, onFlip, onGenreSelect }) {
  const group = useRef();
  const labelTexture = useTexture(album.coverUrl);

  const { position, rotation } = useSpring({
    position: lifted ? [0, 2, 0] : [0, 0, 0],
    rotation: [0, showBack ? Math.PI : 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(() => {
    if (playing && group.current && !lifted) {
      group.current.rotation.y += 0.02;
    }
  });

  return (
    <animated.group ref={group} position={position} rotation={rotation} onClick={onFlip} castShadow>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshBasicMaterial map={labelTexture} />
      </mesh>
      {showBack && (
        <Html rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} transform>
          <div className="bg-black bg-opacity-80 text-white p-2 rounded w-40 text-xs text-center">
            <p className="font-bold mb-1">{album.artist}</p>
            <p className="mb-2">{album.bio}</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {album.genre.map((g) => (
                <button
                  key={g}
                  onClick={() => onGenreSelect(g)}
                  className="bg-blue-700 px-2 py-0.5 rounded"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </Html>
      )}
    </animated.group>
  );
}

export default function RecordPlayerModel({ album, playing, lifted, showBack, onFlip, onGenreSelect }) {
  const knobRef = useRef();
  const [knob, setKnob] = useState(0);
  const dragging = useRef(false);

  useFrame(() => {
    if (knobRef.current) {
      knobRef.current.rotation.y = knob;
    }
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onPointerMove = (e) => {
    if (dragging.current) {
      setKnob((k) => Math.min(Math.PI / 2, Math.max(-Math.PI / 2, k + e.movementX * 0.01)));
    }
  };

  return (
    <group>
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[4, 0.3, 4]} />
        <meshStandardMaterial color="#8B5E3C" />
      </mesh>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#555" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.1, 64]} />
        <meshStandardMaterial color="#888" metalness={1} roughness={0.4} />
      </mesh>
      <mesh position={[-0.8, 0.05, 0.8]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
        <meshStandardMaterial color="#b0b0b0" metalness={1} roughness={0.3} />
      </mesh>
      <mesh
        ref={knobRef}
        position={[1, 0.2, 0.8]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        castShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#333" metalness={0.3} />
      </mesh>
      <Vinyl
        album={album}
        playing={playing}
        lifted={lifted}
        showBack={showBack}
        onFlip={onFlip}
        onGenreSelect={onGenreSelect}
      />
    </group>
  );
}
