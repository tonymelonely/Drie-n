import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from 'lucide-react';
export function ComputerTimeout({ onContinue }) {
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-sm w-full mx-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(AlertCircle, { className: "w-6 h-6 text-yellow-600" }), _jsx("h2", { className: "text-xl font-bold", children: "Computer Stuck" })] }), _jsx("p", { className: "text-gray-600 mb-6", children: "The computer is taking too long to make a move. Click continue to skip the computer's turn." }), _jsx("button", { onClick: onContinue, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 \n            transition-colors font-medium", children: "Continue Game" })] }) }));
}
