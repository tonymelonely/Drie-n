import React from 'react';
import { Card } from '../../types/game';
import { CardSelection } from './CardSelection';
import { GuessResult } from './GuessResult';

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
  if (lastGuessWrong) {
    return (
      <GuessResult
        type="wrong"
        onTakePile={onTakePile}
        selectedCard={pileTopCard}
      />
    );
  }

  if (correctGuess) {
    return (
      <GuessResult
        type="correct"
        onNextTurn={onNextTurn}
        isSpecialCard={pileTopCard?.value === 'joker' || pileTopCard?.value === 10}
        selectedCard={pileTopCard}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <CardSelection
          cards={cards}
          onCardSelected={onGuess}
        />
      </div>
    </div>
  );
}