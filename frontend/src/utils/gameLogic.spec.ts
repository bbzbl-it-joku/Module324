import { describe, expect, it, vi } from 'vitest';
import { DIRECTIONS } from '../constants/game';
import type { Position } from '../types/game';
import {
  generateNewFruit,
  generateRandomPosition,
  getInitialGameState,
  isOppositeDirection,
  isPositionEqual,
} from './gameLogic';

describe('gameLogic utils', () => {
  describe('isPositionEqual', () => {
    it('should return true when positions are equal', () => {
      expect(isPositionEqual({ x: 5, y: 10 }, { x: 5, y: 10 })).toBe(true);
    });

    it('should return false when positions differ', () => {
      expect(isPositionEqual({ x: 5, y: 10 }, { x: 6, y: 10 })).toBe(false);
      expect(isPositionEqual({ x: 5, y: 10 }, { x: 5, y: 11 })).toBe(false);
    });
  });

  describe('isOppositeDirection', () => {
    it('should return true for opposite directions', () => {
      expect(isOppositeDirection(DIRECTIONS.UP, DIRECTIONS.DOWN)).toBe(true);
      expect(isOppositeDirection(DIRECTIONS.LEFT, DIRECTIONS.RIGHT)).toBe(true);
    });

    it('should return false for non-opposite directions', () => {
      expect(isOppositeDirection(DIRECTIONS.UP, DIRECTIONS.UP)).toBe(false);
      expect(isOppositeDirection(DIRECTIONS.UP, DIRECTIONS.LEFT)).toBe(false);
    });
  });

  describe('generateRandomPosition', () => {
    it('should generate a position within bounds and not on snake', () => {
      const boardSize = 10;
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
      ];
      const position = generateRandomPosition(boardSize, snake);

      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(boardSize);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThan(boardSize);
      expect(snake.some((s) => s.x === position.x && s.y === position.y)).toBe(
        false,
      );
    });
  });

  describe('generateNewFruit', () => {
    it('should return fruit with position and isGolden flag', () => {
      const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const result = generateNewFruit(10, []);

      expect(result).toHaveProperty('fruit');
      expect(result).toHaveProperty('isGolden');
      expect(result.isGolden).toBe(false);
      mathRandomSpy.mockRestore();
    });

    it('should generate golden fruits', () => {
      const mathRandomSpy = vi.spyOn(Math, 'random');
      mathRandomSpy.mockReturnValueOnce(0.04).mockReturnValue(0.5);

      expect(generateNewFruit(10, []).isGolden).toBe(true);
      mathRandomSpy.mockRestore();
    });
  });

  describe('getInitialGameState', () => {
    it('should create correct initial state', () => {
      const state = getInitialGameState('easy');

      expect(state).toMatchObject({
        difficulty: 'easy',
        boardSize: 10,
        cellSize: 30,
        speed: 200,
        score: 1,
        gameOver: false,
        gameWon: false,
        gamePaused: true,
        gameStarted: false,
        direction: DIRECTIONS.RIGHT,
      });
      expect(state.snake).toHaveLength(1);
      expect(state.snake[0]).toEqual({ x: 5, y: 5 });
    });

    it('should create states for all difficulties', () => {
      expect(getInitialGameState('medium').boardSize).toBe(20);
      expect(getInitialGameState('hard').boardSize).toBe(30);
    });
  });
});
