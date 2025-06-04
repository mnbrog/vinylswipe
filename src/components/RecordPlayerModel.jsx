import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function Vinyl({ album, playing, lifted, onGenreSelect }) {
  const group = useRef();
  const labelTexture = useTexture(album.coverUrl);

  const { position, rotation } = useSpring({
    position: lifted ? [0, 0, 0] : [0, 1.5, -1],
    rotation: lifted ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(() => {
    if (playing && group.current && lifted) {
      group.current.rotation.y += 0.02;
    }
  });

  return (
    <animated.group ref={group} position={position} rotation={rotation} castShadow>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={labelTexture} side={THREE.DoubleSide} />
      </mesh>
      {lifted && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
            <meshBasicMaterial map={labelTexture} />
          </mesh>
        </group>
      )}
    </animated.group>
  );
}

export default function RecordPlayerModel({ album, playing, lifted, onGenreSelect }) {
  const knobRef = useRef();
  const [knob, setKnob] = useState(0);
  const woodTexture = useTexture('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1024&q=80');
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
        <meshStandardMaterial map={woodTexture} />
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
        onGenreSelect={onGenreSelect}
      />
    </group>
  );
}
