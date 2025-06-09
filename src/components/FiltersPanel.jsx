import React from 'react';
import { useCatalog } from '../contexts/CatalogContext.jsx';

const genres = ['Psychedelic', 'Jam', 'Rock', 'Southern Rock', 'Classic Rock'];

export default function FiltersPanel() {
  const { setGenre, setSortBy } = useCatalog();

  return (
    <div className="flex gap-2 items-center mb-4">
      <select onChange={e => setGenre(e.target.value)} className="p-2 border rounded">
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select onChange={e => setSortBy(e.target.value)} className="p-2 border rounded">
        <option value="">Sort</option>
        <option value="release">Release Date</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}
