import React from 'react';

const GenreFilter = ({ genre, songs, onSelectSong, onClose }) => {
  const filtered = songs.filter((s) => s.genre.includes(genre));

  return (
    <div className="p-4 text-white w-full">
      <h3 className="text-xl font-bold mb-4 text-center">Genre: {genre}</h3>
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((song) => (
          <div
            key={song.id}
            className="cursor-pointer text-center"
            onClick={() => onSelectSong(song)}
          >
            <img
              src={song.image}
              alt={song.title}
              className="rounded-full w-32 h-32 object-cover mx-auto"
            />
            <p className="mt-2 text-sm">
              <strong>{song.title}</strong>
              <br />
              {song.artist}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-700 px-3 py-1 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default GenreFilter;
