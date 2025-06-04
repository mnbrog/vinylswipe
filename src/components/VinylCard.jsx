import React, { useContext } from 'react';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { ShelfContext } from '../contexts/ShelfContext.jsx';
import beep from '../assets/beep.mp3';

const VinylCard = ({ track }) => {
  const { addToCrate } = useContext(CrateContext);
  const { addToShelf } = useContext(ShelfContext);

  const playSound = () => {
    const audio = new Audio(beep);
    audio.play();
  };

  const handleAddCrate = () => {
    addToCrate(track);
    playSound();
  };

  const handleAddShelf = () => {
    addToShelf(track);
    playSound();
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg">
      <img src={track.album.images[0]?.url} alt={track.name} className="rounded mb-2" />
      <p className="text-white font-bold">{track.name}</p>
      <p className="text-gray-400 text-sm mb-2">{track.artists[0].name}</p>
      <div className="flex gap-2">
        <button
          onClick={handleAddShelf}
          className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 text-sm rounded"
        >
          Add to Shelf
        </button>
        <button
          onClick={handleAddCrate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-sm rounded"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default VinylCard;
