import { Card } from '../types/game';
interface GameControlsProps {
    selectedCards: Card[];
    pileTopCard?: Card;
    onPlay: () => void;
    onTakePile: () => void;
    onRandomCard: () => void;
    canPlay: boolean;
    showTakePile: boolean;
}
export declare function GameControls({ selectedCards, onPlay, onTakePile, onRandomCard, canPlay, showTakePile }: GameControlsProps): import("react/jsx-runtime").JSX.Element;
export {};
