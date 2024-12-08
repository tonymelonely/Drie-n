import { Card, Player } from '../types/game';
interface PlayerSectionProps {
    player: Player;
    isCurrentPlayer: boolean;
    onCardClick?: (card: Card, source: 'hand' | 'faceUp' | 'faceDown') => void;
    selectedCards: Card[];
    pileTopCard?: Card;
    gamePhase: 'selectingCards' | 'playing' | 'guessing';
    isThreeActive?: boolean;
    cardBackColor?: string;
}
export declare function PlayerSection({ player, isCurrentPlayer, onCardClick, selectedCards, pileTopCard, gamePhase, isThreeActive, cardBackColor }: PlayerSectionProps): import("react/jsx-runtime").JSX.Element | null;
export {};
