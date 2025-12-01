import type { Difficulty, LeaderboardEntry } from '../types/game';

const MEDALS = ['🥇', '🥈', '🥉'] as const;

interface LeaderboardProps {
  difficulty: Difficulty;
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ difficulty, entries }: LeaderboardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  // Filter and sort entries by difficulty, then take top 5
  const filteredEntries = entries
    .filter((entry) => entry.difficulty === difficulty)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        Daily Top Scores
      </h3>
      <div className="space-y-2">
        <div
          className="grid gap-2 border-b border-gray-200 pb-2 dark:border-gray-700"
          style={{ gridTemplateColumns: '2rem 1fr 3rem 3rem' }}
        >
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Rank
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Name
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Score
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Time
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No scores yet. Be the first!
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <div
              key={`${entry.name}-${entry.timestamp}`}
              className="grid gap-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
              style={{ gridTemplateColumns: '2rem 1fr 3rem 3rem' }}
            >
              <div
                className={`flex items-center justify-center font-semibold ${
                  index < 3
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {MEDALS[index] ?? index + 1}
              </div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {entry.name}
                {entry.won && (
                  <span className="ml-1 text-xs text-emerald-500">👑</span>
                )}
              </div>
              <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {entry.score}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(entry.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
