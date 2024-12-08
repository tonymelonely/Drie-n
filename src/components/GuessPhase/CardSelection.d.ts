import { Card } from '../../types/game';
interface CardSelectionProps {
    cards: Card[];
    onCardSelected: (card: Card) => void;
}
export declare function CardSelection({ cards, onCardSelected }: CardSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
