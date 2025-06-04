import React, { useState } from 'react';

const PlaylistModal = ({ onConfirm, onClose }) => {
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-gray-800 p-6 rounded w-80">
        <h3 className="text-xl font-bold mb-4 text-white">Add to Playlist</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="w-full p-2 mb-4 text-black"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => name && onConfirm(name)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
