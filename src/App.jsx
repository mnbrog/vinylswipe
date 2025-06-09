import React, { useState } from 'react';
import RecordGrid from './components/RecordGrid.jsx';
import FiltersPanel from './components/FiltersPanel.jsx';
import SearchBar from './components/SearchBar.jsx';
import CrateSidebar from './components/CrateSidebar.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import PlayerControls from './components/PlayerControls.jsx';
import ThreeDRecordPlayer from './components/ThreeDRecordPlayer.jsx';
import { CatalogProvider } from './contexts/CatalogContext.jsx';
import { CrateProvider } from './contexts/CrateContext.jsx';
import { PlaybackProvider, usePlayback } from './contexts/PlaybackContext.jsx';

function AppContent() {
  const [selected, setSelected] = useState(null);
  const [showCrate, setShowCrate] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const { playTrack } = usePlayback();

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <header className="p-4 flex gap-4 items-center">
        <button onClick={() => setShowCrate(!showCrate)} className="bg-purple-600 px-3 py-1 rounded">Crate</button>
        <SearchBar />
      </header>
      <FiltersPanel />
      <RecordGrid onSelect={r => { setSelected(r); playTrack(r.trackList[0]); }} />
      {selected && (
        <ThreeDRecordPlayer album={{ title: selected.title, artist: selected.artist, coverUrl: selected.coverImageUrl }} onAddToCrate={() => {}} onInfoToggle={() => setSelected(null)} />
      )}
      <CrateSidebar open={showCrate} onCheckout={() => setCheckout(true)} />
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
      <PlayerControls />
    </div>
  );
}

export default function App() {
  return (
    <CatalogProvider>
      <CrateProvider>
        <PlaybackProvider>
          <AppContent />
        </PlaybackProvider>
      </CrateProvider>
    </CatalogProvider>
  );
}
