import { GameSettings } from '../../types/game';
interface SettingsModalProps {
    settings: GameSettings;
    onClose: () => void;
    onSave: (settings: GameSettings) => void;
}
export declare function SettingsModal({ settings, onClose, onSave }: SettingsModalProps): import("react/jsx-runtime").JSX.Element;
export {};
