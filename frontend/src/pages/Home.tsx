import Footer from '../components/Footer';
import GameBoard from '../components/GameBoard';
import { useSnakeGame } from '../hooks/useSnakeGame';

export default function Home() {
  const { gameState, resetGame, togglePause } = useSnakeGame();

  return (
    <div className="page-container flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-8 px-4">
          <GameBoard
            gameState={gameState}
            resetGame={resetGame}
            togglePause={togglePause}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
