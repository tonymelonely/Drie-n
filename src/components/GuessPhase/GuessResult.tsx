import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardComponent } from '../Card';
import { Card } from '../../types/game';

interface GuessResultProps {
  type: 'correct' | 'wrong';
  onNextTurn?: () => void;
  onTakePile?: () => void;
  isSpecialCard?: boolean;
  selectedCard?: Card;
}

export function GuessResult({ 
  type, 
  onNextTurn, 
  onTakePile,
  isSpecialCard,
  selectedCard
}: GuessResultProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
      >
        <h2 className="text-xl font-bold mb-3 text-center">
          {type === 'correct' ? "Card Played!" : "Wrong Card!"}
        </h2>
        
        {selectedCard && (
          <div className="flex justify-center mb-4">
            <CardComponent
              card={selectedCard}
              isPlayable={false}
            />
          </div>
        )}
        
        <p className="text-sm text-gray-600 mb-4 text-center">
          {type === 'correct'
            ? isSpecialCard
              ? selectedCard?.value === 'joker'
                ? "Joker! You can play another card on your next turn."
                : "10! The pile is cleared and you can play another card on your next turn."
              : "Card played successfully! Next player's turn."
            : "This card cannot be played. You must take all cards from the pile plus this card."}
        </p>

        <div className="flex justify-center">
          {type === 'correct' && onNextTurn && (
            <button
              onClick={onNextTurn}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg 
                       hover:bg-blue-700 transition-colors"
            >
              {isSpecialCard ? "Continue Turn" : "Next Turn"}
            </button>
          )}
          
          {type === 'wrong' && onTakePile && (
            <button
              onClick={onTakePile}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg 
                       hover:bg-red-700 transition-colors animate-pulse"
            >
              Take Pile + Card
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}