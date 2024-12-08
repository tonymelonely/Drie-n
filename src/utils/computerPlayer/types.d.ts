import { Card, GameState, Player } from '../../types/game';
export interface CardGroup {
    value: number | 'joker';
    cards: Card[];
}
export interface ComputerStrategy {
    selectMove(player: Player, gameState: GameState): Card[];
}
export type CardSource = 'hand' | 'faceUp' | 'faceDown';
export interface MoveResult {
    cards: Card[];
    source: CardSource;
}
