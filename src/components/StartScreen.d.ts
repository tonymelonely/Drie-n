import { GameMode, Difficulty, GameSettings } from '../types/game';
interface StartScreenProps {
    onStart: (config: {
        playerCount: number;
        gameMode: GameMode;
        difficulty?: Difficulty;
        roomCode?: string;
    }) => void;
    settings: GameSettings;
    onSettingsChange: (settings: GameSettings) => void;
}
export declare function StartScreen({ onStart, settings, onSettingsChange }: StartScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
