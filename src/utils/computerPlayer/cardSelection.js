import { canPlayCard } from '../deck';
export function findLowestCard(cards) {
    if (cards.length === 0)
        return null;
    return cards.reduce((lowest, card) => {
        if (typeof card.value === 'number' && typeof lowest.value === 'number') {
            return card.value < lowest.value ? card : lowest;
        }
        return lowest;
    }, cards[0]);
}
export function findHighestCard(cards) {
    if (cards.length === 0)
        return null;
    return cards.reduce((highest, card) => {
        if (typeof card.value === 'number' && typeof highest.value === 'number') {
            return card.value > highest.value ? card : highest;
        }
        return highest;
    }, cards[0]);
}
export function findSpecialCards(cards) {
    return cards.filter(card => [2, 3, 7, 10].includes(card.value) || card.value === 'joker');
}
export function findPlayableCards(cards, topCard, isThreeActive) {
    if (!topCard)
        return cards;
    return cards.filter(card => canPlayCard(card, topCard, isThreeActive));
}
export function groupCardsByValue(cards) {
    return cards.reduce((groups, card) => {
        const value = card.value;
        if (!groups[value])
            groups[value] = [];
        groups[value].push(card);
        return groups;
    }, {});
}
export function findBestCardGroup(cards, gameState) {
    const cardGroups = groupCardsByValue(cards);
    // Priority 1: Four of a kind
    const fourOfAKind = Object.values(cardGroups).find(group => group.length >= 4);
    if (fourOfAKind)
        return fourOfAKind.slice(0, 4);
    // Priority 2: Multiple cards
    const multiples = Object.values(cardGroups).find(group => group.length > 1);
    if (multiples)
        return multiples;
    // Priority 3: Special cards
    const specialCards = findSpecialCards(cards);
    if (specialCards.length > 0)
        return [specialCards[0]];
    // Priority 4: Single card
    return cards.length > 0 ? [cards[0]] : [];
}
