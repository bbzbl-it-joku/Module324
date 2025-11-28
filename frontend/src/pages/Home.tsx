import DifficultySwitcher from '../components/DifficultySwitcher';
import Footer from '../components/Footer';
import GameBoard from '../components/GameBoard';
import { useSnakeGame } from '../hooks/useSnakeGame';

export default function Home() {
  const { gameState, setDifficulty, resetGame, togglePause } = useSnakeGame();

  return (
    <div className="page-container flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-6xl space-y-8 px-4">
          <div className="flex gap-8">
            <aside className="hidden w-80 lg:flex lg:flex-col lg:justify-center">
              <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg dark:bg-[#1A1F26]">
                <DifficultySwitcher
                  currentDifficulty={gameState.difficulty}
                  onDifficultyChange={setDifficulty}
                  disabled={gameState.gameStarted}
                />
              </div>
            </aside>

            {/* Game Board (Center/Right) */}
            <div className="flex-1 lg:max-w-2xl">
              <GameBoard
                gameState={gameState}
                resetGame={resetGame}
                togglePause={togglePause}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
