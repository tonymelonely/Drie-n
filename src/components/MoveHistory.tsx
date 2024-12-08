import React from 'react';
import { ComputerMove } from '../types/game';
import { X } from 'lucide-react';

interface MoveHistoryProps {
  moves: ComputerMove[];
  onClose: () => void;
}

export function MoveHistory({ moves, onClose }: MoveHistoryProps) {
  const formatCardValue = (value: number | 'joker') => {
    if (value === 'joker') return 'Joker';
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    if (value === 14) return 'A';
    return value;
  };

  const formatSuit = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  const formatCard = (card: { value: number | 'joker', suit: string }) => {
    if (card.value === 'joker') return '🃏';
    const value = formatCardValue(card.value);
    const suit = formatSuit(card.suit);
    const color = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-black';
    return (
      <span className={color}>
        {value}{suit}
      </span>
    );
  };

  return (
    <div className="absolute top-12 left-0 w-80 bg-white rounded-lg shadow-xl p-4 mt-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Computer Moves</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {moves.length === 0 ? (
          <p className="text-gray-500 text-center italic">No moves yet</p>
        ) : (
          moves.map((move, index) => (
            <div key={index} className="border-b border-gray-200 pb-3 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm">
                  Move {moves.length - index}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(move.timestamp).toLocaleTimeString()}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-sm">
                  <span className="text-gray-600">Source: </span>
                  <span className="font-medium capitalize">{move.type}</span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Description: </span>
                  <span className="font-medium">{move.description}</span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Played: </span>
                  <span className="font-medium space-x-1">
                    {move.cards.map((card, i) => (
                      <span key={card.id}>
                        {formatCard(card)}
                        {i < move.cards.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Pile: </span>
                  <span className="font-medium">
                    {move.pileState.length === 0 ? (
                      <span className="text-gray-500 italic">Empty</span>
                    ) : (
                      move.pileState.map((card, i) => (
                        <span key={card.id}>
                          {formatCard(card)}
                          {i < move.pileState.length - 1 && ', '}
                        </span>
                      ))
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}