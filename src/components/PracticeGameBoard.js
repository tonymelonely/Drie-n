import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GameBoard } from './GameBoard';
import { PracticeHint } from './PracticeHint';
import { getPracticeHint } from '../utils/practice';
export function PracticeGameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }) {
    const hint = getPracticeHint(gameState);
    return (_jsxs("div", { className: "relative", children: [_jsx(GameBoard, { gameState: gameState, onPlayCard: onPlayCard, onTakePile: onTakePile, onInitialCardsSelected: onInitialCardsSelected, onGuessCard: onGuessCard, onNextTurn: onNextTurn, highlightedCards: hint?.highlightedCards }), hint && _jsx(PracticeHint, { hint: hint })] }));
}
