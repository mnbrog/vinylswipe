import React from 'react';
import { useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

export default function FlyingAlbum({ album, from, to, onEnd }) {
  const texture = useTexture(album.image);
  const { pos } = useSpring({
    from: { pos: from },
    to: async (next) => {
      await next({ pos: [from[0], from[1], from[2] + 0.5] });
      await next({ pos: to });
    },
    config: { mass: 1, tension: 120, friction: 20 },
    onRest: onEnd,
  });
  return (
    <animated.mesh position={pos} castShadow>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </animated.mesh>
  );
}
