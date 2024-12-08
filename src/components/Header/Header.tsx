import React, { useState } from 'react';
import { Menu, Settings } from 'lucide-react';
import { MenuDropdown } from './MenuDropdown';
import { SettingsModal } from './SettingsModal';
import { GameSettings } from '../../types/game';

interface HeaderProps {
  onMenuClick: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export function Header({ onMenuClick, settings, onSettingsChange }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-700"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-medium">Menu</span>
          </button>
          
          <h1 className="text-lg font-bold text-gray-900">Shithead</h1>
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Menu Dropdown */}
      {showMenu && (
        <MenuDropdown
          onClose={() => setShowMenu(false)}
          onReturnToMenu={onMenuClick}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={(newSettings) => {
            onSettingsChange(newSettings);
            setShowSettings(false);
          }}
        />
      )}
    </>
  );
}