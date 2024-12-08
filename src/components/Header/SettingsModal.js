import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { X } from 'lucide-react';
export function SettingsModal({ settings, onClose, onSave }) {
    const [localSettings, setLocalSettings] = React.useState(settings);
    const tableBackgrounds = ['green', 'blue', 'red', 'purple'];
    const cardBackColors = ['blue', 'red', 'black', 'purple'];
    const menuBackgrounds = ['blue', 'purple', 'green', 'red'];
    const handleSave = () => {
        onSave(localSettings);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-96 max-w-full mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "Game Settings" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Table Background" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: tableBackgrounds.map((bg) => (_jsx("button", { onClick: () => setLocalSettings({ ...localSettings, tableBackground: bg }), className: `px-4 py-2 rounded-lg capitalize transition-colors ${localSettings.tableBackground === bg
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: bg }, bg))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Menu Background" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: menuBackgrounds.map((bg) => (_jsx("button", { onClick: () => setLocalSettings({ ...localSettings, menuBackground: bg }), className: `px-4 py-2 rounded-lg capitalize transition-colors ${localSettings.menuBackground === bg
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: bg }, bg))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Card Back Color" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: cardBackColors.map((color) => (_jsx("button", { onClick: () => setLocalSettings({ ...localSettings, cardBackColor: color }), className: `px-4 py-2 rounded-lg capitalize transition-colors ${localSettings.cardBackColor === color
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: color }, color))) })] }), _jsx("button", { onClick: handleSave, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 \n              transition-colors font-medium", children: "Save Settings" })] })] }) }));
}
