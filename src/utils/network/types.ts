import { GameState, Player } from '../types/game';

export interface NetworkCallbacks {
  onGameState: (state: GameState) => void;
  onPlayers: (players: Player[]) => void;
  onError: (error: string) => void;
  onDisconnect?: () => void;
}

export interface ServerResponse<T = void> {
  data?: T;
  error?: string;
}

export interface RoomResponse {
  roomCode: string;
}

export interface RoomState {
  code: string;
  players: Player[];
  gameState?: GameState;
  hostId: string;
}