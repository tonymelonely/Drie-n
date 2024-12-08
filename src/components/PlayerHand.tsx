import React from 'react';
import { Card as CardComponent } from './Card';
import { Card as CardType } from '../types/game';

interface PlayerHandProps {
  cards: CardType[];
  selectedCards: CardType[];
  onCardClick: (card: CardType) => void;
}

export function PlayerHand({ cards, selectedCards, onCardClick }: PlayerHandProps) {
  return (
    <div className="flex justify-center gap-2">
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
          selected={selectedCards.some(c => c.id === card.id)}
        />
      ))}
    </div>
  );
}