import React from 'react';
import ThreeDRecordPlayer from './ThreeDRecordPlayer.jsx';

export default function VinylPlayer({ song, onGenreSelect, onAddToCrate }) {
  return (
    <div className="bg-gray-800 p-4 rounded w-80 mx-auto">
      <ThreeDRecordPlayer
        album={{
          title: song.title,
          artist: song.artist,
          coverUrl: song.image,
          bio: song.bio,
          genre: song.genre,
        }}
        onGenreSelect={onGenreSelect}
        onAddToCrate={(album) => onAddToCrate(song)}
      />
    </div>
  );
}
