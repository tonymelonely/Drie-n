import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, X } from 'lucide-react';
export function MenuDropdown({ onClose, onReturnToMenu }) {
    const handleReturnToMenu = () => {
        onClose();
        onReturnToMenu();
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50", onClick: onClose, children: _jsxs("div", { className: "absolute top-16 left-4 w-64 bg-white rounded-lg shadow-xl p-2", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "flex justify-between items-center mb-2 p-2", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Game Menu" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("button", { onClick: handleReturnToMenu, className: "w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg", children: [_jsx(Home, { className: "w-5 h-5" }), _jsx("span", { children: "Return to Main Menu" })] })] }) }));
}
