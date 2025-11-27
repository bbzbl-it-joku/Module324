import { DIFFICULTY_CONFIGS, DIRECTIONS } from '../constants/game';
import type { Difficulty, GameState, Position } from '../types/game';

export const generateRandomPosition = (
  boardSize: number,
  snake: Position[],
): Position => {
  let newPosition: Position = { x: 0, y: 0 };
  let isOccupied = true;

  while (isOccupied) {
    newPosition = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };

    isOccupied = snake.some(
      (segment) => segment.x === newPosition.x && segment.y === newPosition.y,
    );
  }

  return newPosition;
};

export const generateNewFruit = (
  boardSize: number,
  snake: Position[],
): { fruit: Position; isGolden: boolean } => {
  // 1/20 chance to spawn golden fruit instead of regular fruit
  const isGolden = Math.random() < 1 / 20;
  const fruit = generateRandomPosition(boardSize, snake);

  return { fruit, isGolden };
};

export const isPositionEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

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
  const { fruit, isGolden } = generateNewFruit(config.boardSize, initialSnake);

  return {
    snake: initialSnake,
    fruit,
    isGoldenFruit: isGolden,
    direction: DIRECTIONS.RIGHT,
    score: 1,
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
