import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { getGameHint } from '../utils/gameHints';
export function GameHints({ gameState }) {
    const hint = getGameHint(gameState);
    if (!hint)
        return null;
    const getIcon = () => {
        switch (hint.type) {
            case 'info':
                return _jsx(HelpCircle, { className: "w-4 h-4 text-blue-600" });
            case 'warning':
                return _jsx(AlertCircle, { className: "w-4 h-4 text-yellow-600" });
            case 'success':
                return _jsx(CheckCircle, { className: "w-4 h-4 text-green-600" });
        }
    };
    return (_jsx("div", { className: "fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm mx-auto px-4", children: _jsx("div", { className: `rounded-lg shadow-lg p-3 ${hint.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-600' :
                hint.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-600' :
                    'bg-green-50 border-l-4 border-green-600'}`, children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: getIcon() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-900", children: hint.title }), _jsx("div", { className: "mt-0.5 text-xs text-gray-600 whitespace-pre-line", children: hint.message }), hint.action && (_jsx("div", { className: "mt-1", children: _jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: hint.action }) }))] })] }) }) }));
}
