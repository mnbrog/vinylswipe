import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getRecommendations, getRecommendationsByGenre } from '../SpotifyService.js';
import VinylCard from './VinylCard.jsx';

const SwipeView = () => {
  const { token } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (!token) return;
    if (genre) {
      getRecommendationsByGenre(token, genre).then((data) => setTracks(data.tracks));
    } else {
      const seed = '4uLU6hMCjMI75M1A2tKUQC';
      getRecommendations(token, seed).then((data) => setTracks(data.tracks));
    }
  }, [token, genre]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <VinylCard key={track.id} track={track} onGenreSelect={(g) => setGenre(g)} />
      ))}
    </div>
  );
};

export default SwipeView;
