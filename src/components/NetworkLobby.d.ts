import { Player } from '../types/game';
interface NetworkLobbyProps {
    roomCode: string;
    players: Player[];
    isHost: boolean;
    onStartGame: () => void;
    onLeaveRoom: () => void;
}
export declare function NetworkLobby({ roomCode, players, isHost, onStartGame, onLeaveRoom }: NetworkLobbyProps): import("react/jsx-runtime").JSX.Element;
export {};
