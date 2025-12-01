import { useCallback, useEffect, useRef, useState } from 'react';
import { KEY_TO_DIRECTION } from '../constants/game';
import type { Difficulty, GameState, LeaderboardEntry, Position } from '../types/game';
import {
  generateNewFruit,
  getInitialGameState,
  isOppositeDirection,
  isPositionEqual,
} from '../utils/gameLogic';
import { addOrUpdateScore, loadLeaderboard } from '../utils/leaderboard';

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(() =>
    getInitialGameState('medium'),
  );
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    loadLeaderboard(),
  );

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMoveDirectionRef = useRef<Position>(gameState.direction);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (KEY_TO_DIRECTION[e.key]) {
      e.preventDefault();
    }

    if (e.code === 'Space') {
      e.preventDefault();
      setGameState((prevState) => {
        if (prevState.gameOver || prevState.gameWon) {
          return getInitialGameState(prevState.difficulty);
        }

        if (!prevState.gameStarted) {
          return { ...prevState, gameStarted: true, gamePaused: false };
        }

        return { ...prevState, gamePaused: !prevState.gamePaused };
      });
      return;
    }

    const newDirection = KEY_TO_DIRECTION[e.key];
    if (!newDirection) return;

    setGameState((prevState) => {
      if (prevState.gameOver || prevState.gamePaused || !prevState.gameStarted)
        return prevState;

      // Use the last actual move direction instead of the current direction
      // to prevent multiple direction changes between game loop ticks
      if (isOppositeDirection(lastMoveDirectionRef.current, newDirection)) {
        return prevState;
      }

      return { ...prevState, direction: newDirection };
    });
  }, []);

  // Game loop
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const isInactive =
      gameState.gameOver ||
      gameState.gamePaused ||
      gameState.gameWon ||
      !gameState.gameStarted;

    if (isInactive) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setGameState((prevState) => {
        const newSnake = [...prevState.snake];
        const head = newSnake[0];

        // Store the direction we're actually moving in
        lastMoveDirectionRef.current = prevState.direction;

        const newHead: Position = {
          x: head.x + prevState.direction.x,
          y: head.y + prevState.direction.y,
        };

        // Check wall collision (no wrap-around)
        if (
          newHead.x < 0 ||
          newHead.x >= prevState.boardSize ||
          newHead.y < 0 ||
          newHead.y >= prevState.boardSize
        ) {
          return {
            ...prevState,
            gameOver: true,
          };
        }

        // Check self collision
        if (newSnake.some((segment) => isPositionEqual(segment, newHead))) {
          return {
            ...prevState,
            gameOver: true,
          };
        }

        newSnake.unshift(newHead);

        // Check fruit collision
        if (isPositionEqual(newHead, prevState.fruit)) {
          const pointsEarned = prevState.isGoldenFruit ? 5 : 1;
          const newScore = prevState.score + pointsEarned;
          const maxScore = prevState.boardSize * prevState.boardSize;

          const finalSnake = prevState.isGoldenFruit
            ? [...newSnake, ...Array(4).fill(newSnake[newSnake.length - 1])]
            : newSnake;

          if (newScore >= maxScore) {
            return {
              ...prevState,
              snake: finalSnake,
              isGoldenFruit: false,
              score: newScore,
              gameWon: true,
            };
          }

          const { fruit, isGolden } = generateNewFruit(
            prevState.boardSize,
            finalSnake,
          );

          return {
            ...prevState,
            snake: finalSnake,
            fruit,
            isGoldenFruit: isGolden,
            score: newScore,
          };
        }

        newSnake.pop();

        return {
          ...prevState,
          snake: newSnake,
        };
      });
    }, gameState.speed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [
    gameState.gameOver,
    gameState.gamePaused,
    gameState.gameWon,
    gameState.gameStarted,
    gameState.speed,
  ]);

  const resetGame = useCallback(() => {
    setGameState((prevState) => {
      const newState = getInitialGameState(prevState.difficulty);
      lastMoveDirectionRef.current = newState.direction;
      return newState;
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prevState) => {
      // Start the game if it hasn't been started yet
      if (!prevState.gameStarted) {
        return {
          ...prevState,
          gameStarted: true,
          gamePaused: false,
        };
      }

      // Otherwise toggle pause
      return {
        ...prevState,
        gamePaused: !prevState.gamePaused,
      };
    });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState((prevState) => {
      if (prevState.gameStarted) return prevState; // Don't allow changing difficulty mid-game
      return getInitialGameState(difficulty);
    });
  }, []);

  const saveScore = useCallback(
    (name: string) => {
      const { entries, isNewHighscore } = addOrUpdateScore(
        name,
        gameState.score,
        gameState.difficulty,
        gameState.gameWon,
      );
      setLeaderboard(entries);
      return isNewHighscore;
    },
    [gameState.score, gameState.difficulty, gameState.gameWon],
  );

  return {
    gameState,
    leaderboard,
    resetGame,
    togglePause,
    setDifficulty,
    saveScore,
  };
};
