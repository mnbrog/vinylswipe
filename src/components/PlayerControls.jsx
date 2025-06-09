import React from 'react';
import { usePlayback } from '../contexts/PlaybackContext.jsx';

export default function PlayerControls() {
  const { isPlaying, toggle, volume, setVolume } = usePlayback();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-2 flex items-center gap-4">
      <button onClick={toggle} className="bg-purple-600 px-4 py-1 rounded">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(Number(e.target.value))} />
    </div>
  );
}
