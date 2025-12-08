import type { Difficulty, LeaderboardEntry } from '../types/game';
import { leaderboardApi, type LeaderboardApiEntry } from './api';

// Convert API response to frontend format
const apiToLocal = (apiEntry: LeaderboardApiEntry): LeaderboardEntry => ({
  name: apiEntry.userName,
  score: apiEntry.score,
  difficulty: apiEntry.difficulty as Difficulty,
  won: false, // Backend doesn't store won status yet
  timestamp: apiEntry.createdAt
    ? new Date(apiEntry.createdAt).getTime()
    : Date.now(),
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

const MIN_SCORE_FOR_LEADERBOARD = 3;

export const addOrUpdateScore = async (
  name: string,
  score: number,
  difficulty: Difficulty,
  currentLeaderboard?: LeaderboardEntry[],
): Promise<{
  entries: LeaderboardEntry[];
  isNewHighscore: boolean;
  previousHighscore: number | null;
  scoreTooLow: boolean;
}> => {
  try {
    // Use current leaderboard if provided, otherwise load from API
    const allEntries = currentLeaderboard
      ? currentLeaderboard.map((entry) => ({
          id: entry.id,
          userName: entry.name,
          score: entry.score,
          difficulty: entry.difficulty,
          createdAt: new Date(entry.timestamp).toISOString(),
        }))
      : await leaderboardApi.getAll();

    // Find existing entry for this player and difficulty
    const existingEntry = allEntries.find(
      (entry) =>
        entry.userName.toLowerCase() === name.toLowerCase() &&
        entry.difficulty === difficulty,
    );

    const previousHighscore = existingEntry?.score ?? null;
    let isNewHighscore = false;
    let scoreTooLow = false;

    // Check if score meets minimum requirement
    if (score < MIN_SCORE_FOR_LEADERBOARD) {
      scoreTooLow = true;
      const entries = await loadLeaderboard();
      return { entries, isNewHighscore: false, previousHighscore, scoreTooLow };
    }

    if (existingEntry && existingEntry.id) {
      // Update only if new score is HIGHER
      if (score > existingEntry.score) {
        await leaderboardApi.update(
          existingEntry.id,
          localToApi(name, score, difficulty),
        );
        isNewHighscore = true;
      }
      // If score is same or lower, don't update
    } else {
      // Create new entry (first time playing this difficulty)
      // This IS a highscore because it's the player's first score for this difficulty!
      await leaderboardApi.create(localToApi(name, score, difficulty));
      isNewHighscore = true;
    }

    // If we updated or created an entry, reload from API to get fresh data
    // Otherwise, use the cached data we already have
    const entries = isNewHighscore
      ? await loadLeaderboard()
      : currentLeaderboard || allEntries.map(apiToLocal);

    return { entries, isNewHighscore, previousHighscore, scoreTooLow };
  } catch (error) {
    console.error('Failed to add/update score:', error);
    return {
      entries: [],
      isNewHighscore: false,
      previousHighscore: null,
      scoreTooLow: false,
    };
  }
};
