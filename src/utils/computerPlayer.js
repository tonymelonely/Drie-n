import { canPlayCard, getEffectiveTopCard } from './deck';
// Find playable cards from a set of cards
function getPlayableCards(cards, gameState) {
    if (gameState.pile.length === 0 || gameState.jokerPlayed) {
        return cards; // Can play any card on empty pile or after joker
    }
    const { card: effectiveTopCard, isThreeActive } = getEffectiveTopCard(gameState.pile);
    if (!effectiveTopCard)
        return cards;
    return cards.filter(card => canPlayCard(card, effectiveTopCard, isThreeActive));
}
// Group cards by their value
function groupCardsByValue(cards) {
    const groups = new Map();
    cards.forEach(card => {
        const value = card.value;
        if (!groups.has(value)) {
            groups.set(value, []);
        }
        groups.get(value)?.push(card);
    });
    return groups;
}
// Find best cards to play from available cards
function findBestPlay(playableCards) {
    if (playableCards.length === 0)
        return [];
    const groups = groupCardsByValue(playableCards);
    // 1. Look for four of a kind
    for (const [_, cards] of groups) {
        if (cards.length >= 4) {
            return cards.slice(0, 4); // Play exactly 4 cards
        }
    }
    // 2. Look for special cards (10, Joker) that give another turn
    const powerCard = playableCards.find(card => card.value === 10 || card.value === 'joker');
    if (powerCard) {
        return [powerCard];
    }
    // 3. Look for multiple cards of same value
    for (const [_, cards] of groups) {
        if (cards.length > 1) {
            return cards; // Play all cards of same value
        }
    }
    // 4. Look for special cards (2, 3, 7)
    const specialCard = playableCards.find(card => [2, 3, 7].includes(card.value));
    if (specialCard) {
        return [specialCard];
    }
    // 5. Play highest regular card
    const regularCards = playableCards.filter(card => typeof card.value === 'number' && ![2, 3, 7, 10].includes(card.value));
    if (regularCards.length > 0) {
        const highestCard = regularCards.reduce((highest, card) => {
            if (typeof card.value === 'number' && typeof highest.value === 'number') {
                return card.value > highest.value ? card : highest;
            }
            return highest;
        });
        return [highestCard];
    }
    // 6. If nothing else, play first playable card
    return [playableCards[0]];
}
// Main function to make computer move
export function makeComputerMove(gameState) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (!currentPlayer?.isComputer)
        return [];
    // Function to try play from a set of cards
    const tryPlay = (cards) => {
        const playableCards = getPlayableCards(cards, gameState);
        return findBestPlay(playableCards);
    };
    // 1. Try to play from hand first
    if (currentPlayer.hand.length > 0) {
        const play = tryPlay(currentPlayer.hand);
        if (play.length > 0)
            return play;
    }
    // 2. Try to play from face-up cards if hand is empty
    if (currentPlayer.hand.length === 0 && currentPlayer.faceUpCards.length > 0) {
        const play = tryPlay(currentPlayer.faceUpCards);
        if (play.length > 0)
            return play;
    }
    // 3. Play face-down card if no other options
    if (currentPlayer.hand.length === 0 &&
        currentPlayer.faceUpCards.length === 0 &&
        currentPlayer.faceDownCards.length > 0) {
        return [currentPlayer.faceDownCards[0]];
    }
    return [];
}
