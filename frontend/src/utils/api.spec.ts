import { beforeEach, describe, expect, it, vi } from 'vitest';
import { leaderboardApi } from './api';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('leaderboardApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all leaderboard entries', async () => {
      const mockData = [
        { id: 1, userName: 'Player1', score: 100, difficulty: 'easy' },
        { id: 2, userName: 'Player2', score: 200, difficulty: 'medium' },
      ];

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await leaderboardApi.getAll();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard',
      );
      expect(result).toEqual(mockData);
    });

    it('should throw error when fetch fails', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.getAll()).rejects.toThrow(
        'Failed to fetch leaderboard',
      );
    });
  });

  describe('getTop10', () => {
    it('should fetch top 10 entries for a difficulty', async () => {
      const mockData = [
        { id: 1, userName: 'Player1', score: 100, difficulty: 'hard' },
      ];

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await leaderboardApi.getTop10('hard');

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard/top10/hard',
      );
      expect(result).toEqual(mockData);
    });

    it('should throw error when fetch fails', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.getTop10('easy')).rejects.toThrow(
        'Failed to fetch top 10',
      );
    });
  });

  describe('getById', () => {
    it('should fetch a single entry by id', async () => {
      const mockData = {
        id: 1,
        userName: 'Player1',
        score: 100,
        difficulty: 'medium',
      };

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await leaderboardApi.getById(1);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard/1',
      );
      expect(result).toEqual(mockData);
    });

    it('should throw error when fetch fails', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.getById(1)).rejects.toThrow(
        'Failed to fetch entry',
      );
    });
  });

  describe('create', () => {
    it('should create a new leaderboard entry', async () => {
      const newEntry = { userName: 'Player1', score: 100, difficulty: 'easy' };
      const mockResponse = { ...newEntry, id: 1, createdAt: '2024-01-01' };

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await leaderboardApi.create(newEntry);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEntry),
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when creation fails', async () => {
      const newEntry = { userName: 'Player1', score: 100, difficulty: 'easy' };

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.create(newEntry)).rejects.toThrow(
        'Failed to create entry',
      );
    });
  });

  describe('update', () => {
    it('should update an existing leaderboard entry', async () => {
      const updateData = {
        userName: 'Player1',
        score: 150,
        difficulty: 'medium',
      };
      const mockResponse = { ...updateData, id: 1, updatedAt: '2024-01-02' };

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await leaderboardApi.update(1, updateData);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard/1',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when update fails', async () => {
      const updateData = {
        userName: 'Player1',
        score: 150,
        difficulty: 'medium',
      };

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.update(1, updateData)).rejects.toThrow(
        'Failed to update entry',
      );
    });
  });

  describe('delete', () => {
    it('should delete a leaderboard entry', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      } as Response);

      await leaderboardApi.delete(1);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/leaderboard/1',
        {
          method: 'DELETE',
        },
      );
    });

    it('should throw error when deletion fails', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(leaderboardApi.delete(1)).rejects.toThrow(
        'Failed to delete entry',
      );
    });
  });
});
