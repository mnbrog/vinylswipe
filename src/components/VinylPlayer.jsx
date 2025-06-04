import React from 'react';
import ThreeDRecordPlayer from './ThreeDRecordPlayer.jsx';
import FlippableAlbum from './FlippableAlbum.jsx';

export default function VinylPlayer({ song, onGenreSelect, onAddToCrate }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 h-screen">
      <div className="w-full md:w-2/3 h-full">

        <ThreeDRecordPlayer
          className="w-full h-full"
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
      <div className="w-full md:w-1/3 max-w-sm">

        <FlippableAlbum
          song={song}
          onAddToCrate={onAddToCrate}
          onGenreClick={onGenreSelect}
        />
      </div>
    </div>
  );
}
