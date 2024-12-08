import { NetworkMessage } from './types';
import { GameState, Player } from '../../types/game';

export class MessageHandler {
  private gameStateCallback: ((state: GameState) => void) | null = null;
  private playersCallback: ((players: Player[]) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;

  constructor(
    onGameState: (state: GameState) => void,
    onPlayers: (players: Player[]) => void,
    onError: (error: string) => void
  ) {
    this.gameStateCallback = onGameState;
    this.playersCallback = onPlayers;
    this.errorCallback = onError;
  }

  handleMessage(message: NetworkMessage): void {
    try {
      switch (message.type) {
        case 'gameState':
          this.gameStateCallback?.(message.payload);
          break;
        case 'players':
          this.playersCallback?.(message.payload);
          break;
        case 'joinRequest':
          // Handle join requests
          break;
        case 'startGame':
          // Handle game start
          break;
        default:
          console.warn('Unknown message type:', message);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      this.errorCallback?.('Failed to process network message');
    }
  }

  cleanup(): void {
    this.gameStateCallback = null;
    this.playersCallback = null;
    this.errorCallback = null;
  }
}