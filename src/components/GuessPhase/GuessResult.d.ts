import { Card } from '../../types/game';
interface GuessResultProps {
    type: 'correct' | 'wrong';
    onNextTurn?: () => void;
    onTakePile?: () => void;
    isSpecialCard?: boolean;
    selectedCard?: Card;
}
export declare function GuessResult({ type, onNextTurn, onTakePile, isSpecialCard, selectedCard }: GuessResultProps): import("react/jsx-runtime").JSX.Element;
export {};
