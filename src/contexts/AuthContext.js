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
