import { canPlayCard, getEffectiveTopCard } from './deck';
export function getGameHint(gameState) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.isComputer)
        return null;
    const { card: effectiveTopCard, isThreeActive } = getEffectiveTopCard(gameState.pile);
    // Initial card selection phase
    if (gameState.gamePhase === 'selectingCards') {
        const specialCards = currentPlayer.hand.filter(card => [2, 3, 10].includes(card.value) || card.value === 'joker');
        return {
            title: 'Choose Your Starting Cards',
            message: specialCards.length > 0
                ? 'You have special cards! Consider keeping some in your hand for later.\n\nTip: High cards are good to place face-up, but special cards are valuable in your hand.'
                : 'Select 3 cards to place face-up. Higher cards are safer to place face-up.',
            type: 'info',
            action: 'Select 3 cards to continue',
            highlightedCards: specialCards
        };
    }
    // Playing phase
    if (gameState.gamePhase === 'playing') {
        const playableCards = currentPlayer.hand.filter(card => !effectiveTopCard || canPlayCard(card, effectiveTopCard, isThreeActive));
        // Group cards by value
        const cardGroups = playableCards.reduce((groups, card) => {
            const value = card.value;
            if (!groups[value])
                groups[value] = [];
            groups[value].push(card);
            return groups;
        }, {});
        // Check for special combinations
        const fourOfAKind = Object.values(cardGroups).find(group => group.length >= 4);
        const multipleCards = Object.values(cardGroups).find(group => group.length > 1);
        const specialCards = playableCards.filter(card => [2, 3, 10].includes(card.value) || card.value === 'joker');
        if (playableCards.length === 0) {
            return {
                title: 'No Playable Cards',
                message: 'You must take all cards from the pile.\n\nDon\'t worry! Sometimes taking cards gives you powerful combinations.',
                type: 'warning',
                action: 'Click "Take Pile" to continue'
            };
        }
        if (fourOfAKind) {
            return {
                title: 'Four of a Kind!',
                message: 'You can play all four cards to clear the pile and get another turn.\n\nThis is a very powerful move!',
                type: 'success',
                action: 'Select all four cards to play them',
                highlightedCards: fourOfAKind
            };
        }
        if (multipleCards) {
            return {
                title: 'Multiple Cards Available',
                message: 'You can play multiple cards of the same value.\n\nTip: Playing multiple cards helps you get rid of cards faster!',
                type: 'success',
                action: 'Select multiple cards to play them',
                highlightedCards: multipleCards
            };
        }
        if (specialCards.length > 0) {
            const card = specialCards[0];
            let message = '';
            if (card.value === 2) {
                message = '2 can be played on any card and resets the pile to 2.';
            }
            else if (card.value === 3) {
                message = '3 is invisible - next player plays on the card below it.';
            }
            else if (card.value === 10) {
                message = '10 clears the pile and gives you another turn!';
            }
            else if (card.value === 'joker') {
                message = 'Joker can be played anytime and gives you another turn!';
            }
            return {
                title: 'Special Card Available',
                message,
                type: 'info',
                action: 'Play this special card',
                highlightedCards: [card]
            };
        }
        return {
            title: 'Your Turn',
            message: effectiveTopCard
                ? `Play a card equal to or higher than ${effectiveTopCard.value}.\n\nTip: Save special cards for tough situations!`
                : 'You can play any card since the pile is empty.\n\nTip: Start with lower cards when possible.',
            type: 'info',
            action: 'Select a card to play',
            highlightedCards: [playableCards[0]]
        };
    }
    // Face-down cards phase
    if (gameState.gamePhase === 'guessing') {
        return {
            title: 'Face-down Cards',
            message: effectiveTopCard
                ? `Current value to beat: ${effectiveTopCard.value}\n\nTry to remember what cards are still in play!`
                : 'The pile is empty - any card will work!\n\nThis is a good chance to get rid of a face-down card.',
            type: effectiveTopCard ? 'warning' : 'info',
            action: 'Select a face-down card'
        };
    }
    return null;
}
