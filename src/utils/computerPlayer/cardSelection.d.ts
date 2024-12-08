import { Card, GameState } from '../../types/game';
export declare function findLowestCard(cards: Card[]): Card | null;
export declare function findHighestCard(cards: Card[]): Card | null;
export declare function findSpecialCards(cards: Card[]): Card[];
export declare function findPlayableCards(cards: Card[], topCard: Card | undefined, isThreeActive: boolean): Card[];
export declare function groupCardsByValue(cards: Card[]): Record<string | number, Card[]>;
export declare function findBestCardGroup(cards: Card[], gameState: GameState): Card[];
