import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Menu, Settings } from 'lucide-react';
import { MenuDropdown } from './MenuDropdown';
import { SettingsModal } from './SettingsModal';
export function Header({ onMenuClick, settings, onSettingsChange }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 h-14 flex items-center justify-between", children: [_jsxs("button", { onClick: () => setShowMenu(true), className: "p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-700", children: [_jsx(Menu, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-medium", children: "Menu" })] }), _jsx("h1", { className: "text-lg font-bold text-gray-900", children: "Shithead" }), _jsx("button", { onClick: () => setShowSettings(true), className: "p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700", children: _jsx(Settings, { className: "w-5 h-5" }) })] }) }), showMenu && (_jsx(MenuDropdown, { onClose: () => setShowMenu(false), onReturnToMenu: onMenuClick })), showSettings && (_jsx(SettingsModal, { settings: settings, onClose: () => setShowSettings(false), onSave: (newSettings) => {
                    onSettingsChange(newSettings);
                    setShowSettings(false);
                } }))] }));
}
