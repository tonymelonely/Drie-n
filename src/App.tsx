import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { Tutorial } from './components/Tutorial';
import { ComputerTimeout } from './components/ComputerTimeout';
import { Header } from './components/Header';
import { LoadingScreen } from './components/LoadingScreen';
import { NetworkLobby } from './components/NetworkLobby';
import { GameState, Player, Card, GameMode, Difficulty, GameSettings } from './types/game';
import { NetworkManager } from './utils/network';

const defaultSettings: GameSettings = {
  tableBackground: 'green',
  cardBackColor: 'blue',
  menuBackground: 'blue'
};

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showComputerTimeout, setShowComputerTimeout] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [networkManager] = useState(() => new NetworkManager());
  const [networkPlayers, setNetworkPlayers] = useState<Player[]>([]);
  const [networkRoomCode, setNetworkRoomCode] = useState<string>('');
  const [showLobby, setShowLobby] = useState(false);
  const [error, setError] = useState<string>('');

  const handleStartGame = async (config: {
    playerCount: number,
    gameMode: GameMode,
    difficulty?: Difficulty,
    roomCode?: string
  }) => {
    setIsLoading(true);
    setError('');

    if (config.gameMode === 'network') {
      try {
        await networkManager.connect(
          (state: GameState) => {
            console.log('Game state updated:', state);
            setGameState(state);
            setShowLobby(false);
            setIsLoading(false);
          },
          (players: Player[]) => {
            console.log('Players updated:', players);
            setNetworkPlayers(players);
            setIsLoading(false);
          }
        );

        if (config.roomCode) {
          await networkManager.joinRoom(config.roomCode);
          setNetworkRoomCode(config.roomCode);
        } else {
          const roomCode = await networkManager.createRoom();
          setNetworkRoomCode(roomCode);
        }
        
        setShowLobby(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to handle network game:', error);
        setError(error instanceof Error ? error.message : 'Failed to connect');
        setIsLoading(false);
      }
    } else {
      // Handle local game modes
      setGameState(null); // Reset game state for new game
      setIsLoading(false);
    }
  };

  const handleNetworkStartGame = () => {
    networkManager.startGame();
  };

  const handleLeaveNetworkGame = () => {
    networkManager.disconnect();
    setGameState(null);
    setNetworkPlayers([]);
    setNetworkRoomCode('');
    setShowLobby(false);
  };

  if (isLoading) {
    return <LoadingScreen settings={settings} />;
  }

  if (showLobby && networkRoomCode) {
    return (
      <NetworkLobby
        roomCode={networkRoomCode}
        players={networkPlayers}
        isHost={networkPlayers[0]?.id === networkPlayers.find(p => p.isHost)?.id}
        onStartGame={handleNetworkStartGame}
        onLeaveRoom={handleLeaveNetworkGame}
      />
    );
  }

  return (
    <div className={`min-h-screen ${
      gameState 
        ? `bg-gradient-to-br from-${gameState.settings.tableBackground}-800 to-${gameState.settings.tableBackground}-900`
        : `bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900`
    }`}>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
      
      {!gameState ? (
        <StartScreen 
          onStart={handleStartGame}
          settings={settings}
          onSettingsChange={setSettings}
        />
      ) : (
        <>
          <Header 
            onMenuClick={handleLeaveNetworkGame}
            settings={settings}
            onSettingsChange={setSettings}
          />
          <GameBoard
            gameState={gameState}
            onPlayCard={(cards) => networkManager.updateGameState({
              ...gameState,
              pile: [...gameState.pile, ...cards]
            })}
            onTakePile={() => {}}
            onInitialCardsSelected={() => {}}
            onGuessCard={() => {}}
            onNextTurn={() => {}}
          />
        </>
      )}
    </div>
  );
}