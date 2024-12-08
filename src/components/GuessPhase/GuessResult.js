import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Card as CardComponent } from '../Card';
export function GuessResult({ type, onNextTurn, onTakePile, isSpecialCard, selectedCard }) {
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "bg-white rounded-lg p-6 max-w-sm w-full mx-4", children: [_jsx("h2", { className: "text-xl font-bold mb-3 text-center", children: type === 'correct' ? "Card Played!" : "Wrong Card!" }), selectedCard && (_jsx("div", { className: "flex justify-center mb-4", children: _jsx(CardComponent, { card: selectedCard, isPlayable: false }) })), _jsx("p", { className: "text-sm text-gray-600 mb-4 text-center", children: type === 'correct'
                        ? isSpecialCard
                            ? selectedCard?.value === 'joker'
                                ? "Joker! You can play another card on your next turn."
                                : "10! The pile is cleared and you can play another card on your next turn."
                            : "Card played successfully! Next player's turn."
                        : "This card cannot be played. You must take all cards from the pile plus this card." }), _jsxs("div", { className: "flex justify-center", children: [type === 'correct' && onNextTurn && (_jsx("button", { onClick: onNextTurn, className: "px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg \n                       hover:bg-blue-700 transition-colors", children: isSpecialCard ? "Continue Turn" : "Next Turn" })), type === 'wrong' && onTakePile && (_jsx("button", { onClick: onTakePile, className: "px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg \n                       hover:bg-red-700 transition-colors animate-pulse", children: "Take Pile + Card" }))] })] }) }));
}
