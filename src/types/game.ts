export type Difficulty = 'easy' | 'normal' | 'hard';

export type GameMode = 'local' | 'network' | 'computer' | 'tutorial';

export type TableBackground = 'green' | 'blue' | 'red' | 'purple';
export type CardBackColor = 'blue' | 'red' | 'black' | 'purple';
export type MenuBackground = 'blue' | 'purple' | 'green' | 'red';

export type GameSettings = {
  tableBackground: TableBackground;
  cardBackColor: CardBackColor;
  menuBackground: MenuBackground;
};

export type TutorialStep = {
  title: string;
  description: string;
  example?: {
    cards: Card[];
    description: string;
  };
};

export type Card = {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'joker';
  value: number | 'joker';
  id: string;
  effectiveValue?: number;
};

export type ComputerMove = {
  cards: Card[];
  type: 'hand' | 'faceUp' | 'faceDown';
  timestamp: number;
  pileState: Card[];
  description: string;
};

export type Player = {
  id: string;
  name: string;
  hand: Card[];
  faceUpCards: Card[];
  faceDownCards: Card[];
  isComputer?: boolean;
  difficulty?: Difficulty;
  hasSelectedInitialCards: boolean;
  lastGuessWrong?: boolean;
  correctGuess?: boolean;
  isHost?: boolean;
  moveHistory?: ComputerMove[];
  isWinner?: boolean;
};

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  pile: Card[];
  gamePhase: 'setup' | 'selectingCards' | 'playing' | 'guessing' | 'tutorial' | 'gameOver';
  winner: string | null;
  jokerPlayed: boolean;
  gameMode: GameMode;
  roomCode?: string;
  currentTutorialStep?: number;
  settings: GameSettings;
};