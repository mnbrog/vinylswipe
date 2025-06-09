import React from 'react';
import RecordCard from './RecordCard.jsx';
import { useCatalog } from '../contexts/CatalogContext.jsx';

export default function RecordGrid({ onSelect }) {
  const { records } = useCatalog();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {records.map(record => (
        <RecordCard key={record.id} record={record} onSelect={onSelect} />
      ))}
    </div>
  );
}
