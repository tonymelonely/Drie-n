import React, { useState } from 'react';
import { Card as CardComponent } from './Card';
import { Card as CardType, Player } from '../types/game';

interface CardSelectionPhaseProps {
  player: Player;
  onCardsSelected: (cards: CardType[]) => void;
}

export function CardSelectionPhase({ player, onCardsSelected }: CardSelectionPhaseProps) {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);

  // If computer player, don't show the selection UI
  if (player.isComputer) {
    return null;
  }

  const handleCardClick = (card: CardType) => {
    setSelectedCards(prev => {
      const isSelected = prev.some(c => c.id === card.id);
      if (isSelected) {
        return prev.filter(c => c.id !== card.id);
      } else if (prev.length < 3) {
        return [...prev, card];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    if (selectedCards.length === 3) {
      onCardsSelected(selectedCards);
      setSelectedCards([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4">{player.name}, select 3 cards</h2>
        <p className="text-gray-600 mb-6">
          Choose 3 cards from your hand to place face-up on your face-down cards.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {player.hand.map((card) => (
            <div key={card.id} className="relative">
              <CardComponent
                card={card}
                onClick={() => handleCardClick(card)}
                selected={selectedCards.some(c => c.id === card.id)}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-4 text-sm text-gray-600">
            Selected cards: {selectedCards.length} / 3
          </p>
          <button
            onClick={handleConfirm}
            disabled={selectedCards.length !== 3}
            className={`w-full py-3 rounded-lg font-semibold transition-colors
              ${selectedCards.length === 3
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}