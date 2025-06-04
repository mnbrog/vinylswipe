import React from 'react';

// Auto-detect environment and use appropriate redirect URI
const isLocalhost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = isLocalhost
  ? 'http://127.0.0.1:5173/callback'
  : 'https://vinylswipe.netlify.app/callback'; // or your custom domain

const scope = 'playlist-modify-public playlist-modify-private';

const Login = () => {
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
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
