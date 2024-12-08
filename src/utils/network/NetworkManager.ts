import { io, Socket } from 'socket.io-client';
import { GameState, Player } from '../types/game';
import { NetworkCallbacks, ServerResponse, RoomResponse } from './types';
import { SERVER_CONFIG } from './config';

export class NetworkManager {
  private socket: Socket | null = null;
  private callbacks: NetworkCallbacks | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  async connect(onGameState: (state: GameState) => void, onPlayers: (players: Player[]) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.callbacks = {
          onGameState,
          onPlayers,
          onError: (error: string) => console.error('Network error:', error)
        };
        
        this.socket = io(SERVER_CONFIG.url, SERVER_CONFIG.options);
        
        this.setupSocketListeners();
        
        this.socket.on('connect', () => {
          console.log('Socket connected successfully');
          this.reconnectAttempts = 0;
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          this.handleConnectionError(reject);
        });

      } catch (error) {
        console.error('Socket setup error:', error);
        this.callbacks?.onError('Failed to initialize socket connection');
        reject(error);
      }
    });
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.on('gameState', (state: GameState) => {
      console.log('Received game state:', state);
      this.callbacks?.onGameState(state);
    });

    this.socket.on('players', (players: Player[]) => {
      console.log('Received players update:', players);
      this.callbacks?.onPlayers(players);
    });

    this.socket.on('error', (error: string) => {
      console.error('Socket error:', error);
      this.callbacks?.onError(error);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.handleDisconnect();
    });
  }

  private handleConnectionError(reject: (reason?: any) => void): void {
    this.reconnectAttempts++;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      console.log(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
      setTimeout(() => {
        this.socket?.connect();
      }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000));
    } else {
      this.callbacks?.onError('Failed to connect after multiple attempts');
      reject(new Error('Connection failed'));
    }
  }

  private handleDisconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.socket?.connect();
      }, 1000);
    }
  }

  async createRoom(): Promise<string> {
    if (!this.socket) throw new Error('Not connected');

    return new Promise((resolve, reject) => {
      this.socket?.emit('createRoom', null, (response: ServerResponse<RoomResponse>) => {
        console.log('Create room response:', response);
        if (response.error) {
          reject(new Error(response.error));
        } else if (response.data) {
          resolve(response.data.roomCode);
        } else {
          reject(new Error('Invalid server response'));
        }
      });
    });
  }

  async joinRoom(roomCode: string): Promise<void> {
    if (!this.socket) throw new Error('Not connected');

    return new Promise((resolve, reject) => {
      this.socket?.emit('joinRoom', roomCode, (response: ServerResponse) => {
        console.log('Join room response:', response);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  startGame(): void {
    console.log('Starting game...');
    this.socket?.emit('startGame');
  }

  updateGameState(state: GameState): void {
    console.log('Updating game state:', state);
    this.socket?.emit('updateGameState', state);
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.callbacks = null;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}