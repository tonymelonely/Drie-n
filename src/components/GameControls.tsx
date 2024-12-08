import React from 'react';
import { Card } from '../types/game';
import { Wand2 } from 'lucide-react';

interface GameControlsProps {
  selectedCards: Card[];
  pileTopCard?: Card;
  onPlay: () => void;
  onTakePile: () => void;
  onRandomCard: () => void;
  canPlay: boolean;
  showTakePile: boolean;
}

export function GameControls({ 
  selectedCards, 
  onPlay, 
  onTakePile,
  onRandomCard,
  canPlay,
  showTakePile
}: GameControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg">
      <div className="flex justify-center gap-3 max-w-lg mx-auto">
        <button
          onClick={onPlay}
          disabled={!canPlay || selectedCards.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            canPlay && selectedCards.length > 0
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Play ({selectedCards.length})
        </button>

        {showTakePile && (
          <button
            onClick={onTakePile}
            className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors animate-pulse"
          >
            Take Pile
          </button>
        )}

        <button
          onClick={onRandomCard}
          className="px-4 py-2 rounded-lg font-semibold text-sm bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Random Card
        </button>
      </div>
    </div>
  );
}