import type { Difficulty, Position } from '../types/game';

export const DIFFICULTY_CONFIGS: Record<
  Difficulty,
  { boardSize: number; cellSize: number; speed: number }
> = {
  easy: {
    boardSize: 10,
    cellSize: 30,
    speed: 200,
  },
  medium: {
    boardSize: 20,
    cellSize: 20,
    speed: 130,
  },
  hard: {
    boardSize: 30,
    cellSize: 15,
    speed: 100,
  },
};

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const satisfies Record<string, Position>;

export const KEY_TO_DIRECTION: Record<string, Position> = {
  ArrowUp: DIRECTIONS.UP,
  w: DIRECTIONS.UP,
  W: DIRECTIONS.UP,
  ArrowDown: DIRECTIONS.DOWN,
  s: DIRECTIONS.DOWN,
  S: DIRECTIONS.DOWN,
  ArrowLeft: DIRECTIONS.LEFT,
  a: DIRECTIONS.LEFT,
  A: DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  d: DIRECTIONS.RIGHT,
  D: DIRECTIONS.RIGHT,
};
