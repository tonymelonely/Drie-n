import React from 'react';
import { TutorialHint as TutorialHintType } from '../utils/tutorial';
import { HelpCircle } from 'lucide-react';

interface TutorialHintProps {
  hint: TutorialHintType;
}

export function TutorialHint({ hint }: TutorialHintProps) {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600 animate-bounce-once">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">
              {hint.title}
            </h3>
            <div className="mt-1 text-sm text-gray-600 whitespace-pre-line">
              {hint.message}
            </div>
            {hint.action && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {hint.action === 'play' && "Click the highlighted card(s) to play"}
                  {hint.action === 'take' && "Click 'Take Pile' to continue"}
                  {hint.action === 'select' && "Select cards to continue"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}