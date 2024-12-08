import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User } from 'lucide-react';
export function PlayerIndicator({ player }) {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4 text-gray-600" }), _jsxs("span", { className: "font-medium text-sm", children: [player.name, "'s Turn"] })] }));
}
