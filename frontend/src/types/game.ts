export interface Position {
  x: number;
  y: number;
}

export interface LeaderboardEntry {
  id?: number;
  userName: string;
  score: number;
  difficulty: Difficulty;
  timestamp: number;
}

export interface GameState {
  snake: Position[];
  fruit: Position;
  isGoldenFruit: boolean;
  direction: Position;
  score: number;
  gameOver: boolean;
  gameWon: boolean;
  gamePaused: boolean;
  gameStarted: boolean;
  difficulty: Difficulty;
  boardSize: number;
  cellSize: number;
  speed: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
