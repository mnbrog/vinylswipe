import React from 'react';
import ThreeDRecordPlayer from './ThreeDRecordPlayer.jsx';

export default function VinylPlayer({ song, onGenreSelect, onAddToCrate }) {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <ThreeDRecordPlayer
        className="w-1/2 h-1/2"
        album={{
          title: song.title,
          artist: song.artist,
          coverUrl: song.image,
          bio: song.bio,
          genre: song.genre,
        }}
        onGenreSelect={onGenreSelect}
        onAddToCrate={() => onAddToCrate(song)}
      />
    </div>
  );
}
