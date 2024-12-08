import { GameState, Card, Player } from '../types/game';
import { canPlayCard, getEffectiveTopCard } from './deck';

export type TutorialHint = {
  title: string;
  message: string;
  highlightedCards?: Card[];
  action?: 'play' | 'take' | 'select';
};

export function getTutorialHint(gameState: GameState): TutorialHint | null {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  
  if (!currentPlayer || currentPlayer.isComputer) return null;

  // Initial card selection phase
  if (gameState.gamePhase === 'selectingCards' && !currentPlayer.hasSelectedInitialCards) {
    return {
      title: "Choose Your Face-up Cards",
      message: "Select 3 cards from your hand to place face-up. Choose carefully!\n\nTip: Special cards (2, 3, 10, Joker) are valuable to keep face-up as they can help you in tough situations.",
      action: 'select'
    };
  }

  // Playing phase
  if (gameState.gamePhase === 'playing') {
    const { card: effectiveTopCard, isThreeActive } = getEffectiveTopCard(gameState.pile);
    const playableCards = currentPlayer.hand.filter(card => 
      !effectiveTopCard || canPlayCard(card, effectiveTopCard, isThreeActive)
    );

    // Group cards by value to find sets
    const cardGroups = playableCards.reduce((groups, card) => {
      const value = card.value;
      if (!groups[value]) groups[value] = [];
      groups[value].push(card);
      return groups;
    }, {} as Record<string | number, Card[]>);

    // Find the best possible play
    const fourOfAKind = Object.values(cardGroups).find(group => group.length >= 4);
    const multipleCards = Object.values(cardGroups).find(group => group.length > 1);
    const specialCards = playableCards.filter(card => 
      card.value === 2 || card.value === 10 || card.value === 'joker'
    );

    if (playableCards.length === 0) {
      return {
        title: "No Playable Cards",
        message: "You can't play any cards on the current pile. You must take all the cards.\n\nTip: Taking cards isn't always bad - you might get special cards that can help you later!",
        action: 'take'
      };
    }

    if (fourOfAKind) {
      return {
        title: "Four of a Kind Available!",
        message: "You can play all four cards of the same value! This will clear the pile and give you another turn.",
        highlightedCards: fourOfAKind,
        action: 'play'
      };
    }

    if (specialCards.length > 0) {
      const card = specialCards[0];
      let message = "";
      if (card.value === 2) {
        message = "2s can be played on any card and reset the pile value to 2.";
      } else if (card.value === 10) {
        message = "10s clear the pile and give you another turn!";
      } else if (card.value === 'joker') {
        message = "Jokers are wild cards that can be played anytime and give you another turn!";
      }

      return {
        title: "Special Card Available!",
        message,
        highlightedCards: [card],
        action: 'play'
      };
    }

    if (multipleCards) {
      return {
        title: "Multiple Cards Available!",
        message: "You can play multiple cards of the same value. This is a good way to get rid of cards quickly!",
        highlightedCards: multipleCards,
        action: 'play'
      };
    }

    return {
      title: "Choose a Card",
      message: "Play any card that's equal to or higher than the current pile.\n\nTip: Try to save special cards for when you really need them!",
      highlightedCards: [playableCards[0]],
      action: 'play'
    };
  }

  // Guessing phase (face-down cards)
  if (gameState.gamePhase === 'guessing') {
    return {
      title: "Face-down Cards",
      message: "You must now play your face-down cards without seeing them first.\n\nTip: Try to remember what cards have been played to make better guesses!",
      action: 'select'
    };
  }

  return null;
}

export function getComputerPlayHint(gameState: GameState): string {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  if (!currentPlayer?.isComputer) return '';

  const { card: effectiveTopCard } = getEffectiveTopCard(gameState.pile);
  let message = "Computer is thinking...";

  if (gameState.gamePhase === 'selectingCards') {
    message = "Computer is selecting its face-up cards...";
  } else if (gameState.gamePhase === 'playing') {
    if (!effectiveTopCard) {
      message = "Computer can play any card...";
    } else {
      message = `Computer must play ${effectiveTopCard.value} or higher...`;
    }
  } else if (gameState.gamePhase === 'guessing') {
    message = "Computer is choosing a face-down card...";
  }

  return message;
}