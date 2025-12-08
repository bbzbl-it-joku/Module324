import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GameStatus from './GameStatus';

describe('GameStatus', () => {
  it('should show "Press Space" message when game not started', () => {
    render(
      <GameStatus
        gameStarted={false}
        gameOver={false}
        gamePaused={false}
        gameWon={false}
      />,
    );

    expect(
      screen.getByText('Press Space or Start to begin'),
    ).toBeInTheDocument();
  });

  it('should show "Game Over!" message when game is over', () => {
    render(
      <GameStatus
        gameStarted={true}
        gameOver={true}
        gamePaused={false}
        gameWon={false}
      />,
    );

    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  it('should show "Paused" message when game is paused', () => {
    render(
      <GameStatus
        gameStarted={true}
        gameOver={false}
        gamePaused={true}
        gameWon={false}
      />,
    );

    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('should not show paused message when game is won', () => {
    render(
      <GameStatus
        gameStarted={true}
        gameOver={false}
        gamePaused={true}
        gameWon={true}
      />,
    );

    expect(screen.queryByText('Paused')).not.toBeInTheDocument();
  });

  it('should return null when game is running', () => {
    const { container } = render(
      <GameStatus
        gameStarted={true}
        gameOver={false}
        gamePaused={false}
        gameWon={false}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should prioritize game over message over paused', () => {
    render(
      <GameStatus
        gameStarted={true}
        gameOver={true}
        gamePaused={true}
        gameWon={false}
      />,
    );

    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.queryByText('Paused')).not.toBeInTheDocument();
  });
});
