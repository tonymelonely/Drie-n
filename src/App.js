import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { Tutorial } from './components/Tutorial';
import { ComputerTimeout } from './components/ComputerTimeout';
import { Header } from './components/Header';
import { LoadingScreen } from './components/LoadingScreen';
import { NetworkLobby } from './components/NetworkLobby';
import { playCards, handleFaceDownGuess } from './utils/deck';
import { determineStartingPlayer } from './utils/startingPlayer';
import { initializeGameState } from './utils/gameInitializer';
import { NetworkManager } from './utils/network';
const defaultSettings = {
    tableBackground: 'green',
    cardBackColor: 'blue',
    menuBackground: 'blue'
};
export default function App() {
    const [gameState, setGameState] = useState(null);
    const [showComputerTimeout, setShowComputerTimeout] = useState(false);
    const [settings, setSettings] = useState(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);
    const [networkManager] = useState(() => new NetworkManager());
    const [networkPlayers, setNetworkPlayers] = useState([]);
    const [networkRoomCode, setNetworkRoomCode] = useState('');
    const [showLobby, setShowLobby] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    const handleStartGame = async (config) => {
        setIsLoading(true);
        if (config.gameMode === 'network') {
            try {
                // Connect to network game
                networkManager.connect((state) => {
                    setGameState(state);
                    setShowLobby(false);
                    setIsLoading(false);
                }, (players) => {
                    setNetworkPlayers(players);
                    setIsLoading(false);
                });
                if (config.roomCode) {
                    // Join existing room
                    await networkManager.joinRoom(config.roomCode);
                    setNetworkRoomCode(config.roomCode);
                    setShowLobby(true);
                }
                else {
                    // Create new room
                    const roomCode = await networkManager.createRoom();
                    setNetworkRoomCode(roomCode);
                    setShowLobby(true);
                }
            }
            catch (error) {
                console.error('Failed to handle network game:', error);
                setIsLoading(false);
            }
        }
        else {
            // Start local game
            const newGameState = initializeGameState(config, settings);
            setGameState(newGameState);
            setIsLoading(false);
        }
    };
    const handleNetworkStartGame = () => {
        setIsLoading(true);
        networkManager.startGame();
    };
    const handleLeaveNetworkGame = () => {
        networkManager.leaveRoom();
        setGameState(null);
        setNetworkPlayers([]);
        setNetworkRoomCode('');
        setShowLobby(false);
    };
    const handleReturnToMenu = () => {
        if (gameState?.gameMode === 'network') {
            networkManager.disconnect();
        }
        setGameState(null);
        setNetworkPlayers([]);
        setNetworkRoomCode('');
        setShowLobby(false);
    };
    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings);
        if (gameState) {
            setGameState({
                ...gameState,
                settings: newSettings
            });
        }
    };
    const handlePlayCards = (cards) => {
        if (!gameState)
            return;
        const updatedState = playCards(gameState, gameState.players[gameState.currentPlayerIndex].id, cards);
        if (gameState.gameMode === 'network') {
            networkManager.updateGameState(updatedState);
        }
        setGameState(updatedState);
    };
    const handleTakePile = () => {
        if (!gameState)
            return;
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const updatedState = {
            ...gameState,
            players: gameState.players.map(p => p.id === currentPlayer.id
                ? { ...p, hand: [...p.hand, ...gameState.pile] }
                : p),
            pile: [],
            currentPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.players.length,
            jokerPlayed: false
        };
        if (gameState.gameMode === 'network') {
            networkManager.updateGameState(updatedState);
        }
        setGameState(updatedState);
    };
    const handleInitialCardsSelected = (playerId, cards) => {
        if (!gameState)
            return;
        const updatedState = {
            ...gameState,
            players: gameState.players.map(p => {
                if (p.id === playerId) {
                    return {
                        ...p,
                        faceUpCards: cards,
                        hand: p.hand.filter(c => !cards.includes(c)),
                        hasSelectedInitialCards: true
                    };
                }
                return p;
            }),
            currentPlayerIndex: determineStartingPlayer(gameState)
        };
        if (gameState.gameMode === 'network') {
            networkManager.updateGameState(updatedState);
        }
        setGameState(updatedState);
    };
    const handleGuessCard = (card) => {
        if (!gameState)
            return;
        const updatedState = handleFaceDownGuess(gameState, gameState.players[gameState.currentPlayerIndex].id, card);
        if (gameState.gameMode === 'network') {
            networkManager.updateGameState(updatedState);
        }
        setGameState(updatedState);
    };
    if (isLoading) {
        return _jsx(LoadingScreen, { settings: settings });
    }
    // Show network lobby if in network mode and lobby is active
    if (showLobby && networkRoomCode) {
        return (_jsx(NetworkLobby, { roomCode: networkRoomCode, players: networkPlayers, isHost: networkPlayers[0]?.id === networkPlayers.find(p => p.isHost)?.id, onStartGame: handleNetworkStartGame, onLeaveRoom: handleLeaveNetworkGame }));
    }
    return (_jsxs("div", { className: `min-h-screen ${gameState
            ? `bg-gradient-to-br from-${gameState.settings.tableBackground}-800 to-${gameState.settings.tableBackground}-900`
            : `bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900`}`, children: [gameState && (_jsx(Header, { onMenuClick: handleReturnToMenu, settings: settings, onSettingsChange: handleSettingsChange })), !gameState ? (_jsx(StartScreen, { onStart: handleStartGame, settings: settings, onSettingsChange: handleSettingsChange })) : gameState.gamePhase === 'tutorial' && gameState.currentTutorialStep !== undefined ? (_jsx(Tutorial, { currentStep: gameState.currentTutorialStep, onNext: () => setGameState({
                    ...gameState,
                    currentTutorialStep: gameState.currentTutorialStep + 1
                }), onPrevious: () => setGameState({
                    ...gameState,
                    currentTutorialStep: Math.max(0, gameState.currentTutorialStep - 1)
                }), onFinish: () => setGameState(null), onStartPractice: () => handleStartGame({
                    playerCount: 2,
                    gameMode: 'computer',
                    difficulty: 'easy'
                }) })) : (_jsxs(_Fragment, { children: [_jsx(GameBoard, { gameState: gameState, onPlayCard: handlePlayCards, onTakePile: handleTakePile, onInitialCardsSelected: handleInitialCardsSelected, onGuessCard: handleGuessCard, onNextTurn: handleTakePile }), showComputerTimeout && (_jsx(ComputerTimeout, { onContinue: () => {
                            setShowComputerTimeout(false);
                            handleTakePile();
                        } }))] }))] }));
}
