import { v4 as uuidv4 } from 'uuid';
import { Player } from '../../types/game';

export class RoomManager {
  private rooms: Map<string, Set<string>> = new Map();
  
  createRoom(): string {
    const roomCode = this.generateRoomCode();
    this.rooms.set(roomCode, new Set());
    return roomCode;
  }

  joinRoom(roomCode: string, playerId: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room) return false;
    
    if (room.size >= 6) return false;
    
    room.add(playerId);
    return true;
  }

  leaveRoom(roomCode: string, playerId: string): void {
    const room = this.rooms.get(roomCode);
    if (!room) return;
    
    room.delete(playerId);
    if (room.size === 0) {
      this.rooms.delete(roomCode);
    }
  }

  getRoomPlayers(roomCode: string): string[] {
    const room = this.rooms.get(roomCode);
    return room ? Array.from(room) : [];
  }

  private generateRoomCode(): string {
    return uuidv4().slice(0, 6).toUpperCase();
  }

  isRoomFull(roomCode: string): boolean {
    const room = this.rooms.get(roomCode);
    return room ? room.size >= 6 : false;
  }

  roomExists(roomCode: string): boolean {
    return this.rooms.has(roomCode);
  }
}