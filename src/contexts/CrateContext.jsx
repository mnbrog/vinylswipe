import React, { createContext, useState } from 'react';

export const CrateContext = createContext();

export const CrateProvider = ({ children }) => {
  const [crate, setCrate] = useState([]);

  const addToCrate = (track) => {
    if (!crate.find((t) => t.id === track.id)) {
      setCrate([...crate, track]);
    }
  };

  const removeFromCrate = (id) => {
    setCrate(crate.filter((t) => t.id !== id));
  };

  const clearCrate = () => setCrate([]);

  return (
    <CrateContext.Provider value={{ crate, addToCrate, removeFromCrate, clearCrate }}>
      {children}
    </CrateContext.Provider>
  );
};

