import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card as CardComponent } from './Card';
import { canPlayCard, canPlayFromFaceUpCards, canPlayFromFaceDownCards, getEffectiveTopCard } from '../utils/deck';
import { CardSelectionPhase } from './CardSelectionPhase';
import { PlayerSection } from './PlayerSection';
import { GameControls } from './GameControls';
import { GuessPhase } from './GuessPhase/GuessPhase';
import { PlayerIndicator } from './PlayerIndicator';
import { MoveHistory } from './MoveHistory';
import { History } from 'lucide-react';
export function GameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }) {
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [showHistory, setShowHistory] = React.useState(false);
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const computerPlayer = gameState.players.find(p => p.isComputer);
    const { card: effectiveTopCard, isThreeActive, sameValueCount } = getEffectiveTopCard(gameState.pile);
    const pileTopCard = gameState.pile[gameState.pile.length - 1];
    const canPlayCurrentSelection = selectedCards.length > 0 && (gameState.jokerPlayed || canPlayCard(selectedCards[0], effectiveTopCard, isThreeActive));
    const handleCardClick = (card, source) => {
        if (gameState.gamePhase !== 'playing')
            return;
        if (source === 'faceUp' && !canPlayFromFaceUpCards(currentPlayer))
            return;
        if (source === 'faceDown' && !canPlayFromFaceDownCards(currentPlayer))
            return;
        if (source === 'hand' && (canPlayFromFaceUpCards(currentPlayer) || canPlayFromFaceDownCards(currentPlayer)))
            return;
        const isSelected = selectedCards.some(c => c.id === card.id);
        if (isSelected) {
            setSelectedCards(selectedCards.filter(c => c.id !== card.id));
        }
        else {
            if (selectedCards.length === 0 || selectedCards[0].value === card.value) {
                setSelectedCards([...selectedCards, card]);
            }
        }
    };
    return (_jsxs("div", { className: `min-h-screen bg-gradient-to-br from-${gameState.settings.tableBackground}-800 to-${gameState.settings.tableBackground}-900 p-4 pt-20`, children: [computerPlayer && (_jsxs("div", { className: "fixed top-20 left-4 z-40", children: [_jsxs("button", { onClick: () => setShowHistory(!showHistory), className: "bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2", children: [_jsx(History, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "text-sm font-medium", children: "Move History" })] }), showHistory && computerPlayer.moveHistory && (_jsx(MoveHistory, { moves: computerPlayer.moveHistory, onClose: () => setShowHistory(false) }))] })), _jsx("div", { className: "fixed top-20 right-4 z-40", children: _jsx(PlayerIndicator, { player: currentPlayer }) }), _jsxs("div", { className: "max-w-lg mx-auto pt-16 pb-32 space-y-6", children: [_jsxs("div", { className: "flex justify-center items-center gap-4 bg-white/10 rounded-lg p-4", children: [_jsxs("div", { className: "relative", children: [gameState.deck.length > 0 && (_jsx(CardComponent, { faceDown: true, cardBackColor: gameState.settings.cardBackColor })), _jsx("span", { className: "absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 text-xs font-medium", children: gameState.deck.length })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [pileTopCard && (_jsxs("div", { className: "relative", children: [_jsx(CardComponent, { card: pileTopCard }), sameValueCount > 1 && (_jsxs("div", { className: "absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg", children: [sameValueCount, "x"] })), isThreeActive && effectiveTopCard && (_jsx("div", { className: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-lg shadow-lg text-xs whitespace-nowrap", children: _jsxs("p", { className: "font-medium text-gray-800", children: ["Playing on: ", effectiveTopCard.value === 11 ? 'J' :
                                                            effectiveTopCard.value === 12 ? 'Q' :
                                                                effectiveTopCard.value === 13 ? 'K' :
                                                                    effectiveTopCard.value === 14 ? 'A' :
                                                                        effectiveTopCard.value] }) }))] })), gameState.jokerPlayed && (_jsx("div", { className: "bg-yellow-100 px-3 py-1 rounded-lg shadow-lg animate-pulse text-xs", children: _jsx("p", { className: "font-medium text-yellow-800", children: "Play any card!" }) }))] })] }), _jsx(PlayerSection, { player: currentPlayer, isCurrentPlayer: true, onCardClick: handleCardClick, selectedCards: selectedCards, pileTopCard: effectiveTopCard, gamePhase: gameState.gamePhase, isThreeActive: isThreeActive, cardBackColor: gameState.settings.cardBackColor }), gameState.gamePhase === 'selectingCards' && !currentPlayer.hasSelectedInitialCards && (_jsx(CardSelectionPhase, { player: currentPlayer, onCardsSelected: (cards) => onInitialCardsSelected(currentPlayer.id, cards) })), gameState.gamePhase === 'guessing' && (_jsx(GuessPhase, { cards: currentPlayer.faceDownCards, onGuess: onGuessCard, lastGuessWrong: currentPlayer.lastGuessWrong, correctGuess: currentPlayer.correctGuess, onNextTurn: onNextTurn, pileTopCard: effectiveTopCard, onTakePile: onTakePile, cardBackColor: gameState.settings.cardBackColor })), gameState.gamePhase === 'playing' && (_jsx(GameControls, { selectedCards: selectedCards, pileTopCard: effectiveTopCard, onPlay: () => {
                            if (selectedCards.length > 0) {
                                onPlayCard(selectedCards);
                                setSelectedCards([]);
                            }
                        }, onTakePile: onTakePile, canPlay: canPlayCurrentSelection, showTakePile: !canPlayCurrentSelection && selectedCards.length === 0 }))] })] }));
}
