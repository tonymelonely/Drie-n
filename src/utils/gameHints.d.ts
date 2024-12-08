import { GameState, Card } from '../types/game';
export type GameHint = {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    action?: string;
    highlightedCards?: Card[];
};
export declare function getGameHint(gameState: GameState): GameHint | null;
