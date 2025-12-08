import type { Difficulty, LeaderboardEntry } from '../types/game';

const MEDALS = ['🥇', '🥈', '🥉'] as const;

interface LeaderboardProps {
  difficulty: Difficulty;
  entries: LeaderboardEntry[];
  currentPlayerName?: string | null;
}

export default function Leaderboard({
  difficulty,
  entries,
  currentPlayerName,
}: LeaderboardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  // Filter and sort entries by difficulty
  const sortedEntries = entries
    .filter((entry) => entry.difficulty === difficulty)
    .sort((a, b) => b.score - a.score);

  // Find current player's entry and rank
  const playerEntry = currentPlayerName
    ? sortedEntries.find(
        (entry) =>
          entry.userName.toLowerCase() === currentPlayerName.toLowerCase(),
      )
    : null;

  const playerRank = playerEntry
    ? sortedEntries.findIndex(
        (entry) =>
          entry.userName.toLowerCase() === currentPlayerName?.toLowerCase(),
      ) + 1
    : null;

  // Check if player is in top 5
  const playerInTop5 = playerRank !== null && playerRank <= 5;

  // If player is outside top 5, insert their entry after 5th place
  let displayEntries = sortedEntries.slice(0, 5);
  if (!playerInTop5 && playerEntry && playerRank) {
    displayEntries = [...displayEntries.slice(0, 5), playerEntry];
  }

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
            Date
          </div>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No scores yet. Be the first!
          </div>
        ) : (
          <>
            {displayEntries.map((entry, index) => {
              const isCurrentPlayer =
                currentPlayerName &&
                entry.userName.toLowerCase() ===
                  currentPlayerName.toLowerCase();
              const actualRank = index < 5 ? index + 1 : playerRank;

              return (
                <div key={`${entry.userName}-${entry.timestamp}`}>
                  <div
                    className="grid gap-2 rounded py-1 hover:bg-gray-50 dark:hover:bg-gray-800"
                    style={{ gridTemplateColumns: '2rem 1fr 3rem 3rem' }}
                  >
                    <div
                      className={`flex items-center justify-center font-semibold ${
                        index < 3
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {index < 3 ? MEDALS[index] : actualRank}
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {entry.userName}
                      {isCurrentPlayer && (
                        <span className="ml-1 text-xs text-blue-600 dark:text-blue-400">
                          (You)
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {entry.score}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
