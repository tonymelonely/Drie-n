import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
export function LoadingScreen({ settings }) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
        return () => clearInterval(timer);
    }, []);
    return (_jsx("div", { className: `min-h-screen bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900 flex items-center justify-center`, children: _jsxs("div", { className: "bg-white rounded-lg p-8 shadow-2xl w-96 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx(Settings, { className: "w-8 h-8 text-blue-600 animate-spin" }), _jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Loading Game" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: "bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out", style: { width: `${progress}%` } }) }), _jsx("p", { className: "text-center text-gray-600 text-sm animate-pulse", children: progress < 100 ? 'Preparing your game...' : 'Ready to start!' })] }) }));
}
