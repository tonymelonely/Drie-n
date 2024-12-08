import React, { useState } from 'react';
import { Plus, LogIn, Loader2 } from 'lucide-react';

interface NetworkGameSetupProps {
  onCreateRoom: () => Promise<void>;
  onJoinRoom: (roomCode: string) => Promise<void>;
  isCreatingRoom: boolean;
}

export function NetworkGameSetup({ 
  onCreateRoom, 
  onJoinRoom,
  isCreatingRoom 
}: NetworkGameSetupProps) {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateRoom = async () => {
    try {
      setError('');
      await onCreateRoom();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    }
  };

  const handleJoinRoom = async () => {
    if (roomCode.length !== 6) {
      setError('Room code must be 6 characters');
      return;
    }

    setError('');
    setIsJoining(true);
    
    try {
      await onJoinRoom(roomCode.toUpperCase());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
      setIsJoining(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleCreateRoom}
          disabled={isCreatingRoom || isJoining}
          className={`flex flex-col items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors
            ${isCreatingRoom || isJoining
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isCreatingRoom ? (
            <Loader2 className="w-5 h-5 mb-2 animate-spin" />
          ) : (
            <Plus className="w-5 h-5 mb-2" />
          )}
          Create Room
        </button>

        <button
          onClick={handleJoinRoom}
          disabled={!roomCode || roomCode.length !== 6 || isCreatingRoom || isJoining}
          className={`flex flex-col items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors
            ${!roomCode || roomCode.length !== 6 || isCreatingRoom || isJoining
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
            }`}
        >
          {isJoining ? (
            <Loader2 className="w-5 h-5 mb-2 animate-spin" />
          ) : (
            <LogIn className="w-5 h-5 mb-2" />
          )}
          Join Room
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Code
        </label>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.target.value.toUpperCase());
            setError('');
          }}
          placeholder="Enter 6-digit room code"
          maxLength={6}
          disabled={isCreatingRoom || isJoining}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 
            uppercase tracking-wider text-center font-mono disabled:bg-gray-50 disabled:text-gray-500"
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>

      <div className="text-xs text-gray-500 text-center">
        {isCreatingRoom ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating room...
          </div>
        ) : isJoining ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Joining room...
          </div>
        ) : (
          "Enter a room code to join an existing game, or create a new room"
        )}
      </div>
    </div>
  );
}