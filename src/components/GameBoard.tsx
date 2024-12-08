import React from 'react';
import { Card as CardComponent } from './Card';
import { Card as CardType, GameState } from '../types/game';
import { canPlayCard, canPlayFromFaceUpCards, canPlayFromFaceDownCards, getEffectiveTopCard } from '../utils/deck';
import { CardSelectionPhase } from './CardSelectionPhase';
import { PlayerSection } from './PlayerSection';
import { GameControls } from './GameControls';
import { GuessPhase } from './GuessPhase/GuessPhase';
import { PlayerIndicator } from './PlayerIndicator';
import { GameHints } from './GameHints';
import { MoveHistory } from './MoveHistory';
import { History } from 'lucide-react';

interface GameBoardProps {
  gameState: GameState;
  onPlayCard: (cards: CardType[]) => void;
  onTakePile: () => void;
  onInitialCardsSelected: (playerId: string, cards: CardType[]) => void;
  onGuessCard: (card: CardType) => void;
  onNextTurn: () => void;
}

export function GameBoard({ 
  gameState, 
  onPlayCard, 
  onTakePile,
  onInitialCardsSelected,
  onGuessCard,
  onNextTurn
}: GameBoardProps) {
  const [selectedCards, setSelectedCards] = React.useState<CardType[]>([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const computerPlayer = gameState.players.find(p => p.isComputer);
  
  const { card: effectiveTopCard, isThreeActive, sameValueCount } = getEffectiveTopCard(gameState.pile);
  const pileTopCard = gameState.pile[gameState.pile.length - 1];

  const canPlayCurrentSelection = selectedCards.length > 0 && (
    gameState.jokerPlayed || canPlayCard(selectedCards[0], effectiveTopCard, isThreeActive)
  );

  const handleCardClick = (card: CardType, source: 'hand' | 'faceUp' | 'faceDown') => {
    if (gameState.gamePhase !== 'playing') return;

    if (source === 'faceUp' && !canPlayFromFaceUpCards(currentPlayer)) return;
    if (source === 'faceDown' && !canPlayFromFaceDownCards(currentPlayer)) return;
    if (source === 'hand' && (canPlayFromFaceUpCards(currentPlayer) || canPlayFromFaceDownCards(currentPlayer))) return;

    const isSelected = selectedCards.some(c => c.id === card.id);
    if (isSelected) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else {
      if (selectedCards.length === 0 || selectedCards[0].value === card.value) {
        setSelectedCards([...selectedCards, card]);
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gameState.settings.tableBackground}-800 to-${gameState.settings.tableBackground}-900 p-4 pt-20`}>
      {/* Move History Button */}
      {computerPlayer && (
        <div className="fixed top-20 left-4 z-40">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2"
          >
            <History className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Move History</span>
          </button>

          {showHistory && computerPlayer.moveHistory && (
            <MoveHistory 
              moves={computerPlayer.moveHistory}
              onClose={() => setShowHistory(false)}
            />
          )}
        </div>
      )}

      {/* Player Indicator */}
      <div className="fixed top-20 right-4 z-40">
        <PlayerIndicator player={currentPlayer} />
      </div>

      <div className="max-w-lg mx-auto pt-16 pb-32 space-y-6">
        {/* Game center section */}
        <div className="flex justify-center items-center gap-4 bg-white/10 rounded-lg p-4">
          {/* Deck */}
          <div className="relative">
            {gameState.deck.length > 0 && (
              <CardComponent 
                faceDown 
                cardBackColor={gameState.settings.cardBackColor}
              />
            )}
            <span className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
              {gameState.deck.length}
            </span>
          </div>

          {/* Pile */}
          <div className="flex flex-col items-center gap-2">
            {pileTopCard && (
              <div className="relative">
                <CardComponent card={pileTopCard} />
                {sameValueCount > 1 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                    {sameValueCount}x
                  </div>
                )}
                {isThreeActive && effectiveTopCard && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-lg shadow-lg text-xs whitespace-nowrap">
                    <p className="font-medium text-gray-800">
                      Playing on: {effectiveTopCard.value === 11 ? 'J' :
                                effectiveTopCard.value === 12 ? 'Q' :
                                effectiveTopCard.value === 13 ? 'K' :
                                effectiveTopCard.value === 14 ? 'A' :
                                effectiveTopCard.value}
                    </p>
                  </div>
                )}
              </div>
            )}
            {gameState.jokerPlayed && (
              <div className="bg-yellow-100 px-3 py-1 rounded-lg shadow-lg animate-pulse text-xs">
                <p className="font-medium text-yellow-800">
                  Play any card!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Current player section */}
        <PlayerSection
          player={currentPlayer}
          isCurrentPlayer={true}
          onCardClick={handleCardClick}
          selectedCards={selectedCards}
          pileTopCard={effectiveTopCard}
          gamePhase={gameState.gamePhase}
          isThreeActive={isThreeActive}
          cardBackColor={gameState.settings.cardBackColor}
        />

        {/* Overlays */}
        {gameState.gamePhase === 'selectingCards' && !currentPlayer.hasSelectedInitialCards && (
          <CardSelectionPhase
            player={currentPlayer}
            onCardsSelected={(cards) => onInitialCardsSelected(currentPlayer.id, cards)}
          />
        )}

        {gameState.gamePhase === 'guessing' && (
          <GuessPhase
            cards={currentPlayer.faceDownCards}
            onGuess={onGuessCard}
            lastGuessWrong={currentPlayer.lastGuessWrong}
            correctGuess={currentPlayer.correctGuess}
            onNextTurn={onNextTurn}
            pileTopCard={effectiveTopCard}
            onTakePile={onTakePile}
            cardBackColor={gameState.settings.cardBackColor}
          />
        )}

        {/* Game controls */}
        {gameState.gamePhase === 'playing' && (
          <GameControls
            selectedCards={selectedCards}
            pileTopCard={effectiveTopCard}
            onPlay={() => {
              if (selectedCards.length > 0) {
                onPlayCard(selectedCards);
                setSelectedCards([]);
              }
            }}
            onTakePile={onTakePile}
            canPlay={canPlayCurrentSelection}
            showTakePile={!canPlayCurrentSelection && selectedCards.length === 0}
          />
        )}
      </div>
    </div>
  );
}