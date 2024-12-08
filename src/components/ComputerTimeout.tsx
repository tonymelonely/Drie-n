import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ComputerTimeoutProps {
  onContinue: () => void;
}

export function ComputerTimeout({ onContinue }: ComputerTimeoutProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-bold">Computer Stuck</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          The computer is taking too long to make a move. Click continue to skip the computer's turn.
        </p>

        <button
          onClick={onContinue}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
            transition-colors font-medium"
        >
          Continue Game
        </button>
      </div>
    </div>
  );
}