import { createDeck } from './deck';
export function initializeGameState(config, settings) {
    const deck = createDeck();
    const players = Array.from({ length: config.playerCount }, (_, i) => ({
        id: `player-${i}`,
        name: i === 0 ? 'You' : `Player ${i + 1}`,
        hand: deck.splice(0, 6),
        faceUpCards: [],
        faceDownCards: deck.splice(0, 3),
        hasSelectedInitialCards: false,
        isComputer: config.gameMode === 'computer' && i > 0,
        difficulty: i > 0 ? config.difficulty : undefined
    }));
    return {
        players,
        currentPlayerIndex: 0,
        deck,
        pile: [],
        gamePhase: config.gameMode === 'tutorial' ? 'tutorial' : 'selectingCards',
        winner: null,
        jokerPlayed: false,
        gameMode: config.gameMode,
        roomCode: config.roomCode,
        currentTutorialStep: config.gameMode === 'tutorial' ? 0 : undefined,
        settings
    };
}
