import { Card, GameState, Player } from '../types/game';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;

export function createDeck(): Card[] {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      deck.push({ suit, value, id: `${suit}-${value}` });
    });
  });
  deck.push({ suit: 'joker', value: 'joker', id: 'joker-1' });
  deck.push({ suit: 'joker', value: 'joker', id: 'joker-2' });
  return shuffle(deck);
}

export function createRandomCard(): Card {
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
  const value = VALUES[Math.floor(Math.random() * VALUES.length)];
  return { suit, value, id: `random-${suit}-${value}-${Date.now()}` };
}

export function shuffle(array: Card[]): Card[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function findLastNonThreeCard(pile: Card[]): Card | undefined {
  for (let i = pile.length - 1; i >= 0; i--) {
    if (pile[i].value !== 3) {
      return pile[i];
    }
  }
  return undefined;
}

export function findLastEffectiveCard(pile: Card[]): Card | undefined {
  let lastJokerIndex = -1;
  let lastThreeIndex = -1;

  // Find the last Joker and last Three
  for (let i = pile.length - 1; i >= 0; i--) {
    if (pile[i].value === 'joker' && lastJokerIndex === -1) {
      lastJokerIndex = i;
    }
    if (pile[i].value === 3 && lastThreeIndex === -1) {
      lastThreeIndex = i;
    }
    if (lastJokerIndex !== -1 && lastThreeIndex !== -1) break;
  }

  // If there's a Joker after the last Three, return undefined (can play anything)
  if (lastJokerIndex > lastThreeIndex && lastJokerIndex !== -1) {
    return undefined;
  }

  // If there's a Three as the last card, find the last non-Three card
  if (lastThreeIndex === pile.length - 1) {
    return findLastNonThreeCard(pile);
  }

  return pile[pile.length - 1];
}

export function countConsecutiveSameValue(pile: Card[]): { count: number; value: number | 'joker' } {
  if (pile.length === 0) return { count: 0, value: 2 };
  
  let count = 1;
  const topCard = pile[pile.length - 1];
  
  for (let i = pile.length - 2; i >= 0; i--) {
    if (pile[i].value === topCard.value) {
      count++;
    } else {
      break;
    }
  }
  
  return { count, value: topCard.value };
}

export function canPlayCard(card: Card, topCard: Card | undefined, isThreeActive: boolean = false): boolean {
  // Can always play if there's no top card
  if (!topCard) return true;

  // Special cards can always be played
  if (card.value === 'joker' || card.value === 2 || card.value === 10) return true;

  // Three can always be played
  if (card.value === 3) return true;

  if (typeof card.value === 'number' && typeof topCard.value === 'number') {
    // If there's a 7 on top, next card must be 7 or lower
    if (topCard.value === 7) {
      return card.value <= 7;
    }

    // If playing on a 3, check against the effective card value
    if (isThreeActive) {
      return card.value >= topCard.value;
    }

    // Normal case - card must be equal or higher
    return card.value >= topCard.value;
  }

  return false;
}

export function canPlayFromFaceUpCards(player: Player): boolean {
  return player.hand.length === 0;
}

export function canPlayFromFaceDownCards(player: Player): boolean {
  return player.hand.length === 0 && player.faceUpCards.length === 0;
}

export function getEffectiveTopCard(pile: Card[]): { 
  card: Card | undefined; 
  isThreeActive: boolean;
  sameValueCount: number;
} {
  if (pile.length === 0) {
    return { 
      card: undefined, 
      isThreeActive: false,
      sameValueCount: 0
    };
  }

  const topCard = pile[pile.length - 1];
  const { count } = countConsecutiveSameValue(pile);
  const effectiveCard = findLastEffectiveCard(pile);
  
  return { 
    card: effectiveCard || topCard,
    isThreeActive: topCard.value === 3,
    sameValueCount: count
  };
}

export function sortCards(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => {
    if (a.value === 'joker') return 1;
    if (b.value === 'joker') return -1;
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value - b.value;
    }
    return 0;
  });
}

export function shouldKeepTurn(cards: Card[], pile: Card[]): boolean {
  // Check for special cards that allow another turn
  if (cards.some(c => c.value === 10 || c.value === 'joker')) {
    return true;
  }

  // Check for four of a kind
  const allCards = [...pile.slice(-3), ...cards];
  const { count } = countConsecutiveSameValue(allCards);
  if (count >= 4) {
    return true;
  }

  return false;
}

export function drawCardsFromDeck(gameState: GameState, playerId: string): GameState {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player || gameState.deck.length === 0) return gameState;

  const cardsNeeded = Math.max(0, 3 - player.hand.length);
  if (cardsNeeded === 0) return gameState;

  const drawnCards = gameState.deck.slice(0, cardsNeeded);
  const remainingDeck = gameState.deck.slice(cardsNeeded);

  const updatedPlayers = gameState.players.map(p => {
    if (p.id === playerId) {
      return { ...p, hand: sortCards([...p.hand, ...drawnCards]) };
    }
    return p;
  });

  return {
    ...gameState,
    players: updatedPlayers,
    deck: remainingDeck
  };
}

export function checkWinCondition(player: Player): boolean {
  // Player must have no cards anywhere to win
  return player.hand.length === 0 && 
         player.faceUpCards.length === 0 && 
         player.faceDownCards.length === 0;
}

export function playCards(
  gameState: GameState,
  playerId: string,
  cards: Card[]
): GameState {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  const updatedPlayer = { ...player };
  
  // Remove played cards from the appropriate source
  if (canPlayFromFaceDownCards(player)) {
    updatedPlayer.faceDownCards = player.faceDownCards.filter(
      c => !cards.some(played => played.id === c.id)
    );
  } else if (canPlayFromFaceUpCards(player)) {
    updatedPlayer.faceUpCards = player.faceUpCards.filter(
      c => !cards.some(played => played.id === c.id)
    );
  } else {
    updatedPlayer.hand = sortCards(player.hand.filter(
      c => !cards.some(played => played.id === c.id)
    ));
  }

  // Check if player has won after playing these cards
  const hasWon = checkWinCondition(updatedPlayer);

  if (hasWon) {
    updatedPlayer.isWinner = true;
  }

  const updatedPlayers = gameState.players.map(p => 
    p.id === playerId ? updatedPlayer : p
  );

  const keepTurn = shouldKeepTurn(cards, gameState.pile);
  const clearPile = cards[0]?.value === 10 || keepTurn;

  return {
    ...gameState,
    players: updatedPlayers,
    pile: clearPile ? [] : [...gameState.pile, ...cards],
    winner: hasWon ? playerId : null,
    currentPlayerIndex: keepTurn ? gameState.currentPlayerIndex : 
      (gameState.currentPlayerIndex + 1) % gameState.players.length,
    jokerPlayed: cards.some(c => c.value === 'joker'),
    gamePhase: hasWon ? 'gameOver' : gameState.gamePhase
  };
}

export function handleFaceDownGuess(
  gameState: GameState,
  playerId: string,
  guessedCard: Card
): GameState {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) return gameState;

  const { card: effectiveTopCard, isThreeActive } = getEffectiveTopCard(gameState.pile);
  const isValidGuess = !effectiveTopCard || canPlayCard(guessedCard, effectiveTopCard, isThreeActive);

  if (isValidGuess) {
    const updatedPlayers = gameState.players.map(p => {
      if (p.id === playerId) {
        const updatedPlayer = {
          ...p,
          faceDownCards: p.faceDownCards.filter(c => c.id !== guessedCard.id),
          lastGuessWrong: false,
          correctGuess: true
        };

        // Check if this was the last card
        const hasWon = checkWinCondition(updatedPlayer);

        if (hasWon) {
          return {
            ...updatedPlayer,
            isWinner: true
          };
        }

        return updatedPlayer;
      }
      return p;
    });

    const keepTurn = shouldKeepTurn([guessedCard], gameState.pile);
    const clearPile = guessedCard.value === 10 || keepTurn;
    const updatedPlayer = updatedPlayers.find(p => p.id === playerId)!;
    const hasWon = checkWinCondition(updatedPlayer);

    return {
      ...gameState,
      players: updatedPlayers,
      pile: clearPile ? [] : [...gameState.pile, guessedCard],
      gamePhase: hasWon ? 'gameOver' : 'guessing',
      winner: hasWon ? playerId : null,
      currentPlayerIndex: keepTurn ? gameState.currentPlayerIndex :
        (gameState.currentPlayerIndex + 1) % gameState.players.length,
      jokerPlayed: guessedCard.value === 'joker'
    };
  } else {
    const updatedPlayers = gameState.players.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          hand: sortCards([...p.hand, ...gameState.pile, guessedCard]),
          faceDownCards: p.faceDownCards.filter(c => c.id !== guessedCard.id),
          lastGuessWrong: true,
          correctGuess: false
        };
      }
      return p;
    });

    return {
      ...gameState,
      players: updatedPlayers,
      pile: [],
      gamePhase: 'playing',
      currentPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.players.length,
      jokerPlayed: false
    };
  }
}