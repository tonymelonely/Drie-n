import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Wand2 } from 'lucide-react';
export function GameControls({ selectedCards, onPlay, onTakePile, onRandomCard, canPlay, showTakePile }) {
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg", children: _jsxs("div", { className: "flex justify-center gap-3 max-w-lg mx-auto", children: [_jsxs("button", { onClick: onPlay, disabled: !canPlay || selectedCards.length === 0, className: `px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${canPlay && selectedCards.length > 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: ["Play (", selectedCards.length, ")"] }), showTakePile && (_jsx("button", { onClick: onTakePile, className: "px-4 py-2 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors animate-pulse", children: "Take Pile" })), _jsxs("button", { onClick: onRandomCard, className: "px-4 py-2 rounded-lg font-semibold text-sm bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2", children: [_jsx(Wand2, { className: "w-4 h-4" }), "Random Card"] })] }) }));
}
