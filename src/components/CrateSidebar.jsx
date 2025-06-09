import React from 'react';
import { useCrate } from '../contexts/CrateContext.jsx';

export default function CrateSidebar({ open, onCheckout }) {
  const { crate, removeFromCrate, clearCrate } = useCrate();

  return (
    <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>\
      <h3 className="text-xl font-bold mb-4">Your Crate</h3>
      <ul className="mb-4 space-y-2">
        {crate.map(item => (
          <li key={item.id} className="flex justify-between items-center text-sm">
            <span>{item.title}</span>
            <button onClick={() => removeFromCrate(item.id)}>&times;</button>
          </li>
        ))}
      </ul>
      {crate.length > 0 && (
        <button className="bg-purple-600 px-4 py-1 rounded" onClick={() => { onCheckout(); clearCrate(); }}>
          Checkout
        </button>
      )}
    </div>
  );
}
