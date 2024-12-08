import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HelpCircle } from 'lucide-react';
export function CardInfo({ card }) {
    const getCardDescription = () => {
        switch (card.value) {
            case 2:
                return "Can be played on any card. Resets the pile value to 2.";
            case 3:
                return "Invisible card - next player plays on the card below it.";
            case 7:
                return "Next player must play 7 or lower.";
            case 10:
                return "Clears the pile and gives you another turn.";
            case 'joker':
                return "Wild card - can be played on anything. Gives you another turn.";
            default:
                return `Regular card - must be played on equal or lower value cards.`;
        }
    };
    const isSpecialCard = [2, 3, 7, 10].includes(card.value) || card.value === 'joker';
    return (_jsxs("div", { className: "absolute -top-2 -right-2 group", children: [_jsx("button", { className: "w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center", children: _jsx(HelpCircle, { className: "w-3 h-3 text-blue-600" }) }), _jsxs("div", { className: "hidden group-hover:block absolute z-50 right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-3 text-sm", children: [_jsx("div", { className: "font-semibold text-gray-800 mb-1", children: card.value === 'joker' ? 'Joker' : `${card.value} of ${card.suit}` }), _jsx("div", { className: "text-gray-600", children: getCardDescription() }), isSpecialCard && (_jsx("div", { className: "mt-1 text-xs text-blue-600 font-medium", children: "Special card - use strategically!" }))] })] }));
}
