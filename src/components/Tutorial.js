import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, BookOpen, HelpCircle, PlayCircle } from 'lucide-react';
export function Tutorial({ currentStep, onNext, onPrevious, onFinish, onStartPractice }) {
    const steps = [
        {
            title: "Welcome to Shithead!",
            description: "Learn how to play this exciting card game. We'll guide you through all the rules and strategies.",
            icon: _jsx(BookOpen, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Game Setup",
            description: "Each player receives:\n• 6 cards in hand\n• 3 face-up cards (you choose these)\n• 3 face-down cards (unknown until played)\n\nThe goal is to get rid of all your cards before other players.",
            icon: _jsx(HelpCircle, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Playing Cards",
            description: "On your turn:\n• Play one or more cards of equal value\n• Cards must be equal to or higher than the top card\n• Play from your hand first, then face-up cards, finally face-down cards\n• If you can't play, take all cards from the pile",
            icon: _jsx(HelpCircle, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Special Cards",
            description: "Master these powerful cards:\n\n• 2: Can be played on any card\n• 3: Invisible card - next player plays on the card below it\n• 7: Next player must play 7 or lower\n• 10: Clears the pile and play again\n• Joker: Wild card - play anything next\n\nTip: Save these for strategic moments!",
            icon: _jsx(HelpCircle, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Card Combinations",
            description: "Special combinations:\n\n• Multiple cards: Play 2+ cards of the same value\n• Four of a kind: Playing 4 same-value cards clears the pile\n• Multiple turns: After playing 10, Joker, or four of a kind\n\nTip: Look for opportunities to play multiple cards!",
            icon: _jsx(HelpCircle, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Face-down Cards",
            description: "The final challenge:\n\n• Play face-down cards without seeing them\n• Guess wisely - if you can't play the card, take the pile\n• Remember what cards are left\n• Use special cards strategically\n\nTip: Keep track of played cards to make better guesses!",
            icon: _jsx(HelpCircle, { className: "w-12 h-12 text-blue-600" })
        },
        {
            title: "Ready to Practice!",
            description: "Let's try a practice game!\n\n• Play against an easy computer opponent\n• Get step-by-step guidance\n• Learn optimal strategies\n• Practice special card combinations\n• Receive hints for each move\n\nClick 'Start Practice Game' to begin!",
            icon: _jsx(PlayCircle, { className: "w-12 h-12 text-green-600" })
        }
    ];
    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: step.title }), _jsxs("div", { className: "text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full", children: ["Step ", currentStep + 1, " of ", steps.length] })] }), step.icon && (_jsx("div", { className: "flex justify-center py-4", children: step.icon })), _jsx("div", { className: "prose prose-blue max-w-none", children: step.description.split('\n').map((paragraph, index) => (_jsx("p", { className: "text-gray-600 whitespace-pre-line", children: paragraph }, index))) }), _jsxs("div", { className: "flex justify-between pt-4", children: [_jsxs("button", { onClick: onPrevious, disabled: currentStep === 0, className: "flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 \n                rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed\n                transition-colors duration-200", children: [_jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }), "Previous"] }), isLastStep ? (_jsxs("button", { onClick: onStartPractice, className: "flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 \n                  rounded-lg hover:bg-green-700 transition-colors duration-200", children: ["Start Practice Game", _jsx(PlayCircle, { className: "w-4 h-4 ml-2" })] })) : (_jsxs("button", { onClick: onNext, className: "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 \n                  rounded-lg hover:bg-blue-700 transition-colors duration-200", children: ["Next", _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] }))] })] }) }) }));
}
