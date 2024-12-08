import { Card as CardType } from '../types/game';
interface PlayerHandProps {
    cards: CardType[];
    selectedCards: CardType[];
    onCardClick: (card: CardType) => void;
}
export declare function PlayerHand({ cards, selectedCards, onCardClick }: PlayerHandProps): import("react/jsx-runtime").JSX.Element;
export {};
