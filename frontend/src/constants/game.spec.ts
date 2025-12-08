import { describe, expect, it } from 'vitest';
import { DIFFICULTY_CONFIGS, DIRECTIONS, KEY_TO_DIRECTION } from './game';

describe('game constants', () => {
  describe('DIFFICULTY_CONFIGS', () => {
    it('should have correct configurations', () => {
      expect(DIFFICULTY_CONFIGS.easy).toEqual({
        boardSize: 10,
        cellSize: 30,
        speed: 200,
      });
      expect(DIFFICULTY_CONFIGS.medium).toEqual({
        boardSize: 20,
        cellSize: 20,
        speed: 130,
      });
      expect(DIFFICULTY_CONFIGS.hard).toEqual({
        boardSize: 30,
        cellSize: 15,
        speed: 100,
      });
    });

    it('should scale difficulty correctly', () => {
      expect(DIFFICULTY_CONFIGS.easy.boardSize).toBeLessThan(
        DIFFICULTY_CONFIGS.medium.boardSize,
      );
      expect(DIFFICULTY_CONFIGS.medium.boardSize).toBeLessThan(
        DIFFICULTY_CONFIGS.hard.boardSize,
      );
      expect(DIFFICULTY_CONFIGS.easy.speed).toBeGreaterThan(
        DIFFICULTY_CONFIGS.hard.speed,
      );
    });
  });

  describe('DIRECTIONS', () => {
    it('should have all four directions', () => {
      expect(DIRECTIONS.UP).toEqual({ x: 0, y: -1 });
      expect(DIRECTIONS.DOWN).toEqual({ x: 0, y: 1 });
      expect(DIRECTIONS.LEFT).toEqual({ x: -1, y: 0 });
      expect(DIRECTIONS.RIGHT).toEqual({ x: 1, y: 0 });
    });
  });

  describe('KEY_TO_DIRECTION', () => {
    it('should map arrow keys', () => {
      expect(KEY_TO_DIRECTION.ArrowUp).toEqual(DIRECTIONS.UP);
      expect(KEY_TO_DIRECTION.ArrowDown).toEqual(DIRECTIONS.DOWN);
      expect(KEY_TO_DIRECTION.ArrowLeft).toEqual(DIRECTIONS.LEFT);
      expect(KEY_TO_DIRECTION.ArrowRight).toEqual(DIRECTIONS.RIGHT);
    });

    it('should map WASD keys', () => {
      expect(KEY_TO_DIRECTION.w).toEqual(DIRECTIONS.UP);
      expect(KEY_TO_DIRECTION.W).toEqual(DIRECTIONS.UP);
      expect(KEY_TO_DIRECTION.a).toEqual(DIRECTIONS.LEFT);
      expect(KEY_TO_DIRECTION.d).toEqual(DIRECTIONS.RIGHT);
    });
  });
});
