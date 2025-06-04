import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getRecommendations } from '../SpotifyService';
import VinylCard from './VinylCard';

const SwipeView = () => {
  const { token } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!token) return;
    const seed = '4uLU6hMCjMI75M1A2tKUQC';
    getRecommendations(token, seed).then((data) => setTracks(data.tracks));
  }, [token]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <VinylCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default SwipeView;
