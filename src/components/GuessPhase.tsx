import React, { useState } from 'react';
import { Card as CardComponent } from './Card';
import { Card } from '../types/game';

interface GuessPhaseProps {
  cards: Card[];
  onGuess: (card: Card) => void;
  lastGuessWrong?: boolean;
  correctGuess?: boolean;
  onNextTurn?: () => void;
  pileTopCard?: Card;
  onTakePile?: () => void;
}

export function GuessPhase({ 
  cards, 
  onGuess, 
  lastGuessWrong, 
  correctGuess, 
  onNextTurn,
  pileTopCard,
  onTakePile 
}: GuessPhaseProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showingCard, setShowingCard] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const handleCardClick = (card: Card) => {
    if (!showingCard && !selectedCard && !readyToPlay) {
      setSelectedCard(card);
      setShowingCard(true);
      setReadyToPlay(true);
    }
  };

  const handlePlayCard = () => {
    if (selectedCard) {
      onGuess(selectedCard);
      setSelectedCard(null);
      setShowingCard(false);
      setReadyToPlay(false);
    }
  };

  const getStatusMessage = () => {
    if (lastGuessWrong) {
      return "This card cannot be played. You must take all cards from the pile plus this card.";
    }
    if (correctGuess) {
      if (selectedCard?.value === 'joker') {
        return "Joker! You can play another card on your next turn.";
      }
      if (selectedCard?.value === 10) {
        return "10! The pile is cleared and you can play another card on your next turn.";
      }
      return "Card played successfully! Next player's turn.";
    }
    if (showingCard && readyToPlay) {
      return "Do you want to play this card?";
    }
    return "Select one of your face-down cards. Choose carefully!";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-3">
          {lastGuessWrong ? "Wrong Card!" : 
           correctGuess ? "Card Played!" :
           showingCard ? "Card Revealed" :
           "Choose a Face-down Card"}
        </h2>
        
        <p className="text-sm text-gray-600 mb-4">
          {getStatusMessage()}
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          {cards.map((card, index) => (
            <div key={index} className="relative">
              <CardComponent
                card={showingCard && selectedCard?.id === card.id ? card : undefined}
                faceDown={!showingCard || selectedCard?.id !== card.id}
                onClick={() => !correctGuess && !lastGuessWrong && !showingCard && handleCardClick(card)}
                selected={selectedCard?.id === card.id}
                isPlayable={!showingCard && !correctGuess && !lastGuessWrong}
                pileTopCard={pileTopCard}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          {readyToPlay && !correctGuess && !lastGuessWrong && (
            <button
              onClick={handlePlayCard}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Play Card
            </button>
          )}
          
          {lastGuessWrong && onTakePile && (
            <button
              onClick={onTakePile}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors animate-pulse"
            >
              Take Pile + Card
            </button>
          )}
          
          {correctGuess && onNextTurn && (
            <button
              onClick={onNextTurn}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Turn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}