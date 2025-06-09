import React from 'react';
import { useCatalog } from '../contexts/CatalogContext.jsx';
import { useDebounce } from '../hooks/useDebounce.js';

export default function SearchBar() {
  const { setQuery } = useCatalog();
  const debounced = useDebounce(value => setQuery(value), 300);

  return (
    <input
      className="border border-gray-400 rounded p-2 w-full"
      placeholder="Search..."
      onChange={e => debounced(e.target.value)}
    />
  );
}
