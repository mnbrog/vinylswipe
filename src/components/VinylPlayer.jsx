import React, { useState } from 'react';
import ThreeDRecordPlayer from './ThreeDRecordPlayer.jsx';
import AlbumInfoPopup from './AlbumInfoPopup.jsx';

export default function VinylPlayer({ song, onGenreSelect, onAddToCrate }) {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 h-screen w-full">
      <div className="w-full h-full">
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
          onInfoToggle={() => setInfoOpen((o) => !o)}
          onAddToCrate={() => onAddToCrate(song)}
        />
      </div>

      <div className="w-full md:w-1/3 max-w-sm">
        <FlippableAlbum
          song={song}
          flipped={infoOpen}
          onToggle={() => setInfoOpen((o) => !o)}
          onAddToCrate={onAddToCrate}
          onGenreClick={onGenreSelect}
        />
      </div>
      <AlbumInfoPopup
        song={song}
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        onGenreClick={onGenreSelect}
      />
    </div>
  );
}
