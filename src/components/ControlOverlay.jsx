import React from 'react';
import { Html } from '@react-three/drei';

export default function ControlOverlay({
  playing,
  onPlayPause,
  onView,
  onInfo,
  onAdd,
}) {
  return (
    <Html position={[0, 2.5, 0]} center>
      <div className="flex gap-2">
        <button onClick={onPlayPause} className="bg-blue-600 text-white px-2 py-1 rounded">
          {playing ? '⏸ Pause' : '▶️ Play'}
        </button>
        <button onClick={onView} className="bg-gray-700 text-white px-2 py-1 rounded">
          View Album
        </button>
        <button onClick={onInfo} className="bg-gray-700 text-white px-2 py-1 rounded">
          Album Info
        </button>
        <button onClick={onAdd} className="bg-purple-600 text-white px-2 py-1 rounded">
          Add
        </button>
      </div>
    </Html>
  );
}
