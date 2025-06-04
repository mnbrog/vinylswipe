import React from 'react';

// Vite exposes environment variables via `import.meta.env`.
// Fall back to the old REACT_APP_ names for compatibility with
// existing `.env` files used by the Netlify functions.
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || import.meta.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri =
  import.meta.env.VITE_REDIRECT_URI || import.meta.env.REACT_APP_REDIRECT_URI;

const scope = 'playlist-modify-public playlist-modify-private';

const Login = () => {
  const handleLogin = () => {
    const authUrl =
      `https://accounts.spotify.com/authorize?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <button onClick={handleLogin} className="bg-green-500 px-6 py-3 rounded-xl text-xl font-bold">
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
