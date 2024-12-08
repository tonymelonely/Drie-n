import React from 'react';

interface JokerSelectionProps {
  onValueSelected: (value: number) => void;
}

export function JokerSelection({ onValueSelected }: JokerSelectionProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Select Card Value for Joker</h2>
        <div className="grid grid-cols-4 gap-4">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) => (
            <button
              key={value}
              onClick={() => onValueSelected(value)}
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-bold transition-colors"
            >
              {value === 11 ? 'J' :
               value === 12 ? 'Q' :
               value === 13 ? 'K' :
               value === 14 ? 'A' :
               value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}