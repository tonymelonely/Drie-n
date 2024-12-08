import React from 'react';
import { Users, Play, Copy, Loader2, ArrowLeft } from 'lucide-react';
import { Player } from '../types/game';

interface NetworkLobbyProps {
  roomCode: string;
  players: Player[];
  isHost: boolean;
  onStartGame: () => void;
  onLeaveRoom: () => void;
}

export function NetworkLobby({ 
  roomCode, 
  players, 
  isHost, 
  onStartGame, 
  onLeaveRoom 
}: NetworkLobbyProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const canStartGame = players.length >= 2 && players.length <= 6 && isHost;

  const handleStartGame = () => {
    setIsStarting(true);
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onLeaveRoom}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Leave room"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Game Lobby</h2>
          <div className="w-9" />
        </div>

        <div className="relative mb-6">
          <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg p-3">
            <span className="font-mono text-lg tracking-wider">{roomCode}</span>
            <button
              onClick={copyRoomCode}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title="Copy room code"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {showCopied && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
              bg-black text-white text-sm px-3 py-1 rounded-full animate-fade-in">
              Copied!
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Players ({players.length}/6)</span>
            {isHost && players.length < 2 && (
              <span className="animate-pulse">Waiting for players...</span>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
              >
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium flex-1">{player.name}</span>
                {player.isHost && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {isHost ? (
          <button
            onClick={handleStartGame}
            disabled={!canStartGame || isStarting}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
              ${canStartGame && !isStarting
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } transition-colors`}
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Game
              </>
            )}
          </button>
        ) : (
          <div className="text-center text-sm text-gray-600">
            Waiting for host to start the game...
          </div>
        )}

        {isHost && !canStartGame && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Need at least 2 players to start the game
          </p>
        )}
      </div>
    </div>
  );
}