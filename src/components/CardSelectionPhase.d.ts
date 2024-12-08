import { Card as CardType, Player } from '../types/game';
interface CardSelectionPhaseProps {
    player: Player;
    onCardsSelected: (cards: CardType[]) => void;
}
export declare function CardSelectionPhase({ player, onCardsSelected }: CardSelectionPhaseProps): import("react/jsx-runtime").JSX.Element | null;
export {};
