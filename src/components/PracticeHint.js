import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
export function PracticeHint({ hint }) {
    const getIcon = () => {
        switch (hint.type) {
            case 'info':
                return _jsx(HelpCircle, { className: "w-6 h-6 text-blue-600" });
            case 'warning':
                return _jsx(AlertCircle, { className: "w-6 h-6 text-yellow-600" });
            case 'success':
                return _jsx(CheckCircle, { className: "w-6 h-6 text-green-600" });
            default:
                return _jsx(HelpCircle, { className: "w-6 h-6 text-blue-600" });
        }
    };
    const getBgColor = () => {
        switch (hint.type) {
            case 'info':
                return 'bg-blue-50 border-blue-600';
            case 'warning':
                return 'bg-yellow-50 border-yellow-600';
            case 'success':
                return 'bg-green-50 border-green-600';
            default:
                return 'bg-blue-50 border-blue-600';
        }
    };
    return (_jsx("div", { className: "fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg mx-auto px-4", children: _jsx("div", { className: `rounded-lg shadow-lg p-4 border-l-4 ${getBgColor()} animate-bounce-once`, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: getIcon() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: hint.title }), _jsx("div", { className: "mt-1 text-sm text-gray-600 whitespace-pre-line", children: hint.message }), hint.action && (_jsx("div", { className: "mt-2", children: _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: hint.action }) }))] })] }) }) }));
}
