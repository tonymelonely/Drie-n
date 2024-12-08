import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function JokerSelection({ onValueSelected }) {
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-8 max-w-md w-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Select Card Value for Joker" }), _jsx("div", { className: "grid grid-cols-4 gap-4", children: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) => (_jsx("button", { onClick: () => onValueSelected(value), className: "p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-bold transition-colors", children: value === 11 ? 'J' :
                            value === 12 ? 'Q' :
                                value === 13 ? 'K' :
                                    value === 14 ? 'A' :
                                        value }, value))) })] }) }));
}
