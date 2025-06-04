import React, { useState } from 'react';

const VinylPlayer = ({ song, onGenreSelect, onAddToCrate }) => {
  const [playing, setPlaying] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    setPlaying((p) => !p);
  };

  return (
    <div className="bg-gray-800 p-4 rounded w-80 mx-auto">
      <div
        className="relative w-full aspect-square perspective cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 preserve-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-2">
            <img
              src={song.image}
              alt={song.title}
              className={`rounded-full w-48 h-48 object-cover ${
                playing ? 'animate-spin-slow' : ''
              }`}

              onClick={togglePlay}
            />
            <button
              onClick={togglePlay}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCrate(song);
              }}
              className="bg-purple-600 text-white px-2 py-1 rounded"
            >
              Add to Crate
            </button>
            <p className="mt-2 text-center">
              <strong>{song.title}</strong> — {song.artist}
            </p>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-center items-center p-4 bg-gray-900 text-white gap-2 rounded">
            <h2 className="text-lg font-bold">{song.artist}</h2>
            <p className="text-sm mb-2 text-center">{song.bio}</p>
            <div className="flex flex-wrap gap-2">
              {song.genre.map((g) => (
                <button
                  key={g}
                  onClick={(e) => {
                    e.stopPropagation();
                    onGenreSelect(g);
                  }}
                  className="bg-blue-700 text-xs px-2 py-1 rounded"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylPlayer;
