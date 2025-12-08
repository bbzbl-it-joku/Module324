import type { Difficulty, LeaderboardEntry } from '../types/game';
import { leaderboardApi, type LeaderboardApiEntry } from './api';

// Convert API response to frontend format
const apiToLocal = (apiEntry: LeaderboardApiEntry): LeaderboardEntry => ({
  name: apiEntry.userName,
  score: apiEntry.score,
  difficulty: apiEntry.difficulty as Difficulty,
  won: false, // Backend doesn't store won status yet
  timestamp: apiEntry.createdAt ? new Date(apiEntry.createdAt).getTime() : Date.now(),
  id: apiEntry.id,
});

// Convert frontend format to API request
const localToApi = (
  name: string,
  score: number,
  difficulty: Difficulty,
): Omit<LeaderboardApiEntry, 'id' | 'createdAt' | 'updatedAt'> => ({
  userName: name,
  score,
  difficulty,
});

export const loadLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const apiEntries = await leaderboardApi.getAll();
    return apiEntries.map(apiToLocal);
  } catch (error) {
    console.error('Failed to load leaderboard from backend:', error);
    return [];
  }
};

export const addOrUpdateScore = async (
  name: string,
  score: number,
  difficulty: Difficulty,
  won: boolean,
): Promise<{ entries: LeaderboardEntry[]; isNewHighscore: boolean }> => {
  try {
    // Load all entries to find existing one
    const allEntries = await leaderboardApi.getAll();
    
    // Find existing entry for this player and difficulty
    const existingEntry = allEntries.find(
      (entry) =>
        entry.userName.toLowerCase() === name.toLowerCase() &&
        entry.difficulty === difficulty,
    );

    let isNewHighscore = false;

    if (existingEntry && existingEntry.id) {
      // Update only if new score is HIGHER
      if (score > existingEntry.score) {
        await leaderboardApi.update(existingEntry.id, localToApi(name, score, difficulty));
        isNewHighscore = true;
      }
      // If score is same or lower, don't update
    } else {
      // Create new entry (first time playing this difficulty)
      await leaderboardApi.create(localToApi(name, score, difficulty));
      isNewHighscore = true;
    }

    // Reload leaderboard to get updated data
    const entries = await loadLeaderboard();
    return { entries, isNewHighscore };
  } catch (error) {
    console.error('Failed to add/update score:', error);
    return { entries: [], isNewHighscore: false };
  }
};
