import React, { useEffect, useContext, useState } from 'react';
import VinylPlayer from './VinylPlayer.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { ShelfContext } from '../contexts/ShelfContext.jsx';
import { getRecommendations, getRecommendationsByGenre } from '../SpotifyService.js';

const SwipeView = () => {
  const { token } = useContext(AuthContext);
  const { addToCrate } = useContext(CrateContext);
  const { addToShelf } = useContext(ShelfContext);
  const [track, setTrack] = useState(null);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (!token) return;
    if (genre) {
      getRecommendationsByGenre(token, genre).then((data) => {
        if (data.tracks.length > 0) setTrack(data.tracks[0]);
      });
    } else {
      const seed = '4uLU6hMCjMI75M1A2tKUQC';
      getRecommendations(token, seed).then((data) => {
        if (data.tracks.length > 0) setTrack(data.tracks[0]);
      });
    }
  }, [token, genre]);

  if (!track) return <div className="text-white p-10">Loading...</div>;

  return (
    <VinylPlayer
      song={{
        title: track.name,
        artist: track.artists[0].name,
        genre: [],
        bio: '',
        image: track.album.images[0]?.url,
        preview_url: track.preview_url,
      }}
      onGenreSelect={(g) => setGenre(g)}
      onAddToCrate={() => addToCrate(track)}
      onAddToShelf={() => addToShelf(track)}
    />
  );
};

export default SwipeView;
