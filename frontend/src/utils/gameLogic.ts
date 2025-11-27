import { DIFFICULTY_CONFIGS, DIRECTIONS } from '../constants/game';
import type { Difficulty, GameState, Position } from '../types/game';

export const isOppositeDirection = (
  dir1: Position,
  dir2: Position,
): boolean => {
  return dir1.x === -dir2.x && dir1.y === -dir2.y;
};

export const getInitialGameState = (difficulty: Difficulty): GameState => {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const initialSnake: Position[] = [
    {
      x: Math.floor(config.boardSize / 2),
      y: Math.floor(config.boardSize / 2),
    },
  ];

  return {
    snake: initialSnake,
    fruit: { x: 0, y: 0 }, // Placeholder, not used in movement
    isGoldenFruit: false,
    direction: DIRECTIONS.RIGHT,
    score: 0,
    gameOver: false,
    gameWon: false,
    gamePaused: true,
    gameStarted: false,
    difficulty,
    boardSize: config.boardSize,
    cellSize: config.cellSize,
    speed: config.speed,
  };
};
