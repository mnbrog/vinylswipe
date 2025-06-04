import React from 'react';

const Crate = ({ crate, onRemove, onProceed }) => {
  return (
    <div className="p-4 text-white w-full">
      <h3 className="text-xl font-bold mb-2">Your Crate</h3>
      {crate.length === 0 && <p>(No songs added yet)</p>}
      <ul className="mb-4">
        {crate.map((song) => (
          <li
            key={song.id}
            className="flex justify-between items-center mb-1"
          >
            <span>
              {song.title} — {song.artist}
            </span>
            <button
              onClick={() => onRemove(song.id)}
              className="text-red-400 hover:text-red-200"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {crate.length > 0 && (
        <button
          onClick={onProceed}
          className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
        >
          Add to Playlist
        </button>
      )}
    </div>
  );
};

export default Crate;
