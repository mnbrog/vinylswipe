import React, { useState } from 'react';
import { useCrate } from '../contexts/CrateContext.jsx';

export default function RecordCard({ record, onSelect }) {
  const { addToCrate } = useCrate();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full aspect-square cursor-pointer" style={{ perspective: '1000px' }} onClick={() => setFlipped(!flipped)}>
      <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <img src={record.coverImageUrl} alt={record.title} className="w-full h-full object-cover rounded shadow-lg" />
        </div>
        <div className="absolute inset-0 bg-gray-900 text-white p-4 rounded shadow-lg rotate-y-180 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
          <div>
            <h2 className="text-lg font-bold">{record.artist}</h2>
            <p className="text-sm mb-2">{record.title}</p>
            <p className="text-xs mb-2">${record.price.toFixed(2)}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); addToCrate(record); }} className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded mt-2">Add to Crate</button>
        </div>
      </div>
    </div>
  );
}
