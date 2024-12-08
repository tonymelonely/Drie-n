import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, LogIn, Loader2 } from 'lucide-react';
export function NetworkGameSetup({ onCreateRoom, onJoinRoom, isCreatingRoom }) {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const handleJoinRoom = async () => {
        if (roomCode.length !== 6) {
            setError('Room code must be 6 characters');
            return;
        }
        setError('');
        setIsJoining(true);
        try {
            await onJoinRoom(roomCode.toUpperCase());
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to join room');
            setIsJoining(false);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("button", { onClick: onCreateRoom, disabled: isCreatingRoom || isJoining, className: `flex flex-col items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors
            ${isCreatingRoom || isJoining
                            ? 'bg-gray-100 text-gray-400 cursor-wait'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`, children: [isCreatingRoom ? (_jsx(Loader2, { className: "w-5 h-5 mb-2 animate-spin" })) : (_jsx(Plus, { className: "w-5 h-5 mb-2" })), "Create Room"] }), _jsxs("button", { onClick: handleJoinRoom, disabled: !roomCode || roomCode.length !== 6 || isCreatingRoom || isJoining, className: `flex flex-col items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors
            ${!roomCode || roomCode.length !== 6 || isCreatingRoom || isJoining
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'}`, children: [isJoining ? (_jsx(Loader2, { className: "w-5 h-5 mb-2 animate-spin" })) : (_jsx(LogIn, { className: "w-5 h-5 mb-2" })), "Join Room"] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Room Code" }), _jsx("input", { type: "text", value: roomCode, onChange: (e) => {
                            setRoomCode(e.target.value.toUpperCase());
                            setError('');
                        }, placeholder: "Enter 6-digit room code", maxLength: 6, disabled: isCreatingRoom || isJoining, className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 \n            uppercase tracking-wider text-center font-mono disabled:bg-gray-50 disabled:text-gray-500" }), error && (_jsx("p", { className: "mt-1 text-xs text-red-600", children: error }))] }), _jsx("div", { className: "text-xs text-gray-500 text-center", children: isCreatingRoom ? (_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), "Creating room..."] })) : isJoining ? (_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), "Joining room..."] })) : ("Enter a room code to join an existing game, or create a new room") })] }));
}
