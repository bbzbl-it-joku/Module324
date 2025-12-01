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
      entry.difficulty === difficulty
  );

  const newEntry: LeaderboardEntry = {
    name,
    score,
    difficulty,
    won,
    timestamp: Date.now(),
  };

  if (existingIndex !== -1) {
    // Update only if new score is higher or equal (to always show for first game)
    if (score > entries[existingIndex].score) {
      entries[existingIndex] = newEntry;
      isNewHighscore = true;
    } else if (score === entries[existingIndex].score) {
      // Update timestamp but don't mark as new highscore
      entries[existingIndex] = newEntry;
    }
  } else {
    // Add new entry (first time playing this difficulty)
    entries.push(newEntry);
    // Mark as new highscore if score > 0 (not just opening the game)
    isNewHighscore = score > 0;
  }

  saveLeaderboard(entries);
  return { entries, isNewHighscore };
};
