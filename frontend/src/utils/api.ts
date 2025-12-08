import type { Difficulty } from '../types/game';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface LeaderboardApiEntry {
  id?: number;
  userName: string;
  score: number;
  difficulty: string;
  createdAt?: string;
  updatedAt?: string;
}

export const leaderboardApi = {
  async getAll(): Promise<LeaderboardApiEntry[]> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  },

  async getTop10(difficulty: Difficulty): Promise<LeaderboardApiEntry[]> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/top10/${difficulty}`);
    if (!response.ok) throw new Error('Failed to fetch top 10');
    return response.json();
  },

  async getById(id: number): Promise<LeaderboardApiEntry> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/${id}`);
    if (!response.ok) throw new Error('Failed to fetch entry');
    return response.json();
  },

  async create(entry: Omit<LeaderboardApiEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeaderboardApiEntry> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error('Failed to create entry');
    return response.json();
  },

  async update(id: number, entry: Omit<LeaderboardApiEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeaderboardApiEntry> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error('Failed to update entry');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete entry');
  },
};
