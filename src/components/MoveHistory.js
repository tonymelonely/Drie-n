import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { X } from 'lucide-react';
export function MoveHistory({ moves, onClose }) {
    const formatCardValue = (value) => {
        if (value === 'joker')
            return 'Joker';
        if (value === 11)
            return 'J';
        if (value === 12)
            return 'Q';
        if (value === 13)
            return 'K';
        if (value === 14)
            return 'A';
        return value;
    };
    const formatSuit = (suit) => {
        switch (suit) {
            case 'hearts': return '♥';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'spades': return '♠';
            default: return '';
        }
    };
    const formatCard = (card) => {
        if (card.value === 'joker')
            return '🃏';
        const value = formatCardValue(card.value);
        const suit = formatSuit(card.suit);
        const color = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-black';
        return (_jsxs("span", { className: color, children: [value, suit] }));
    };
    return (_jsxs("div", { className: "absolute top-12 left-0 w-80 bg-white rounded-lg shadow-xl p-4 mt-2", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-bold", children: "Computer Moves" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto", children: moves.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center italic", children: "No moves yet" })) : (moves.map((move, index) => (_jsxs("div", { className: "border-b border-gray-200 pb-3 last:border-0", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("span", { className: "font-medium text-sm", children: ["Move ", moves.length - index] }), _jsx("span", { className: "text-xs text-gray-500", children: new Date(move.timestamp).toLocaleTimeString() })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Source: " }), _jsx("span", { className: "font-medium capitalize", children: move.type })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Description: " }), _jsx("span", { className: "font-medium", children: move.description })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Played: " }), _jsx("span", { className: "font-medium space-x-1", children: move.cards.map((card, i) => (_jsxs("span", { children: [formatCard(card), i < move.cards.length - 1 && ', '] }, card.id))) })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Pile: " }), _jsx("span", { className: "font-medium", children: move.pileState.length === 0 ? (_jsx("span", { className: "text-gray-500 italic", children: "Empty" })) : (move.pileState.map((card, i) => (_jsxs("span", { children: [formatCard(card), i < move.pileState.length - 1 && ', '] }, card.id)))) })] })] })] }, index)))) })] }));
}
