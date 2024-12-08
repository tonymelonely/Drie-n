import { jsx as _jsx } from "react/jsx-runtime";
import { CardSelection } from './CardSelection';
import { GuessResult } from './GuessResult';
export function GuessPhase({ cards, onGuess, lastGuessWrong, correctGuess, onNextTurn, pileTopCard, onTakePile }) {
    if (lastGuessWrong) {
        return (_jsx(GuessResult, { type: "wrong", onTakePile: onTakePile, selectedCard: pileTopCard }));
    }
    if (correctGuess) {
        return (_jsx(GuessResult, { type: "correct", onNextTurn: onNextTurn, isSpecialCard: pileTopCard?.value === 'joker' || pileTopCard?.value === 10, selectedCard: pileTopCard }));
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-white rounded-lg p-6 max-w-sm w-full mx-4", children: _jsx(CardSelection, { cards: cards, onCardSelected: onGuess }) }) }));
}
