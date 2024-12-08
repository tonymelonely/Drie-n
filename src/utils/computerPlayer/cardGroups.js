export function groupCardsByValue(cards) {
    const groups = cards.reduce((acc, card) => {
        const value = card.value;
        if (!acc[value]) {
            acc[value] = { value, cards: [] };
        }
        acc[value].cards.push(card);
        return acc;
    }, {});
    return Object.values(groups).sort((a, b) => b.cards.length - a.cards.length);
}
export function findFourOfAKind(groups) {
    const fourOfAKind = groups.find(group => group.cards.length >= 4);
    return fourOfAKind?.cards.slice(0, 4) || null;
}
export function findMultiples(groups) {
    const multiples = groups.find(group => group.cards.length > 1);
    return multiples?.cards || null;
}
export function findSpecialCards(cards) {
    return cards.filter(card => [2, 3, 7, 10].includes(card.value) || card.value === 'joker');
}
export function findRegularCards(cards) {
    return cards.filter(card => typeof card.value === 'number' && ![2, 3, 7, 10].includes(card.value));
}
