import { GameSettings } from '../../types/game';
interface HeaderProps {
    onMenuClick: () => void;
    settings: GameSettings;
    onSettingsChange: (settings: GameSettings) => void;
}
export declare function Header({ onMenuClick, settings, onSettingsChange }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
