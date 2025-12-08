interface WinDialogProps {
  score: number;
  won: boolean;
  isNewHighscore: boolean;
  previousHighscore: number | null;
  scoreTooLow: boolean;
  onPlayAgain: () => void;
}

export default function WinDialog({
  score,
  won,
  isNewHighscore,
  previousHighscore,
  scoreTooLow,
  onPlayAgain,
}: WinDialogProps) {
  const getMessage = () => {
    if (won) return 'Congratulations!';
    if (isNewHighscore) return 'New Highscore!';
    return 'Game Over!';
  };

  const getSubtext = () => {
    if (won) return 'You won the game!';
    if (isNewHighscore) return 'You beat your personal best!';
    if (scoreTooLow) return 'Score too low to save (minimum: 3 points)';
    return 'Better luck next time!';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-1/3 rounded-lg bg-white p-8 text-center shadow-2xl dark:bg-[#1A1F26]">
        {/* <div className="mb-4 text-5xl">{getEmoji()}</div> */}
        <h2
          className={`mb-2 text-3xl font-bold ${
            isNewHighscore && !won
              ? 'text-amber-500 dark:text-amber-400'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {getMessage()}
        </h2>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          {getSubtext()}
        </p>
        <p className="mb-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          Final Score: {score}
        </p>
        {previousHighscore !== null && (
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Previous Best: {previousHighscore}
          </p>
        )}
        {previousHighscore === null && !scoreTooLow && (
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            First score for this difficulty!
          </p>
        )}

        <button
          onClick={onPlayAgain}
          className="rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600 active:bg-emerald-700"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
