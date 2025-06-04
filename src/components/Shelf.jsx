import React, { useContext } from 'react';
import { ShelfContext } from '../contexts/ShelfContext.jsx';


const Shelf = () => {
  const { shelf } = useContext(ShelfContext);

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Shelf</h1>
      {shelf.map((track) => (
        <div key={track.id} className="mb-4">
          <p>
            {track.name} — {track.artists[0].name}
          </p>
        </div>
      ))}
      {shelf.length === 0 && <p>No tracks in shelf yet.</p>}
    </div>
  );
};

export default Shelf;
