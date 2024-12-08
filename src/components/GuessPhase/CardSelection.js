import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card as CardComponent } from '../Card';
import { motion } from 'framer-motion';
export function CardSelection({ cards, onCardSelected }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleCardClick = (card, index) => {
        if (selectedIndex === null) {
            setSelectedIndex(index);
            onCardSelected(card);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-center", children: "Choose a Face-down Card" }), _jsx("p", { className: "text-sm text-gray-600 text-center", children: "Select one of your face-down cards to play. Choose carefully!" }), _jsx("div", { className: "flex justify-center gap-4", children: cards.map((card, index) => (_jsx(motion.div, { whileHover: selectedIndex === null ? { scale: 1.05 } : {}, whileTap: selectedIndex === null ? { scale: 0.95 } : {}, className: "cursor-pointer preserve-3d", children: _jsx(CardComponent, { faceDown: true, onClick: () => selectedIndex === null && handleCardClick(card, index), selected: selectedIndex === index, isPlayable: selectedIndex === null }) }, card.id))) }), _jsx("p", { className: "text-xs text-gray-500 text-center mt-4", children: selectedIndex !== null
                    ? "Revealing card..."
                    : "Click on a card to make your guess" })] }));
}
