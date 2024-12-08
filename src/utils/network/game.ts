import { Socket } from 'socket.io-client';
import { GameState } from '../types/game';

export class GameStateManager {
  constructor(private socket: Socket) {}

  startGame(): void {
    this.socket.emit('startGame');
  }

  updateGameState(state: GameState): void {
    this.socket.emit('updateGameState', state);
  }
}