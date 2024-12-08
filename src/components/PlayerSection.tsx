import React, { useRef } from 'react';
import { Card as CardComponent } from './Card';
import { Card, Player } from '../types/game';
import { canPlayFromFaceUpCards, canPlayFromFaceDownCards } from '../utils/deck';

interface PlayerSectionProps {
  player: Player;
  isCurrentPlayer: boolean;
  onCardClick?: (card: Card, source: 'hand' | 'faceUp' | 'faceDown') => void;
  selectedCards: Card[];
  pileTopCard?: Card;
  gamePhase: 'selectingCards' | 'playing' | 'guessing';
  isThreeActive?: boolean;
  cardBackColor?: string;
}

export function PlayerSection({ 
  player, 
  isCurrentPlayer, 
  onCardClick, 
  selectedCards,
  pileTopCard,
  gamePhase,
  isThreeActive,
  cardBackColor = 'blue'
}: PlayerSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canPlayFaceUp = canPlayFromFaceUpCards(player);
  const canPlayFaceDown = canPlayFromFaceDownCards(player);

  // For computer player, only show minimal information
  if (player.isComputer) {
    return (
      <div className="bg-white/90 rounded-lg p-4 shadow-lg w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{player.name}</h3>
          <div className="flex items-center gap-4">
            {isCurrentPlayer && (
              <div className="text-sm text-gray-600 animate-pulse">
                Computer is thinking...
              </div>
            )}
            <div className="text-sm text-gray-600">
              Cards in hand: {player.hand.length}
            </div>
          </div>
        </div>
        
        {/* Only show face-up and face-down cards for computer */}
        <div className="flex justify-center gap-8 mt-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative w-24">
              {/* Face-down cards (only show back) */}
              {player.faceDownCards[index] && (
                <div className="absolute top-0 left-0">
                  <CardComponent 
                    faceDown 
                    cardBackColor={cardBackColor}
                  />
                </div>
              )}
              
              {/* Face-up cards (visible to all) */}
              {player.faceUpCards[index] && (
                <div className="relative">
                  <CardComponent
                    card={player.faceUpCards[index]}
                    isPlayable={false}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show face-down cards for computer's hand */}
        {player.hand.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="relative">
              <CardComponent 
                faceDown 
                cardBackColor={cardBackColor}
              />
              <span className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                {player.hand.length}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For non-current players (except during card selection), show nothing
  if (!isCurrentPlayer && gamePhase !== 'selectingCards') {
    return null;
  }

  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{player.name}</h3>
        <span className="text-sm text-gray-600">
          Cards in hand: {player.hand.length}
        </span>
      </div>

      <div className="space-y-8">
        {/* Face-down and face-up cards */}
        <div className="flex justify-center gap-8">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative w-24">
              {/* Face-down card */}
              <div className="absolute top-0 left-0">
                {player.faceDownCards[index] && (
                  <CardComponent
                    faceDown={true}
                    onClick={() => canPlayFaceDown && isCurrentPlayer && onCardClick?.(player.faceDownCards[index], 'faceDown')}
                    selected={selectedCards.some(c => c.id === player.faceDownCards[index]?.id)}
                    isPlayable={canPlayFaceDown && isCurrentPlayer && gamePhase === 'playing'}
                    cardBackColor={cardBackColor}
                  />
                )}
              </div>
              
              {/* Face-up card */}
              <div className="relative">
                {player.faceUpCards[index] && (
                  <CardComponent
                    card={player.faceUpCards[index]}
                    onClick={() => canPlayFaceUp && isCurrentPlayer && onCardClick?.(player.faceUpCards[index], 'faceUp')}
                    selected={selectedCards.some(c => c.id === player.faceUpCards[index]?.id)}
                    isPlayable={canPlayFaceUp && isCurrentPlayer && gamePhase === 'playing'}
                    pileTopCard={pileTopCard}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hand */}
        {(isCurrentPlayer || gamePhase === 'selectingCards') && (
          <div className="flex justify-center flex-wrap gap-4">
            {player.hand.map((card) => (
              <div key={card.id} className="w-24 flex-shrink-0">
                <CardComponent
                  card={card}
                  onClick={() => !canPlayFaceDown && !canPlayFaceUp && onCardClick?.(card, 'hand')}
                  selected={selectedCards.some(c => c.id === card.id)}
                  isPlayable={!canPlayFaceDown && !canPlayFaceUp && gamePhase === 'playing'}
                  pileTopCard={pileTopCard}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}