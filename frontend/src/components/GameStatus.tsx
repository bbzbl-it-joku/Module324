interface GameStatusProps {
  gameStarted: boolean;
  gameOver: boolean;
  gamePaused: boolean;
  gameWon: boolean;
}

export default function GameStatus({
  gameStarted,
  gameOver,
  gamePaused,
  gameWon,
}: GameStatusProps) {
  if (!gameStarted && !gameOver) {
    return (
      <p className="text-xl font-bold text-blue-500">
        Press Space or Start to begin
      </p>
    );
  }

  if (gameOver) {
    return (
      <p className="text-xl font-bold text-red-500 dark:text-red-400">
        Game Over!
      </p>
    );
  }

  if (gamePaused && gameStarted && !gameWon) {
    return <p className="text-xl font-bold text-blue-500">Paused</p>;
  }

  return null;
}
