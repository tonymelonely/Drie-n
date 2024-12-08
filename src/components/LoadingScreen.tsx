import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';

interface LoadingScreenProps {
  settings: {
    menuBackground: string;
  };
}

export function LoadingScreen({ settings }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${settings.menuBackground}-800 to-purple-900 flex items-center justify-center`}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-96 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Settings className="w-8 h-8 text-blue-600 animate-spin" />
          <h1 className="text-3xl font-bold text-gray-800">Connecting...</h1>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-gray-600 text-sm animate-pulse">
          {progress < 100 ? 'Setting up peer connection...' : 'Ready to connect!'}
        </p>
      </div>
    </div>
  );
}