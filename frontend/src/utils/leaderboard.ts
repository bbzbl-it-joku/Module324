import type { Difficulty, LeaderboardEntry } from '../types/game';

const LEADERBOARD_KEY = 'snake-game-leaderboard';

export const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
  }
  return [];
};

export const saveLeaderboard = (entries: LeaderboardEntry[]): void => {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save leaderboard:', error);
  }
};

export const addOrUpdateScore = (
  name: string,
  score: number,
  difficulty: Difficulty,
  won: boolean,
): { entries: LeaderboardEntry[]; isNewHighscore: boolean } => {
  const entries = loadLeaderboard();
  let isNewHighscore = false;

  // Find existing entry for this player and difficulty
  const existingIndex = entries.findIndex(
    (entry) =>
      entry.name.toLowerCase() === name.toLowerCase() &&
      entry.difficulty === difficulty,
  );

  const newEntry: LeaderboardEntry = {
    name,
    score,
    difficulty,
    won,
    timestamp: Date.now(),
  };

  if (existingIndex !== -1) {
    // Update only if new score is HIGHER (not equal!)
    if (score > entries[existingIndex].score) {
      entries[existingIndex] = newEntry;
      isNewHighscore = true;
    } else {
      // Update timestamp and won status if score is same or lower, but don't mark as highscore
      entries[existingIndex] = {
        ...newEntry,
        score: entries[existingIndex].score,
      };
    }
  } else {
    // Add new entry (first time playing this difficulty)
    entries.push(newEntry);
    isNewHighscore = true;
  }

  saveLeaderboard(entries);
  return { entries, isNewHighscore };
};
