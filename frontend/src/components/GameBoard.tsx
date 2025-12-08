import { useRef } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useGameRenderer } from '../hooks/useGameRenderer';
import { useScoreAnimation } from '../hooks/useScoreAnimation';
import type { GameState } from '../types/game';
import GameControls from './GameControls';
import GameStatus from './GameStatus';

interface GameBoardProps {
  gameState: GameState;
  resetGame: () => void;
  togglePause: () => void;
}

export default function GameBoard({
  gameState,
  resetGame,
  togglePause,
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkMode = useDarkMode();
  const { isGolden } = useScoreAnimation(gameState.score);

  useGameRenderer(canvasRef, gameState, { isDarkMode });

  const canvasWidth = gameState.boardSize * gameState.cellSize;
  const canvasHeight = gameState.boardSize * gameState.cellSize;

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-[#1A1F26]">
        {/* Score Display */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Snake Game
          </h2>
          <p
            className={`text-3xl font-bold transition-all duration-500 ${
              isGolden
                ? 'scale-105 text-amber-400'
                : 'scale-100 text-emerald-500'
            }`}
          >
            Score: {gameState.score}
          </p>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border-4 border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-[#0C1116]"
        />

        {/* Game Status */}
        <div className="h-7 text-center">
          <GameStatus
            gameStarted={gameState.gameStarted}
            gameOver={gameState.gameOver}
            gamePaused={gameState.gamePaused}
            gameWon={gameState.gameWon}
          />
        </div>

        {/* Controls */}
        <GameControls
          gameOver={gameState.gameOver}
          gameWon={gameState.gameWon}
          gameStarted={gameState.gameStarted}
          gamePaused={gameState.gamePaused}
          onReset={resetGame}
          onTogglePause={togglePause}
        />

        {/* Instructions */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <b>Controls:</b> Use Arrow Keys or WASD to move and press Space to
          start, pause, or resume
        </p>
      </div>
    </>
  );
}
