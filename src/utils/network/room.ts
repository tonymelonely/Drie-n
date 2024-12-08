import { Socket } from 'socket.io-client';
import { Player } from '../types/game';
import { RoomState, ServerResponse, RoomResponse } from './types';

export class RoomManager {
  private roomState: RoomState | null = null;

  constructor(private socket: Socket) {}

  async createRoom(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('createRoom', null, (response: ServerResponse<RoomResponse>) => {
        if (response.error) {
          reject(new Error(response.error));
        } else if (response.data) {
          this.roomState = {
            code: response.data.roomCode,
            players: [],
            hostId: this.socket.id
          };
          resolve(response.data.roomCode);
        } else {
          reject(new Error('Invalid server response'));
        }
      });
    });
  }

  async joinRoom(roomCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinRoom', roomCode, (response: ServerResponse) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  leaveRoom(): void {
    if (this.roomState) {
      this.socket.emit('leaveRoom', this.roomState.code);
      this.roomState = null;
    }
  }

  updatePlayers(players: Player[]): void {
    if (this.roomState) {
      this.roomState.players = players;
    }
  }

  getRoomState(): RoomState | null {
    return this.roomState;
  }

  isHost(): boolean {
    return this.roomState?.hostId === this.socket.id;
  }
}