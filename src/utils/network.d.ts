import { GameState, Player } from '../types/game';
export declare class NetworkManager {
    private socket;
    private gameStateCallback;
    private playersCallback;
    connect(onGameState: (state: GameState) => void, onPlayers: (players: Player[]) => void): void;
    createRoom(): Promise<string>;
    joinRoom(roomCode: string): Promise<void>;
    leaveRoom(): void;
    startGame(): void;
    updateGameState(state: GameState): void;
    disconnect(): void;
}
