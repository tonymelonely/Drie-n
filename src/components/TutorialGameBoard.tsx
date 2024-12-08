import React from 'react';
import { GameBoard } from './GameBoard';
import { GameState, Card } from '../types/game';
import { TutorialHint } from './TutorialHint';
import { getTutorialHint } from '../utils/tutorial';

interface TutorialGameBoardProps {
  gameState: GameState;
  onPlayCard: (cards: Card[]) => void;
  onTakePile: () => void;
  onInitialCardsSelected: (playerId: string, cards: Card[]) => void;
  onGuessCard: (card: Card) => void;
  onNextTurn: () => void;
}

export function TutorialGameBoard({
  gameState,
  onPlayCard,
  onTakePile,
  onInitialCardsSelected,
  onGuessCard,
  onNextTurn
}: TutorialGameBoardProps) {
  const tutorialHint = getTutorialHint(gameState);

  return (
    <div className="relative">
      <GameBoard
        gameState={gameState}
        onPlayCard={onPlayCard}
        onTakePile={onTakePile}
        onInitialCardsSelected={onInitialCardsSelected}
        onGuessCard={onGuessCard}
        onNextTurn={onNextTurn}
        highlightedCards={tutorialHint?.highlightedCards}
      />

      {/* Tutorial overlay with hints */}
      {tutorialHint && (
        <div className="fixed inset-0 bg-black/10 pointer-events-none">
          <TutorialHint hint={tutorialHint} />
        </div>
      )}
    </div>
  );
}