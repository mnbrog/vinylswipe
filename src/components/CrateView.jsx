import React, { useContext, useState } from 'react';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Crate from './Crate.jsx';
import PlaylistModal from './PlaylistModal.jsx';
import { createPlaylist, addTracksToPlaylist, getProfile } from '../SpotifyService.js';

const CrateView = () => {
  const { crate, removeFromCrate, clearCrate } = useContext(CrateContext);
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async (name) => {
    try {
      const profile = await getProfile(token);
      const playlist = await createPlaylist(token, profile.id, name);
      await addTracksToPlaylist(
        token,
        playlist.id,
        crate.map((t) => t.uri)
      );
      clearCrate();
      setShowModal(false);
      alert('Playlist created!');
    } catch (e) {
      console.error(e);
      alert('Failed to create playlist');
    }
  };

  return (
    <div className="p-10">
      <Crate
        crate={crate}
        onRemove={removeFromCrate}
        onProceed={() => setShowModal(true)}
      />
      {showModal && (
        <PlaylistModal
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CrateView;
