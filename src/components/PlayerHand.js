import { jsx as _jsx } from "react/jsx-runtime";
import { Card as CardComponent } from './Card';
export function PlayerHand({ cards, selectedCards, onCardClick }) {
    return (_jsx("div", { className: "flex justify-center gap-2", children: cards.map((card) => (_jsx(CardComponent, { card: card, onClick: () => onCardClick(card), selected: selectedCards.some(c => c.id === card.id) }, card.id))) }));
}
