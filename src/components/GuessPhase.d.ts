import { Card } from '../types/game';
interface GuessPhaseProps {
    cards: Card[];
    onGuess: (card: Card) => void;
    lastGuessWrong?: boolean;
    correctGuess?: boolean;
    onNextTurn?: () => void;
    pileTopCard?: Card;
    onTakePile?: () => void;
}
export declare function GuessPhase({ cards, onGuess, lastGuessWrong, correctGuess, onNextTurn, pileTopCard, onTakePile }: GuessPhaseProps): import("react/jsx-runtime").JSX.Element;
export {};
