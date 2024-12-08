import React, { useState } from 'react';
import { Card as CardComponent } from '../Card';
import { Card } from '../../types/game';
import { motion } from 'framer-motion';

interface CardSelectionProps {
  cards: Card[];
  onCardSelected: (card: Card) => void;
}

export function CardSelection({ cards, onCardSelected }: CardSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (card: Card, index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      onCardSelected(card);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">
        Choose a Face-down Card
      </h2>
      
      <p className="text-sm text-gray-600 text-center">
        Select one of your face-down cards to play. Choose carefully!
      </p>
      
      <div className="flex justify-center gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            whileHover={selectedIndex === null ? { scale: 1.05 } : {}}
            whileTap={selectedIndex === null ? { scale: 0.95 } : {}}
            className="cursor-pointer preserve-3d"
          >
            <CardComponent
              faceDown={true}
              onClick={() => selectedIndex === null && handleCardClick(card, index)}
              selected={selectedIndex === index}
              isPlayable={selectedIndex === null}
            />
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        {selectedIndex !== null 
          ? "Revealing card..." 
          : "Click on a card to make your guess"}
      </p>
    </div>
  );
}