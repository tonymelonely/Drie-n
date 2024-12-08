import { Card, GameState } from '../../types/game';
import { canPlayCard } from '../deck';

export function findLowestCard(cards: Card[]): Card | null {
  if (cards.length === 0) return null;
  
  return cards.reduce((lowest, card) => {
    if (typeof card.value === 'number' && typeof lowest.value === 'number') {
      return card.value < lowest.value ? card : lowest;
    }
    return lowest;
  }, cards[0]);
}

export function findHighestCard(cards: Card[]): Card | null {
  if (cards.length === 0) return null;
  
  return cards.reduce((highest, card) => {
    if (typeof card.value === 'number' && typeof highest.value === 'number') {
      return card.value > highest.value ? card : highest;
    }
    return highest;
  }, cards[0]);
}

export function findSpecialCards(cards: Card[]): Card[] {
  return cards.filter(card => 
    [2, 3, 7, 10].includes(card.value as number) || card.value === 'joker'
  );
}

export function findPlayableCards(cards: Card[], topCard: Card | undefined, isThreeActive: boolean): Card[] {
  if (!topCard) return cards;
  return cards.filter(card => canPlayCard(card, topCard, isThreeActive));
}

export function groupCardsByValue(cards: Card[]): Record<string | number, Card[]> {
  return cards.reduce((groups, card) => {
    const value = card.value;
    if (!groups[value]) groups[value] = [];
    groups[value].push(card);
    return groups;
  }, {} as Record<string | number, Card[]>);
}

export function findBestCardGroup(cards: Card[], gameState: GameState): Card[] {
  const cardGroups = groupCardsByValue(cards);
  
  // Priority 1: Four of a kind
  const fourOfAKind = Object.values(cardGroups).find(group => group.length >= 4);
  if (fourOfAKind) return fourOfAKind.slice(0, 4);

  // Priority 2: Multiple cards
  const multiples = Object.values(cardGroups).find(group => group.length > 1);
  if (multiples) return multiples;

  // Priority 3: Special cards
  const specialCards = findSpecialCards(cards);
  if (specialCards.length > 0) return [specialCards[0]];

  // Priority 4: Single card
  return cards.length > 0 ? [cards[0]] : [];
}