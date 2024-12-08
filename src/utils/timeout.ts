import { GameState } from '../types/game';

const COMPUTER_TURN_TIMEOUT = 5000; // 5 seconds

export function startComputerTurnTimeout(
  gameState: GameState,
  onTimeout: () => void
): NodeJS.Timeout {
  return setTimeout(() => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer?.isComputer) {
      onTimeout();
    }
  }, COMPUTER_TURN_TIMEOUT);
}