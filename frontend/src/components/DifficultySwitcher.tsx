import type { Difficulty } from '../types/game';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

interface DifficultySwitcherProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

export default function DifficultySwitcher({
  currentDifficulty,
  onDifficultyChange,
  disabled = false,
}: DifficultySwitcherProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        Difficulty:
      </p>
      <div className="flex gap-1">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => onDifficultyChange(difficulty)}
            disabled={disabled}
            className={`rounded px-3 py-1 text-xs font-semibold capitalize transition ${
              currentDifficulty === difficulty
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:bg-gray-700 dark:disabled:text-gray-500'
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>
    </div>
  );
}
