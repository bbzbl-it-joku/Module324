interface GameControlsProps {
  gameStarted: boolean;
  gamePaused: boolean;
  onReset: () => void;
  onTogglePause: () => void;
}

export default function GameControls({
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
        className="min-w-24 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition"
      >
        {!gameStarted ? 'Start' : gamePaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
