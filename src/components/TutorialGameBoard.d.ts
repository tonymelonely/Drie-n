import { GameState, Card } from '../types/game';
interface TutorialGameBoardProps {
    gameState: GameState;
    onPlayCard: (cards: Card[]) => void;
    onTakePile: () => void;
    onInitialCardsSelected: (playerId: string, cards: Card[]) => void;
    onGuessCard: (card: Card) => void;
    onNextTurn: () => void;
}
export declare function TutorialGameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }: TutorialGameBoardProps): import("react/jsx-runtime").JSX.Element;
export {};
