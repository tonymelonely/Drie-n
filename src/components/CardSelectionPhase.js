import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Card as CardComponent } from './Card';
export function CardSelectionPhase({ player, onCardsSelected }) {
    const [selectedCards, setSelectedCards] = useState([]);
    // If computer player, don't show the selection UI
    if (player.isComputer) {
        return null;
    }
    const handleCardClick = (card) => {
        setSelectedCards(prev => {
            const isSelected = prev.some(c => c.id === card.id);
            if (isSelected) {
                return prev.filter(c => c.id !== card.id);
            }
            else if (prev.length < 3) {
                return [...prev, card];
            }
            return prev;
        });
    };
    const handleConfirm = () => {
        if (selectedCards.length === 3) {
            onCardsSelected(selectedCards);
            setSelectedCards([]);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-8 max-w-3xl w-full", children: [_jsxs("h2", { className: "text-2xl font-bold mb-4", children: [player.name, ", select 3 cards"] }), _jsx("p", { className: "text-gray-600 mb-6", children: "Choose 3 cards from your hand to place face-up on your face-down cards." }), _jsx("div", { className: "flex flex-wrap gap-4 justify-center mb-6", children: player.hand.map((card) => (_jsx("div", { className: "relative", children: _jsx(CardComponent, { card: card, onClick: () => handleCardClick(card), selected: selectedCards.some(c => c.id === card.id) }) }, card.id))) }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("p", { className: "mb-4 text-sm text-gray-600", children: ["Selected cards: ", selectedCards.length, " / 3"] }), _jsx("button", { onClick: handleConfirm, disabled: selectedCards.length !== 3, className: `w-full py-3 rounded-lg font-semibold transition-colors
              ${selectedCards.length === 3
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: "Confirm Selection" })] })] }) }));
}
