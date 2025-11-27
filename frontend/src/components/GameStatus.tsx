interface GameStatusProps {
  gameStarted: boolean;
  gamePaused: boolean;
}

export default function GameStatus({
  gameStarted,
  gamePaused,
}: GameStatusProps) {
  if (!gameStarted) {
    return (
      <p className="text-xl font-bold text-blue-500">
        Press Space or Start to begin
      </p>
    );
  }

  if (gamePaused && gameStarted) {
    return <p className="text-xl font-bold text-blue-500">Paused</p>;
  }

  return null;
}
