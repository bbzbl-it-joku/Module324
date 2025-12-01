import type { Difficulty } from '../types/game';

interface LeaderboardEntry {
  rank: number;
  firstName: string;
  score: number;
  time: string;
}

const LEADERBOARD_DATA: Record<Difficulty, LeaderboardEntry[]> = {
  easy: [
    { rank: 1, firstName: 'Alex', score: 150, time: '14:32' },
    { rank: 2, firstName: 'Jordan', score: 128, time: '12:45' },
    { rank: 3, firstName: 'Casey', score: 115, time: '11:20' },
    { rank: 4, firstName: 'Taylor', score: 98, time: '09:50' },
    { rank: 5, firstName: 'Morgan', score: 87, time: '08:15' },
  ],
  medium: [
    { rank: 1, firstName: 'Sam', score: 245, time: '18:33' },
    { rank: 2, firstName: 'Riley', score: 198, time: '16:12' },
    { rank: 3, firstName: 'Jamie', score: 176, time: '14:48' },
    { rank: 4, firstName: 'Pat', score: 154, time: '13:22' },
    { rank: 5, firstName: 'Drew', score: 132, time: '11:50' },
  ],
  hard: [
    { rank: 1, firstName: 'Chris', score: 342, time: '22:15' },
    { rank: 2, firstName: 'Dana', score: 298, time: '20:44' },
    { rank: 3, firstName: 'Blake', score: 267, time: '18:30' },
    { rank: 4, firstName: 'Quinn', score: 234, time: '16:18' },
    { rank: 5, firstName: 'Sydney', score: 201, time: '14:52' },
  ],
};

const MEDALS = ['🥇', '🥈', '🥉'] as const;

interface LeaderboardProps {
  difficulty: Difficulty;
}

export default function Leaderboard({ difficulty }: LeaderboardProps) {
  const entries = LEADERBOARD_DATA[difficulty];

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

        {entries.map((entry, index) => (
          <div
            key={index}
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
              {MEDALS[index] ?? entry.rank}
            </div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {entry.firstName}
            </div>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {entry.score}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {entry.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
