import React, { useContext, useState, useEffect, useRef } from 'react';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { ShelfContext } from '../contexts/ShelfContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getArtist } from '../SpotifyService.js';
import beep from '../assets/beep.mp3';

const VinylCard = ({ track, onGenreSelect }) => {
  const { addToCrate } = useContext(CrateContext);
  const { addToShelf } = useContext(ShelfContext);
  const { token } = useContext(AuthContext);
  const [flipped, setFlipped] = useState(false);
  const [genres, setGenres] = useState([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (flipped && genres.length === 0 && token) {
      getArtist(token, track.artists[0].id).then((data) => {
        setGenres(data.genres || []);
      });
    }
  }, [flipped, token, track.artists, genres.length]);

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

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg">
      <div
        className={`relative w-full aspect-square perspective cursor-pointer`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`transition-transform duration-500 preserve-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute inset-0 backface-hidden flex items-center justify-center">
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className={`rounded-full w-48 h-48 object-cover ${
                playing ? 'animate-spin-slow' : ''
              }`}
              onClick={togglePlay}
            />
            {track.preview_url && (
              <audio
                ref={audioRef}
                src={track.preview_url}
                onEnded={() => setPlaying(false)}
              />
            )}
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 p-4 text-white flex flex-col justify-between">
            <div>
              <p className="font-bold">{track.name}</p>
              <p className="text-sm mb-2">{track.artists[0].name}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenreSelect && onGenreSelect(g);
                    }}
                    className="bg-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-600"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddShelf();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 text-sm rounded"
              >
                Add to Shelf
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddCrate();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-sm rounded"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylCard;

