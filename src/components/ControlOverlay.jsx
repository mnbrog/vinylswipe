import React from 'react';
import { Html } from '@react-three/drei';

export default function ControlOverlay({
  playing,
  onPlayPause,
  onView,
  onInfo,
  onAddCrate,
  onAddShelf,
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
        <button onClick={onAddCrate} className="bg-blue-600 text-white px-2 py-1 rounded">
          Add to Crate
        </button>
        <button onClick={onAddShelf} className="bg-purple-600 text-white px-2 py-1 rounded">
          Add to Shelf
        </button>
      </div>
    </Html>
  );
}
