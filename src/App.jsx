import { useState } from 'react';
import VinylPlayer from './components/VinylPlayer.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import Crate from './components/Crate.jsx';
import PlaylistModal from './components/PlaylistModal.jsx';
import { mockSongs } from './data/mockSongs.js';

function App() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [crate, setCrate] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCrate = (song) => {
    setCrate((prev) => (prev.find((s) => s.id === song.id) ? prev : [...prev, song]));
  };

  const removeFromCrate = (id) => {
    setCrate((prev) => prev.filter((s) => s.id !== id));
  };

  const clearCrate = () => setCrate([]);

  const handleConfirm = (name) => {
    const count = crate.length;
    clearCrate();
    setShowModal(false);
    alert(`Added ${count} songs to "${name}" playlist!`);
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Vinyl Player</h1>

      {!selectedGenre && (
        <VinylPlayer
          song={currentSong}
          onGenreSelect={(g) => setSelectedGenre(g)}
          onAddToCrate={addToCrate}
        />
      )}

      {selectedGenre && (
        <GenreFilter
          genre={selectedGenre}
          songs={mockSongs}
          onSelectSong={(s) => {
            setCurrentSong(s);
            setSelectedGenre(null);
          }}
          onClose={() => setSelectedGenre(null)}
        />
      )}

      <Crate crate={crate} onRemove={removeFromCrate} onProceed={() => setShowModal(true)} />

      {showModal && (
        <PlaylistModal
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
