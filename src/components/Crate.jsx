import React, { useContext, useEffect, useState } from 'react';
import { CrateContext } from '../contexts/CrateContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { addTracksToPlaylist, getUserPlaylists } from '../SpotifyService.js';


const Crate = () => {
  const { crate, clearCrate } = useContext(CrateContext);
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (token) {
      getUserPlaylists(token).then((p) => setPlaylists(p.items || []));
    }
  }, [token]);

  const handleSend = async () => {
    if (!selected) return;
    const uris = crate.map((track) => track.uri);
    await addTracksToPlaylist(token, selected, uris);
=======

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
        <div className="mt-4">
          <select
            className="bg-gray-700 text-white p-2 rounded mr-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select playlist</option>
            {playlists.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button onClick={handleSend} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Send to Playlist
          </button>
        </div>

      )}
    </div>
  );
};

export default Crate;
