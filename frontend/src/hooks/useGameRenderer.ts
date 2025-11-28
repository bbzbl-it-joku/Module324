import { useEffect, useRef } from 'react';
import type { GameState } from '../types/game';

interface RenderOptions {
  isDarkMode: boolean;
}

export const useGameRenderer = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  gameState: GameState,
  options: RenderOptions,
) => {
  const stateHistoryRef = useRef({
    current: gameState.snake,
    previous: gameState.snake,
  });
  const progressRef = useRef(0);

  useEffect(() => {
    stateHistoryRef.current.previous = stateHistoryRef.current.current;
    stateHistoryRef.current.current = gameState.snake;
    progressRef.current = 0;
  }, [gameState.snake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = {
      snake: '#10b981',
      snakeHead: '#6ee7b7',
      fruit: options.isDarkMode ? '#f87171' : '#ef4444',
      goldenFruit: '#fcd34d',
      goldenBorder: options.isDarkMode ? '#f97316' : '#f59e0b',
      bg: options.isDarkMode ? '#1a1f26' : '#f3f4f6',
      grid: options.isDarkMode ? '#374151' : '#d1d5db',
    };

    let frameId: number;
    let lastTime = Date.now();

    const draw = () => {
      const deltaTime = Date.now() - lastTime;
      lastTime = Date.now();

      progressRef.current = Math.min(
        progressRef.current + deltaTime / gameState.speed,
        1,
      );

      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= gameState.boardSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gameState.cellSize, 0);
        ctx.lineTo(i * gameState.cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gameState.cellSize);
        ctx.lineTo(canvas.width, i * gameState.cellSize);
        ctx.stroke();
      }

      ctx.fillStyle = colors.snake;
      gameState.snake.forEach((segment, i) => {
        let x = segment.x * gameState.cellSize;
        let y = segment.y * gameState.cellSize;

        const prev = stateHistoryRef.current.previous[i];
        if (prev) {
          const prevX = prev.x * gameState.cellSize;
          const prevY = prev.y * gameState.cellSize;
          x = prevX + (x - prevX) * progressRef.current;
          y = prevY + (y - prevY) * progressRef.current;
        }

        ctx.fillRect(
          x + 1,
          y + 1,
          gameState.cellSize - 2,
          gameState.cellSize - 2,
        );

        if (i === 0) {
          ctx.strokeStyle = colors.snakeHead;
          ctx.lineWidth = 2;
          ctx.strokeRect(
            x + 1,
            y + 1,
            gameState.cellSize - 2,
            gameState.cellSize - 2,
          );
        }
      });

      const fruitX = gameState.fruit.x * gameState.cellSize;
      const fruitY = gameState.fruit.y * gameState.cellSize;

      if (gameState.isGoldenFruit) {
        ctx.fillStyle = colors.goldenFruit;
        ctx.fillRect(
          fruitX + 1,
          fruitY + 1,
          gameState.cellSize - 2,
          gameState.cellSize - 2,
        );
        ctx.strokeStyle = colors.goldenBorder;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          fruitX + 1,
          fruitY + 1,
          gameState.cellSize - 2,
          gameState.cellSize - 2,
        );
      } else {
        ctx.fillStyle = colors.fruit;
        ctx.fillRect(
          fruitX + 2,
          fruitY + 2,
          gameState.cellSize - 4,
          gameState.cellSize - 4,
        );
      }

      if (progressRef.current < 1) {
        frameId = requestAnimationFrame(draw);
      }
    };

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [
    canvasRef,
    gameState.snake,
    gameState.speed,
    gameState.fruit,
    gameState.isGoldenFruit,
    gameState.boardSize,
    gameState.cellSize,
    options.isDarkMode,
  ]);
};
