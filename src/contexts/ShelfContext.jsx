import React, { createContext, useState } from 'react';

export const ShelfContext = createContext();

export const ShelfProvider = ({ children }) => {
  const [shelf, setShelf] = useState([]);

  const addToShelf = (track) => {
    if (!shelf.find((t) => t.id === track.id)) {
      setShelf([...shelf, track]);
    }
  };

  const removeFromShelf = (id) => {
    setShelf(shelf.filter((t) => t.id !== id));
  };

  const clearShelf = () => setShelf([]);

  return (
    <ShelfContext.Provider value={{ shelf, addToShelf, removeFromShelf, clearShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};

