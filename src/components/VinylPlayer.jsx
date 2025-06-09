import React, { useState, useRef } from 'react';
import ThreeDRecordPlayer from './ThreeDRecordPlayer.jsx';
import AlbumInfoPopup from './AlbumInfoPopup.jsx';
import FlippableAlbum from './FlippableAlbum.jsx';

export default function VinylPlayer({ song, onGenreSelect, onAddToCrate, onAddToShelf }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };
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
          onAddToShelf={() => onAddToShelf(song)}
          onPlayAudio={handlePlayPause}
          playing={playing}
        />
      </div>

      <div className="w-full md:w-1/3 max-w-sm">
        <FlippableAlbum
          song={song}
          flipped={infoOpen}
          onToggle={() => setInfoOpen((o) => !o)}
          onAddToCrate={onAddToCrate}
          onAddToShelf={onAddToShelf}
          onGenreClick={onGenreSelect}
        />
      </div>
      <AlbumInfoPopup
        song={song}
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        onGenreClick={onGenreSelect}
      />
      {song.preview_url && (
        <audio ref={audioRef} src={song.preview_url} onEnded={() => setPlaying(false)} />
      )}
    </div>
  );
}
