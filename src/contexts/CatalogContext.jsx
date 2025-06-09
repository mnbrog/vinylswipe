import React, { createContext, useContext, useState, useMemo } from 'react';
import { records as initialRecords } from '../data/records.js';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filtered = useMemo(() => {
    let data = [...initialRecords];
    if (query) {
      const q = query.toLowerCase();
      data = data.filter(
        r => r.title.toLowerCase().includes(q) || r.artist.toLowerCase().includes(q)
      );
    }
    if (genre) {
      data = data.filter(r => r.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase()));
    }
    if (sortBy === 'price') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'release') {
      data.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    return data;
  }, [query, genre, sortBy]);

  const getRecordDetails = id => initialRecords.find(r => r.id === id);

  return (
    <CatalogContext.Provider
      value={{ records: filtered, setQuery, setGenre, setSortBy, getRecordDetails }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalog = () => useContext(CatalogContext);
