import React, { useContext } from 'react';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { addTracksToPlaylist } from '../SpotifyService';

const Crate = () => {
  const { crate, clearCrate } = useContext(CrateContext);
  const { token } = useContext(AuthContext);

  const handleSend = async () => {
    const playlistId = prompt('Enter Spotify playlist ID:');
    const uris = crate.map(track => track.uri);
    await addTracksToPlaylist(token, playlistId, uris);
    clearCrate();
    alert('Tracks added!');
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Crate</h1>
      {crate.map(track => (
        <div key={track.id} className="mb-4">
          <p>{track.name} — {track.artists[0].name}</p>
        </div>
      ))}
      {crate.length > 0 && (
        <button onClick={handleSend} className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Send to Playlist
        </button>
      )}
    </div>
  );
};

export default Crate;
