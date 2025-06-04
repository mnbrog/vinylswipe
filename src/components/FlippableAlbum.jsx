import React, { useState } from 'react';

export default function FlippableAlbum({
  song,
  flipped: flippedProp,
  onToggle,
  onAddToCrate = () => {},
  onGenreClick = () => {},
}) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const controlled = flippedProp !== undefined;
  const flipped = controlled ? flippedProp : internalFlipped;

  const handleGenreClick = (g, e) => {
    e.stopPropagation();
    onGenreClick(g);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCrate(song);
  };

  const handleToggle = () => {
    if (controlled) {
      onToggle && onToggle();
    } else {
      setInternalFlipped((f) => !f);
    }
  };

  return (
    <div
      className="w-full aspect-square cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={handleToggle}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <img src={song.image} alt={song.title} className="w-full h-full object-cover rounded shadow-lg" />
        </div>
        <div
          className="absolute inset-0 bg-gray-900 text-white p-4 rounded shadow-lg flex flex-col justify-between rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <h2 className="text-lg font-bold">{song.artist}</h2>
            <p className="text-sm mb-2">{song.title}</p>
            <p className="text-xs mb-2">{song.bio}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {song.genre.map((g) => (
                <button key={g} onClick={(e) => handleGenreClick(g, e)} className="bg-blue-700 px-2 py-1 text-xs rounded">
                  {g}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded mt-2">
            Add to Crate
          </button>
        </div>
      </div>
    </div>
  );
}
