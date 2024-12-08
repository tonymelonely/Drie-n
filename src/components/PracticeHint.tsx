import React from 'react';
import { HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { PracticeHint as PracticeHintType } from '../utils/practice';

interface PracticeHintProps {
  hint: PracticeHintType;
}

export function PracticeHint({ hint }: PracticeHintProps) {
  const getIcon = () => {
    switch (hint.type) {
      case 'info':
        return <HelpCircle className="w-6 h-6 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <HelpCircle className="w-6 h-6 text-blue-600" />;
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

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg mx-auto px-4">
      <div className={`rounded-lg shadow-lg p-4 border-l-4 ${getBgColor()} animate-bounce-once`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getIcon()}
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