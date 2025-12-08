import { useState, useEffect } from 'react';
import DifficultySwitcher from '../components/DifficultySwitcher';
import Footer from '../components/Footer';
import GameBoard from '../components/GameBoard';
import Leaderboard from '../components/Leaderboard';
import PlayerNameDialog from '../components/PlayerNameDialog';
import WinDialog from '../components/WinDialog';
import { useSnakeGame } from '../hooks/useSnakeGame';

export default function Home() {
  const { gameState, leaderboard, setDifficulty, resetGame, togglePause, saveScore } =
    useSnakeGame();
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [isNewHighscore, setIsNewHighscore] = useState(false);
  const [lastGameEndState, setLastGameEndState] = useState({ gameOver: false, gameWon: false });

  useEffect(() => {
    // Check if player name exists in localStorage
    const savedName = localStorage.getItem('snake-game-player-name');
    if (savedName) {
      setPlayerName(savedName);
    } else {
      setShowNameDialog(true);
    }
  }, []);

  const handleSaveName = (name: string) => {
    localStorage.setItem('snake-game-player-name', name);
    setPlayerName(name);
    setShowNameDialog(false);
  };

  const handlePlayAgain = () => {
    resetGame();
    setIsNewHighscore(false);
    setLastGameEndState({ gameOver: false, gameWon: false });
  };

  const showDialog = gameState.gameOver || gameState.gameWon;

  // Save score when game ends (only once per game!)
  useEffect(() => {
    const currentGameEndState = { gameOver: gameState.gameOver, gameWon: gameState.gameWon };
    
    // Only save if game just ended (state changed from not-ended to ended)
    const gameJustEnded = 
      (currentGameEndState.gameOver || currentGameEndState.gameWon) &&
      (!lastGameEndState.gameOver && !lastGameEndState.gameWon);
    
    if (gameJustEnded && playerName) {
      const highscore = saveScore(playerName);
      setIsNewHighscore(highscore);
      setLastGameEndState(currentGameEndState);
    }
  }, [gameState.gameOver, gameState.gameWon, playerName, saveScore, lastGameEndState]);

  return (
    <div className="page-container flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-6xl space-y-8 px-4">
          <div className="flex gap-8">
            <aside className="hidden w-80 lg:flex lg:flex-col lg:justify-center">
              <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg dark:bg-[#1A1F26]">
                <Leaderboard
                  difficulty={gameState.difficulty}
                  entries={leaderboard}
                />
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

      {showNameDialog && <PlayerNameDialog onSaveName={handleSaveName} />}

      {showDialog && playerName && (
        <WinDialog
          score={gameState.score}
          won={gameState.gameWon}
          isNewHighscore={isNewHighscore}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
