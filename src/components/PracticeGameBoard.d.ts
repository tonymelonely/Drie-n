import { GameState, Card } from '../types/game';
interface PracticeGameBoardProps {
    gameState: GameState;
    onPlayCard: (cards: Card[]) => void;
    onTakePile: () => void;
    onInitialCardsSelected: (playerId: string, cards: Card[]) => void;
    onGuessCard: (card: Card) => void;
    onNextTurn: () => void;
}
export declare function PracticeGameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }: PracticeGameBoardProps): import("react/jsx-runtime").JSX.Element;
export {};
