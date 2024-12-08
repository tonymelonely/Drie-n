import { Card as CardType, GameState } from '../types/game';
interface GameBoardProps {
    gameState: GameState;
    onPlayCard: (cards: CardType[]) => void;
    onTakePile: () => void;
    onInitialCardsSelected: (playerId: string, cards: CardType[]) => void;
    onGuessCard: (card: CardType) => void;
    onNextTurn: () => void;
}
export declare function GameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }: GameBoardProps): import("react/jsx-runtime").JSX.Element;
export {};
