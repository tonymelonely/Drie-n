import { GameState, GameMode, Difficulty, GameSettings } from '../types/game';
export declare function initializeGameState(config: {
    playerCount: number;
    gameMode: GameMode;
    difficulty?: Difficulty;
    roomCode?: string;
}, settings: GameSettings): GameState;
