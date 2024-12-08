import { Card, GameState, Player } from '../types/game';
export declare function createDeck(): Card[];
export declare function createRandomCard(): Card;
export declare function shuffle(array: Card[]): Card[];
export declare function findLastNonThreeCard(pile: Card[]): Card | undefined;
export declare function findLastEffectiveCard(pile: Card[]): Card | undefined;
export declare function countConsecutiveSameValue(pile: Card[]): {
    count: number;
    value: number | 'joker';
};
export declare function canPlayCard(card: Card, topCard: Card | undefined, isThreeActive?: boolean): boolean;
export declare function canPlayFromFaceUpCards(player: Player): boolean;
export declare function canPlayFromFaceDownCards(player: Player): boolean;
export declare function getEffectiveTopCard(pile: Card[]): {
    card: Card | undefined;
    isThreeActive: boolean;
    sameValueCount: number;
};
export declare function sortCards(cards: Card[]): Card[];
export declare function shouldKeepTurn(cards: Card[], pile: Card[]): boolean;
export declare function drawCardsFromDeck(gameState: GameState, playerId: string): GameState;
export declare function checkWinCondition(player: Player): boolean;
export declare function playCards(gameState: GameState, playerId: string, cards: Card[]): GameState;
export declare function handleFaceDownGuess(gameState: GameState, playerId: string, guessedCard: Card): GameState;
