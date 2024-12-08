import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameState, Player } from '../types/game';
import { RoomState, ServerResponse, RoomResponse } from '../utils/network/types';
import { initializeGameState } from '../utils/gameInitializer';

const app = express();
const httpServer = createServer(app);

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

const rooms = new Map<string, RoomState>();

function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  let currentRoom: string | null = null;

  socket.on('createRoom', (_, callback: (response: ServerResponse<RoomResponse>) => void) => {
    try {
      const roomCode = generateRoomCode();
      const player: Player = {
        id: socket.id,
        name: `Player ${socket.id.slice(0, 4)}`,
        hand: [],
        faceUpCards: [],
        faceDownCards: [],
        hasSelectedInitialCards: false,
        isHost: true
      };

      rooms.set(roomCode, {
        code: roomCode,
        players: [player],
        hostId: socket.id
      });

      currentRoom = roomCode;
      socket.join(roomCode);
      
      callback({ data: { roomCode } });
      io.to(roomCode).emit('players', [player]);
      console.log(`Room created: ${roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
      callback({ error: 'Failed to create room' });
    }
  });

  socket.on('joinRoom', (roomCode: string, callback: (response: ServerResponse) => void) => {
    try {
      console.log(`Attempting to join room: ${roomCode}`);
      const room = rooms.get(roomCode);
      
      if (!room) {
        callback({ error: 'Room not found' });
        return;
      }

      if (room.players.length >= 6) {
        callback({ error: 'Room is full' });
        return;
      }

      const player: Player = {
        id: socket.id,
        name: `Player ${socket.id.slice(0, 4)}`,
        hand: [],
        faceUpCards: [],
        faceDownCards: [],
        hasSelectedInitialCards: false,
        isHost: false
      };

      room.players.push(player);
      currentRoom = roomCode;
      socket.join(roomCode);
      
      callback({});
      io.to(roomCode).emit('players', room.players);
      console.log(`Player ${socket.id} joined room ${roomCode}`);
    } catch (error) {
      console.error('Error joining room:', error);
      callback({ error: 'Failed to join room' });
    }
  });

  socket.on('startGame', () => {
    if (!currentRoom) return;
    
    const room = rooms.get(currentRoom);
    if (!room || socket.id !== room.hostId) return;

    try {
      if (room.players.length >= 2) {
        const gameState = initializeGameState({
          playerCount: room.players.length,
          gameMode: 'network',
          roomCode: currentRoom
        }, {
          tableBackground: 'green',
          cardBackColor: 'blue',
          menuBackground: 'blue'
        });

        gameState.players = gameState.players.map((p, i) => ({
          ...p,
          id: room.players[i].id,
          name: room.players[i].name,
          isHost: room.players[i].isHost
        }));

        room.gameState = gameState;
        io.to(currentRoom).emit('gameState', gameState);
        console.log(`Game started in room ${currentRoom}`);
      }
    } catch (error) {
      console.error('Error starting game:', error);
      socket.emit('error', 'Failed to start game');
    }
  });

  socket.on('updateGameState', (state: GameState) => {
    if (!currentRoom) return;
    
    const room = rooms.get(currentRoom);
    if (!room) return;

    try {
      room.gameState = state;
      socket.to(currentRoom).emit('gameState', state);
    } catch (error) {
      console.error('Error updating game state:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (currentRoom) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.players = room.players.filter(p => p.id !== socket.id);
        
        if (room.players.length === 0) {
          rooms.delete(currentRoom);
          console.log(`Room ${currentRoom} deleted - no players remaining`);
        } else if (socket.id === room.hostId) {
          room.hostId = room.players[0].id;
          room.players[0].isHost = true;
          io.to(currentRoom).emit('players', room.players);
          console.log(`New host assigned in room ${currentRoom}: ${room.players[0].id}`);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});