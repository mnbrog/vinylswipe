import React from 'react';

export default function CheckoutModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded">
        <p className="mb-4">Thank you for your purchase!</p>
        <button onClick={onClose} className="px-4 py-1 bg-purple-600 text-white rounded">Close</button>
      </div>
    </div>
  );
}
