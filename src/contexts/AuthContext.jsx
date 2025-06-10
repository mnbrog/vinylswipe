import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('spotify_auth');
    if (stored) {
      const { access_token, refresh_token } = JSON.parse(stored);
      setToken(access_token);
      setRefreshToken(refresh_token);
    }
  }, []);

  useEffect(() => {
    if (!refreshToken) return;

    const base = import.meta.env.VITE_FUNCTIONS_BASE || '';
    const refresh = () => {
      fetch(`${base}/.netlify/functions/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem(
              'spotify_auth',
              JSON.stringify({ access_token: data.access_token, refresh_token: refreshToken })
            );
            setToken(data.access_token);
          }
        })
        .catch((err) => console.error('Failed to refresh token', err));
    };

    // Refresh token periodically before it expires (approximately every 55 mins)
    const interval = setInterval(refresh, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  const saveAuth = ({ access_token, refresh_token }) => {
    localStorage.setItem('spotify_auth', JSON.stringify({ access_token, refresh_token }));
    setToken(access_token);
    setRefreshToken(refresh_token);
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, saveAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

