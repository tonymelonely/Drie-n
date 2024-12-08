import React from 'react';
import { HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { GameState } from '../types/game';
import { getGameHint } from '../utils/gameHints';

interface GameHintsProps {
  gameState: GameState;
}

export function GameHints({ gameState }: GameHintsProps) {
  const hint = getGameHint(gameState);
  if (!hint) return null;

  const getIcon = () => {
    switch (hint.type) {
      case 'info':
        return <HelpCircle className="w-4 h-4 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm mx-auto px-4">
      <div className={`rounded-lg shadow-lg p-3 ${
        hint.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-600' :
        hint.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-600' :
        'bg-green-50 border-l-4 border-green-600'
      }`}>
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              {hint.title}
            </h3>
            <div className="mt-0.5 text-xs text-gray-600 whitespace-pre-line">
              {hint.message}
            </div>
            {hint.action && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {hint.action}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}