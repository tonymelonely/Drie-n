import { Card as CardType } from '../types/game';
interface CardProps {
    card?: CardType;
    faceDown?: boolean;
    onClick?: () => void;
    selected?: boolean;
    hasSameValueInHand?: boolean;
    pileTopCard?: CardType;
    isPlayable?: boolean;
    showInfo?: boolean;
    cardBackColor?: string;
}
export declare function Card({ card, faceDown, onClick, selected, hasSameValueInHand, pileTopCard, isPlayable, showInfo, cardBackColor }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
