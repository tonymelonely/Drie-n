import React from 'react';
import { Player } from '../types/game';
import { User } from 'lucide-react';

interface PlayerIndicatorProps {
  player: Player;
}

export function PlayerIndicator({ player }: PlayerIndicatorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2">
      <User className="w-4 h-4 text-gray-600" />
      <span className="font-medium text-sm">{player.name}'s Turn</span>
    </div>
  );
}