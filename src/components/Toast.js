import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function Toast({ message, type = 'error', duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);
    if (!isVisible)
        return null;
    const bgColor = {
        error: 'bg-red-500',
        success: 'bg-green-500',
        info: 'bg-blue-500'
    }[type];
    return (_jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2 z-50", children: _jsxs("div", { className: `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in`, children: [type === 'error' && (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })), _jsx("span", { className: "font-medium", children: message })] }) }));
}
