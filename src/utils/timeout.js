const COMPUTER_TURN_TIMEOUT = 5000; // 5 seconds
export function startComputerTurnTimeout(gameState, onTimeout) {
    return setTimeout(() => {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        if (currentPlayer?.isComputer) {
            onTimeout();
        }
    }, COMPUTER_TURN_TIMEOUT);
}
