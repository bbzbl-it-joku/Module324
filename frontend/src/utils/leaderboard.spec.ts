import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LeaderboardEntry } from '../types/game';
import { leaderboardApi } from './api';
import { addOrUpdateScore, loadLeaderboard } from './leaderboard';

vi.mock('./api');

describe('leaderboard utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadLeaderboard', () => {
    it('should load and convert leaderboard entries from API', async () => {
      const mockApiData = [
        {
          id: 1,
          userName: 'Player1',
          score: 100,
          difficulty: 'easy',
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          userName: 'Player2',
          score: 200,
          difficulty: 'medium',
          createdAt: '2024-01-02T00:00:00Z',
        },
      ];

      vi.mocked(leaderboardApi.getAll).mockResolvedValue(mockApiData);

      const result = await loadLeaderboard();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: 'Player1',
        score: 100,
        difficulty: 'easy',
        won: false,
        timestamp: new Date('2024-01-01T00:00:00Z').getTime(),
        id: 1,
      });
      expect(result[1]).toEqual({
        name: 'Player2',
        score: 200,
        difficulty: 'medium',
        won: false,
        timestamp: new Date('2024-01-02T00:00:00Z').getTime(),
        id: 2,
      });
    });

    it('should return empty array on API error', async () => {
      vi.mocked(leaderboardApi.getAll).mockRejectedValue(
        new Error('API Error'),
      );

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await loadLeaderboard();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load leaderboard from backend:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('should handle entries without createdAt', async () => {
      const mockApiData = [
        {
          id: 1,
          userName: 'Player1',
          score: 100,
          difficulty: 'easy',
        },
      ];

      vi.mocked(leaderboardApi.getAll).mockResolvedValue(mockApiData);

      const result = await loadLeaderboard();

      expect(result).toHaveLength(1);
      expect(result[0].timestamp).toBeGreaterThan(0);
      expect(result[0].name).toBe('Player1');
    });
  });

  describe('addOrUpdateScore', () => {
    it('should reject scores below minimum (3)', async () => {
      vi.mocked(leaderboardApi.getAll).mockResolvedValue([]);

      const result = await addOrUpdateScore('Player1', 2, 'easy');

      expect(result.scoreTooLow).toBe(true);
      expect(result.isNewHighscore).toBe(false);
      expect(result.previousHighscore).toBe(null);
    });

    it('should create new entry for first-time player', async () => {
      vi.mocked(leaderboardApi.getAll).mockResolvedValue([]);
      vi.mocked(leaderboardApi.create).mockResolvedValue({
        id: 1,
        userName: 'NewPlayer',
        score: 50,
        difficulty: 'medium',
      });

      const result = await addOrUpdateScore('NewPlayer', 50, 'medium');

      expect(leaderboardApi.create).toHaveBeenCalledWith({
        userName: 'NewPlayer',
        score: 50,
        difficulty: 'medium',
      });
      expect(result.isNewHighscore).toBe(true);
      expect(result.previousHighscore).toBe(null);
    });

    it('should update entry when new score is higher', async () => {
      const existingEntry = {
        id: 1,
        userName: 'Player1',
        score: 50,
        difficulty: 'hard',
      };

      vi.mocked(leaderboardApi.getAll).mockResolvedValue([existingEntry]);
      vi.mocked(leaderboardApi.update).mockResolvedValue({
        ...existingEntry,
        score: 100,
      });

      const result = await addOrUpdateScore('Player1', 100, 'hard');

      expect(leaderboardApi.update).toHaveBeenCalledWith(1, {
        userName: 'Player1',
        score: 100,
        difficulty: 'hard',
      });
      expect(result.isNewHighscore).toBe(true);
      expect(result.previousHighscore).toBe(50);
    });

    it('should not update when new score is lower', async () => {
      const existingEntry = {
        id: 1,
        userName: 'Player1',
        score: 100,
        difficulty: 'easy',
      };

      vi.mocked(leaderboardApi.getAll).mockResolvedValue([existingEntry]);

      const result = await addOrUpdateScore('Player1', 50, 'easy');

      expect(leaderboardApi.update).not.toHaveBeenCalled();
      expect(leaderboardApi.create).not.toHaveBeenCalled();
      expect(result.isNewHighscore).toBe(false);
      expect(result.previousHighscore).toBe(100);
    });

    it('should not update when new score is equal', async () => {
      const existingEntry = {
        id: 1,
        userName: 'Player1',
        score: 75,
        difficulty: 'medium',
      };

      vi.mocked(leaderboardApi.getAll).mockResolvedValue([existingEntry]);

      const result = await addOrUpdateScore('Player1', 75, 'medium');

      expect(leaderboardApi.update).not.toHaveBeenCalled();
      expect(result.isNewHighscore).toBe(false);
      expect(result.previousHighscore).toBe(75);
    });

    it('should handle case-insensitive player name matching', async () => {
      const existingEntry = {
        id: 1,
        userName: 'PLAYER1',
        score: 50,
        difficulty: 'easy',
      };

      vi.mocked(leaderboardApi.getAll).mockResolvedValue([existingEntry]);
      vi.mocked(leaderboardApi.update).mockResolvedValue({
        ...existingEntry,
        score: 100,
      });

      const result = await addOrUpdateScore('player1', 100, 'easy');

      expect(leaderboardApi.update).toHaveBeenCalled();
      expect(result.previousHighscore).toBe(50);
    });

    it('should use provided currentLeaderboard to avoid API call', async () => {
      const currentLeaderboard: LeaderboardEntry[] = [
        {
          id: 1,
          name: 'Player1',
          score: 50,
          difficulty: 'hard',
          won: false,
          timestamp: Date.now(),
        },
      ];

      const updatedEntry = {
        id: 1,
        userName: 'Player1',
        score: 100,
        difficulty: 'hard',
        createdAt: new Date().toISOString(),
      };

      vi.mocked(leaderboardApi.update).mockResolvedValue(updatedEntry);
      vi.mocked(leaderboardApi.getAll).mockResolvedValue([updatedEntry]);

      const result = await addOrUpdateScore(
        'Player1',
        100,
        'hard',
        currentLeaderboard,
      );

      // getAll is called once to reload after update
      expect(leaderboardApi.getAll).toHaveBeenCalledTimes(1);
      expect(result.isNewHighscore).toBe(true);
    });

    it('should return cached data when score is not updated', async () => {
      const currentLeaderboard: LeaderboardEntry[] = [
        {
          id: 1,
          name: 'Player1',
          score: 100,
          difficulty: 'medium',
          won: false,
          timestamp: Date.now(),
        },
      ];

      const result = await addOrUpdateScore(
        'Player1',
        50,
        'medium',
        currentLeaderboard,
      );

      expect(leaderboardApi.update).not.toHaveBeenCalled();
      expect(result.entries).toEqual(currentLeaderboard);
      expect(result.isNewHighscore).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      vi.mocked(leaderboardApi.getAll).mockRejectedValue(
        new Error('API Error'),
      );

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await addOrUpdateScore('Player1', 100, 'easy');

      expect(result.entries).toEqual([]);
      expect(result.isNewHighscore).toBe(false);
      expect(result.previousHighscore).toBe(null);
      expect(result.scoreTooLow).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should create entry for different difficulty even if player exists', async () => {
      const existingEntry = {
        id: 1,
        userName: 'Player1',
        score: 100,
        difficulty: 'easy',
      };

      vi.mocked(leaderboardApi.getAll).mockResolvedValue([existingEntry]);
      vi.mocked(leaderboardApi.create).mockResolvedValue({
        id: 2,
        userName: 'Player1',
        score: 50,
        difficulty: 'hard',
      });

      const result = await addOrUpdateScore('Player1', 50, 'hard');

      expect(leaderboardApi.create).toHaveBeenCalledWith({
        userName: 'Player1',
        score: 50,
        difficulty: 'hard',
      });
      expect(result.isNewHighscore).toBe(true);
      expect(result.previousHighscore).toBe(null);
    });

    it('should reload leaderboard after successful update', async () => {
      const existingEntry = {
        id: 1,
        userName: 'Player1',
        score: 50,
        difficulty: 'easy',
      };

      const updatedData = [
        {
          id: 1,
          userName: 'Player1',
          score: 100,
          difficulty: 'easy',
          createdAt: '2024-01-01T00:00:00Z',
        },
      ];

      vi.mocked(leaderboardApi.getAll)
        .mockResolvedValueOnce([existingEntry])
        .mockResolvedValueOnce(updatedData);
      vi.mocked(leaderboardApi.update).mockResolvedValue(updatedData[0]);

      const result = await addOrUpdateScore('Player1', 100, 'easy');

      expect(leaderboardApi.getAll).toHaveBeenCalledTimes(2);
      expect(result.isNewHighscore).toBe(true);
      expect(result.entries).toHaveLength(1);
      expect(result.entries[0].score).toBe(100);
    });
  });
});
