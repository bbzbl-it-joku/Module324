import { useCallback, useEffect, useRef, useState } from 'react';
import { KEY_TO_DIRECTION } from '../constants/game';
import type { Difficulty, GameState, Position } from '../types/game';
import { getInitialGameState, isOppositeDirection } from '../utils/gameLogic';

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(() =>
    getInitialGameState('medium'),
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
      if (prevState.gamePaused || !prevState.gameStarted) return prevState;

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
    const isInactive = gameState.gamePaused || !gameState.gameStarted;

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

        // Wrap around the board (no collision for movement-only)
        if (newHead.x < 0) newHead.x = prevState.boardSize - 1;
        if (newHead.x >= prevState.boardSize) newHead.x = 0;
        if (newHead.y < 0) newHead.y = prevState.boardSize - 1;
        if (newHead.y >= prevState.boardSize) newHead.y = 0;

        newSnake.unshift(newHead);
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
  }, [gameState.gamePaused, gameState.gameStarted, gameState.speed]);

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

  return {
    gameState,
    resetGame,
    togglePause,
    setDifficulty,
  };
};
