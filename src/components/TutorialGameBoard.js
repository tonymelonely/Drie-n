import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GameBoard } from './GameBoard';
import { TutorialHint } from './TutorialHint';
import { getTutorialHint } from '../utils/tutorial';
export function TutorialGameBoard({ gameState, onPlayCard, onTakePile, onInitialCardsSelected, onGuessCard, onNextTurn }) {
    const tutorialHint = getTutorialHint(gameState);
    return (_jsxs("div", { className: "relative", children: [_jsx(GameBoard, { gameState: gameState, onPlayCard: onPlayCard, onTakePile: onTakePile, onInitialCardsSelected: onInitialCardsSelected, onGuessCard: onGuessCard, onNextTurn: onNextTurn, highlightedCards: tutorialHint?.highlightedCards }), tutorialHint && (_jsx("div", { className: "fixed inset-0 bg-black/10 pointer-events-none", children: _jsx(TutorialHint, { hint: tutorialHint }) }))] }));
}
