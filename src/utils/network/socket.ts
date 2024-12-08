import { io, Socket } from 'socket.io-client';
import { SERVER_CONFIG } from './config';
import { NetworkCallbacks } from './types';
import { RoomManager } from './room';
import { GameStateManager } from './game';

export class SocketManager {
  private socket: Socket | null = null;
  private callbacks: NetworkCallbacks | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  public room: RoomManager | null = null;
  public game: GameStateManager | null = null;

  async connect(callbacks: NetworkCallbacks): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.callbacks = callbacks;
        this.socket = io(SERVER_CONFIG.url, SERVER_CONFIG.options);
        
        this.setupSocketListeners();
        this.initializeManagers();
        
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

  private initializeManagers(): void {
    if (!this.socket) return;
    
    this.room = new RoomManager(this.socket);
    this.game = new GameStateManager(this.socket);
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.on('gameState', (state) => {
      this.callbacks?.onGameState(state);
    });

    this.socket.on('players', (players) => {
      this.callbacks?.onPlayers(players);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.callbacks?.onError(error);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.callbacks?.onDisconnect?.();
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

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.callbacks = null;
    this.room = null;
    this.game = null;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}