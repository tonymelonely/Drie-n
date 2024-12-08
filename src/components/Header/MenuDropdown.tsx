import React from 'react';
import { Home, X } from 'lucide-react';

interface MenuDropdownProps {
  onClose: () => void;
  onReturnToMenu: () => void;
}

export function MenuDropdown({ onClose, onReturnToMenu }: MenuDropdownProps) {
  const handleReturnToMenu = () => {
    onClose();
    onReturnToMenu();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div 
        className="absolute top-16 left-4 w-64 bg-white rounded-lg shadow-xl p-2"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2 p-2">
          <h3 className="font-semibold text-gray-900">Game Menu</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleReturnToMenu}
          className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Home className="w-5 h-5" />
          <span>Return to Main Menu</span>
        </button>
      </div>
    </div>
  );
}