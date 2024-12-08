import React from 'react';
import { X } from 'lucide-react';
import { GameSettings, TableBackground, CardBackColor, MenuBackground } from '../../types/game';

interface SettingsModalProps {
  settings: GameSettings;
  onClose: () => void;
  onSave: (settings: GameSettings) => void;
}

export function SettingsModal({ settings, onClose, onSave }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = React.useState<GameSettings>(settings);

  const tableBackgrounds: TableBackground[] = ['green', 'blue', 'red', 'purple'];
  const cardBackColors: CardBackColor[] = ['blue', 'red', 'black', 'purple'];
  const menuBackgrounds: MenuBackground[] = ['blue', 'purple', 'green', 'red'];

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Table Background */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Background
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tableBackgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setLocalSettings({ ...localSettings, tableBackground: bg })}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    localSettings.tableBackground === bg
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Background */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Background
            </label>
            <div className="grid grid-cols-2 gap-2">
              {menuBackgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setLocalSettings({ ...localSettings, menuBackground: bg })}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    localSettings.menuBackground === bg
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Card Back Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Back Color
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cardBackColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setLocalSettings({ ...localSettings, cardBackColor: color })}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    localSettings.cardBackColor === color
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
              transition-colors font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}