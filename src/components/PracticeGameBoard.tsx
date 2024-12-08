import React from 'react';
import { GameBoard } from './GameBoard';
import { GameState, Card } from '../types/game';
import { PracticeHint } from './PracticeHint';
import { getPracticeHint } from '../utils/practice';

interface PracticeGameBoardProps {
  gameState: GameState;
  onPlayCard: (cards: Card[]) => void;
  onTakePile: () => void;
  onInitialCardsSelected: (playerId: string, cards: Card[]) => void;
  onGuessCard: (card: Card) => void;
  onNextTurn: () => void;
}

export function PracticeGameBoard({
  gameState,
  onPlayCard,
  onTakePile,
  onInitialCardsSelected,
  onGuessCard,
  onNextTurn
}: PracticeGameBoardProps) {
  const hint = getPracticeHint(gameState);

  return (
    <div className="relative">
      <GameBoard
        gameState={gameState}
        onPlayCard={onPlayCard}
        onTakePile={onTakePile}
        onInitialCardsSelected={onInitialCardsSelected}
        onGuessCard={onGuessCard}
        onNextTurn={onNextTurn}
        highlightedCards={hint?.highlightedCards}
      />

      {hint && <PracticeHint hint={hint} />}
    </div>
  );
}