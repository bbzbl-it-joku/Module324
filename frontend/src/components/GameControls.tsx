interface GameControlsProps {
  gameOver: boolean;
  gameWon: boolean;
  gameStarted: boolean;
  gamePaused: boolean;
  onReset: () => void;
  onTogglePause: () => void;
}

export default function GameControls({
  gameOver,
  gameWon,
  gameStarted,
  gamePaused,
  onReset,
  onTogglePause,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={onReset}
        className="min-w-24 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white transition"
      >
        Restart
      </button>
      <button
        onClick={onTogglePause}
        disabled={gameOver || gameWon}
        className="min-w-24 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {!gameStarted ? 'Start' : gamePaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
