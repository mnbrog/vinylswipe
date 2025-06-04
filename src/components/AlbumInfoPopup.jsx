import React from 'react';

export default function AlbumInfoPopup({ song, open, onClose = () => {}, onGenreClick = () => {} }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-24 flex justify-center transition-transform duration-300 z-10 pointer-events-none ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="relative pointer-events-auto bg-gray-800 bg-opacity-90 text-white p-4 rounded w-80 shadow-lg">
        <button onClick={onClose} className="absolute top-1 right-1 text-white">
          ✕
        </button>
        <h2 className="text-lg font-bold">{song.artist}</h2>
        <p className="text-sm mb-2">{song.title}</p>
        <p className="text-xs mb-2">{song.bio}</p>
        <div className="flex flex-wrap gap-2">
          {song.genre.map((g) => (
            <button key={g} onClick={() => onGenreClick(g)} className="bg-blue-700 px-2 py-0.5 text-xs rounded">
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
