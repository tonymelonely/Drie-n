import React from 'react';
import { Card as CardType } from '../types/game';
import { canPlayCard } from '../utils/deck';
import { CardInfo } from './CardInfo';

interface CardProps {
  card?: CardType;
  faceDown?: boolean;
  onClick?: () => void;
  selected?: boolean;
  hasSameValueInHand?: boolean;
  pileTopCard?: CardType;
  isPlayable?: boolean;
  showInfo?: boolean;
  cardBackColor?: string;
}

export function Card({ 
  card, 
  faceDown, 
  onClick, 
  selected, 
  hasSameValueInHand,
  pileTopCard,
  isPlayable = true,
  showInfo = true,
  cardBackColor = 'blue'
}: CardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isPlayable) return;
    onClick?.();
  };

  if (faceDown || !card) {
    return (
      <div 
        onClick={handleClick}
        className={`w-16 h-24 sm:w-24 sm:h-36 bg-${cardBackColor}-800 rounded-lg border-2 border-white shadow-lg cursor-pointer select-none
          ${selected ? 'ring-4 ring-yellow-400' : ''}`}
      />
    );
  }

  const getCardColor = () => {
    if (card.suit === 'hearts' || card.suit === 'diamonds') return 'text-red-600';
    return 'text-black';
  };

  const getValue = () => {
    if (card.value === 'joker') return 'J';
    if (card.value === 11) return 'J';
    if (card.value === 12) return 'Q';
    if (card.value === 13) return 'K';
    if (card.value === 14) return 'A';
    return card.value;
  };

  const canPlay = !pileTopCard || canPlayCard(card, pileTopCard);
  const isSpecialCard = [2, 3, 7, 10].includes(card.value as number) || card.value === 'joker';

  return (
    <div 
      onClick={handleClick}
      className={`relative w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg shadow-lg p-2 flex flex-col justify-between cursor-pointer select-none
        ${selected ? 'ring-4 ring-yellow-400 transform -translate-y-4' : ''}
        ${hasSameValueInHand ? 'border-4 border-green-500' : 'border-2 border-gray-300'}
        ${!canPlay && isPlayable ? 'opacity-50' : ''}
        ${!isPlayable ? 'cursor-not-allowed opacity-75' : ''}
        ${isSpecialCard ? 'bg-gradient-to-br from-white to-blue-50' : ''}
        transition-all duration-200`}
      title={!canPlay && isPlayable ? "This card cannot be played on the current pile" : undefined}
    >
      <div className={`text-sm sm:text-lg font-bold ${getCardColor()}`}>
        {getValue()}
      </div>
      <div className={`text-center text-xl sm:text-2xl ${getCardColor()}`}>
        {card.suit === 'hearts' && '♥'}
        {card.suit === 'diamonds' && '♦'}
        {card.suit === 'clubs' && '♣'}
        {card.suit === 'spades' && '♠'}
        {card.suit === 'joker' && '🃏'}
      </div>
      <div className={`text-sm sm:text-lg font-bold self-end ${getCardColor()}`}>
        {getValue()}
      </div>

      {showInfo && <CardInfo card={card} />}

      {/* Special card indicators */}
      {isSpecialCard && (
        <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs sm:text-sm font-bold">
          {card.value === 'joker' ? '★' : card.value}
        </div>
      )}
    </div>
  );
}