import { ComputerMove } from '../types/game';
interface MoveHistoryProps {
    moves: ComputerMove[];
    onClose: () => void;
}
export declare function MoveHistory({ moves, onClose }: MoveHistoryProps): import("react/jsx-runtime").JSX.Element;
export {};
