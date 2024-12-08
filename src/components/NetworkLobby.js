import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Users, Play, Copy, Loader2, ArrowLeft } from 'lucide-react';
export function NetworkLobby({ roomCode, players, isHost, onStartGame, onLeaveRoom }) {
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
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("button", { onClick: onLeaveRoom, className: "p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600", title: "Leave room", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-2xl font-bold", children: "Game Lobby" }), _jsx("div", { className: "w-9" }), " "] }), _jsxs("div", { className: "relative mb-6", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 bg-gray-100 rounded-lg p-3", children: [_jsx("span", { className: "font-mono text-lg tracking-wider", children: roomCode }), _jsx("button", { onClick: copyRoomCode, className: "p-1.5 hover:bg-gray-200 rounded-lg transition-colors", title: "Copy room code", children: _jsx(Copy, { className: "w-4 h-4" }) })] }), showCopied && (_jsx("div", { className: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 \n              bg-black text-white text-sm px-3 py-1 rounded-full animate-fade-in", children: "Copied!" }))] }), _jsxs("div", { className: "space-y-4 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between text-sm text-gray-600", children: [_jsxs("span", { children: ["Players (", players.length, "/6)"] }), isHost && players.length < 2 && (_jsx("span", { className: "animate-pulse", children: "Waiting for players..." }))] }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: players.map((player) => (_jsxs("div", { className: "flex items-center gap-3 bg-gray-50 p-3 rounded-lg", children: [_jsx(Users, { className: "w-4 h-4 text-gray-600" }), _jsx("span", { className: "font-medium flex-1", children: player.name }), player.isHost && (_jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full", children: "Host" }))] }, player.id))) })] }), isHost ? (_jsx("button", { onClick: handleStartGame, disabled: !canStartGame || isStarting, className: `w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
              ${canStartGame && !isStarting
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'} transition-colors`, children: isStarting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), "Starting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4" }), "Start Game"] })) })) : (_jsx("div", { className: "text-center text-sm text-gray-600", children: "Waiting for host to start the game..." })), isHost && !canStartGame && (_jsx("p", { className: "text-sm text-gray-500 text-center mt-4", children: "Need at least 2 players to start the game" }))] }) }));
}
