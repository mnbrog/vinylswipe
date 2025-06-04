const API_BASE = 'https://api.spotify.com/v1';

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function getRecommendations(token, seedTrackId) {
  const res = await fetch(`${API_BASE}/recommendations?seed_tracks=${seedTrackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function getRecommendationsByGenre(token, genre) {
  const res = await fetch(
    `${API_BASE}/recommendations?seed_genres=${encodeURIComponent(genre)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.json();
}

export async function getAudioFeatures(token, trackId) {
  const res = await fetch(`${API_BASE}/audio-features/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function getArtist(token, artistId) {
  const res = await fetch(`${API_BASE}/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function getUserPlaylists(token) {
  const res = await fetch(`${API_BASE}/me/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function addTracksToPlaylist(token, playlistId, uris) {
  return await fetch(`${API_BASE}/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uris }),
  });
}
