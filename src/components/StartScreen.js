import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Settings, Users, Monitor, Cpu, BookOpen, Cog } from 'lucide-react';
import { SettingsModal } from './Header/SettingsModal';
import { NetworkGameSetup } from './NetworkGameSetup';
export function StartScreen({ onStart, settings, onSettingsChange }) {
    const [gameMode, setGameMode] = useState('local');
    const [playerCount, setPlayerCount] = useState(2);
    const [difficulty, setDifficulty] = useState('normal');
    const [showSettings, setShowSettings] = useState(false);
    const [showNetworkSetup, setShowNetworkSetup] = useState(false);
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const handleGameModeSelect = (mode) => {
        setGameMode(mode);
        if (mode === 'network') {
            setShowNetworkSetup(true);
        }
        else {
            setShowNetworkSetup(false);
        }
    };
    const handleCreateRoom = async () => {
        setIsCreatingRoom(true);
        try {
            onStart({
                playerCount: 2,
                gameMode: 'network',
                roomCode: undefined // Room code will be generated by server
            });
        }
        catch (error) {
            console.error('Failed to create room:', error);
        }
        finally {
            setIsCreatingRoom(false);
        }
    };
    const handleJoinRoom = (roomCode) => {
        onStart({
            playerCount: 2,
            gameMode: 'network',
            roomCode
        });
    };
    const handleStart = () => {
        if (gameMode !== 'network') {
            onStart({
                playerCount,
                gameMode,
                difficulty: gameMode === 'computer' ? difficulty : undefined
            });
        }
    };
    return (_jsxs("div", { className: `min-h-screen bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900 flex items-center justify-center`, children: [_jsxs("div", { className: "bg-white rounded-lg p-8 shadow-2xl w-96 relative", children: [_jsx("button", { onClick: () => setShowSettings(true), className: "absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Cog, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex items-center justify-center mb-6", children: [_jsx(Settings, { className: "w-8 h-8 text-blue-600 mr-2" }), _jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Shithead" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Game Mode" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("button", { onClick: () => handleGameModeSelect('local'), className: `flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'local'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: [_jsx(Users, { className: "w-5 h-5 mb-1" }), "Local"] }), _jsxs("button", { onClick: () => handleGameModeSelect('network'), className: `flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'network'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: [_jsx(Monitor, { className: "w-5 h-5 mb-1" }), "Network"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("button", { onClick: () => handleGameModeSelect('computer'), className: `flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'computer'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: [_jsx(Cpu, { className: "w-5 h-5 mb-1" }), "Computer"] }), _jsxs("button", { onClick: () => handleGameModeSelect('tutorial'), className: `flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${gameMode === 'tutorial'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: [_jsx(BookOpen, { className: "w-5 h-5 mb-1" }), "Tutorial"] })] })] }), gameMode === 'computer' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Difficulty" }), _jsx("div", { className: "grid grid-cols-3 gap-4", children: ['easy', 'normal', 'hard'].map((level) => (_jsx("button", { onClick: () => setDifficulty(level), className: `px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors
                      ${difficulty === level
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: level }, level))) })] })), gameMode === 'local' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Number of Players" }), _jsx("select", { value: playerCount, onChange: (e) => setPlayerCount(Number(e.target.value)), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500", children: [2, 3, 4, 5, 6].map(num => (_jsxs("option", { value: num, children: [num, " Players"] }, num))) })] })), gameMode === 'network' && (_jsx(NetworkGameSetup, { onCreateRoom: handleCreateRoom, onJoinRoom: handleJoinRoom, isCreatingRoom: isCreatingRoom })), gameMode !== 'network' && (_jsx("button", { onClick: handleStart, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 \n                transition duration-200 font-medium", children: gameMode === 'tutorial' ? 'Start Tutorial' : 'Start Game' }))] })] }), showSettings && (_jsx(SettingsModal, { settings: settings, onClose: () => setShowSettings(false), onSave: (newSettings) => {
                    onSettingsChange(newSettings);
                    setShowSettings(false);
                } }))] }));
}
