import { Player, Card, GameState } from '../types/game';

// Get card numeric value (2-14 for 2-Ace)
function getCardValue(card: Card): number {
  if (card.value === 'joker') return 15; // Jokers are highest
  return card.value as number;
}

// Compare two hands to find the lowest card
function compareHands(hand1: Card[], hand2: Card[]): number {
  const sortedHand1 = [...hand1].sort((a, b) => getCardValue(a) - getCardValue(b));
  const sortedHand2 = [...hand2].sort((a, b) => getCardValue(a) - getCardValue(b));

  // Compare each card position until we find a difference
  for (let i = 0; i < Math.min(sortedHand1.length, sortedHand2.length); i++) {
    const value1 = getCardValue(sortedHand1[i]);
    const value2 = getCardValue(sortedHand2[i]);
    
    if (value1 !== value2) {
      return value1 - value2;
    }
  }

  // If all cards are equal, shorter hand is considered lower
  return sortedHand1.length - sortedHand2.length;
}

export function determineStartingPlayer(gameState: GameState): number {
  const playersWithSelectedCards = gameState.players.filter(p => p.hasSelectedInitialCards);
  
  // If not all players have selected their cards, return current player
  if (playersWithSelectedCards.length !== gameState.players.length) {
    return gameState.currentPlayerIndex;
  }

  let lowestIndex = 0;
  
  for (let i = 1; i < gameState.players.length; i++) {
    const comparison = compareHands(
      gameState.players[i].hand,
      gameState.players[lowestIndex].hand
    );
    
    if (comparison < 0) {
      lowestIndex = i;
    }
  }

  return lowestIndex;
}