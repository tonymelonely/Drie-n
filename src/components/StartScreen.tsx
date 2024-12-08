import React, { useState } from 'react';
import { Settings, Users, Monitor, Cpu, BookOpen, Cog } from 'lucide-react';
import { GameMode, Difficulty, GameSettings } from '../types/game';
import { SettingsModal } from './Header/SettingsModal';
import { NetworkGameSetup } from './NetworkGameSetup';

interface StartScreenProps {
  onStart: (config: {
    playerCount: number,
    gameMode: GameMode,
    difficulty?: Difficulty,
    roomCode?: string
  }) => Promise<void>;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export function StartScreen({ onStart, settings, onSettingsChange }: StartScreenProps) {
  const [gameMode, setGameMode] = useState<GameMode>('local');
  const [playerCount, setPlayerCount] = useState(2);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [showSettings, setShowSettings] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setError('');
  };

  const handleCreateRoom = async () => {
    setIsCreatingRoom(true);
    setError('');
    
    try {
      await onStart({
        playerCount: 2,
        gameMode: 'network'
      });
    } catch (error) {
      console.error('Failed to create room:', error);
      setError(error instanceof Error ? error.message : 'Failed to create room');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleJoinRoom = async (roomCode: string) => {
    setError('');
    
    try {
      await onStart({
        playerCount: 2,
        gameMode: 'network',
        roomCode
      });
    } catch (error) {
      console.error('Failed to join room:', error);
      setError(error instanceof Error ? error.message : 'Failed to join room');
    }
  };

  const handleStart = async () => {
    if (gameMode !== 'network') {
      try {
        await onStart({
          playerCount,
          gameMode,
          difficulty: gameMode === 'computer' ? difficulty : undefined
        });
      } catch (error) {
        console.error('Failed to start game:', error);
        setError(error instanceof Error ? error.message : 'Failed to start game');
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900 flex items-center justify-center`}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-96 relative">
        <button
          onClick={() => setShowSettings(true)}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Cog className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <Settings className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Shithead</h1>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Game Mode
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => handleGameModeSelect('local')}
                className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'local'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Users className="w-5 h-5 mb-1" />
                Local
              </button>
              <button
                onClick={() => handleGameModeSelect('network')}
                className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'network'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Monitor className="w-5 h-5 mb-1" />
                Network
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGameModeSelect('computer')}
                className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'computer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Cpu className="w-5 h-5 mb-1" />
                Computer
              </button>
              <button
                onClick={() => handleGameModeSelect('tutorial')}
                className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'tutorial'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <BookOpen className="w-5 h-5 mb-1" />
                Tutorial
              </button>
            </div>
          </div>

          {gameMode === 'computer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['easy', 'normal', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors
                      ${difficulty === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameMode === 'local' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Players
              </label>
              <select
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {[2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Players</option>
                ))}
              </select>
            </div>
          )}

          {gameMode === 'network' && (
            <NetworkGameSetup
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
              isCreatingRoom={isCreatingRoom}
            />
          )}

          {gameMode !== 'network' && (
            <button
              onClick={handleStart}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                transition duration-200 font-medium"
            >
              {gameMode === 'tutorial' ? 'Start Tutorial' : 'Start Game'}
            </button>
          )}
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={(newSettings) => {
            onSettingsChange(newSettings);
            setShowSettings(false);
          }}
        />
      )}
    </div>
  );
}