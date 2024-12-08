import { GameState, Card } from '../types/game';
export type TutorialHint = {
    title: string;
    message: string;
    highlightedCards?: Card[];
    action?: 'play' | 'take' | 'select';
};
export declare function getTutorialHint(gameState: GameState): TutorialHint | null;
export declare function getComputerPlayHint(gameState: GameState): string;
