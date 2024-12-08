import { Card } from '../../types/game';
import { CardGroup } from './types';
export declare function groupCardsByValue(cards: Card[]): CardGroup[];
export declare function findFourOfAKind(groups: CardGroup[]): Card[] | null;
export declare function findMultiples(groups: CardGroup[]): Card[] | null;
export declare function findSpecialCards(cards: Card[]): Card[];
export declare function findRegularCards(cards: Card[]): Card[];
