import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import GameControls from './GameControls';

describe('GameControls', () => {
  const mockProps = {
    onReset: vi.fn(),
    onTogglePause: vi.fn(),
  };

  it('should display correct button labels based on game state', () => {
    const { rerender } = render(
      <GameControls
        {...mockProps}
        gameOver={false}
        gameWon={false}
        gameStarted={false}
        gamePaused={false}
      />,
    );
    expect(screen.getByText('Start')).toBeInTheDocument();

    rerender(
      <GameControls
        {...mockProps}
        gameOver={false}
        gameWon={false}
        gameStarted={true}
        gamePaused={false}
      />,
    );
    expect(screen.getByText('Pause')).toBeInTheDocument();

    rerender(
      <GameControls
        {...mockProps}
        gameOver={false}
        gameWon={false}
        gameStarted={true}
        gamePaused={true}
      />,
    );
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('should call handlers when buttons are clicked', async () => {
    const user = userEvent.setup();
    render(
      <GameControls
        {...mockProps}
        gameOver={false}
        gameWon={false}
        gameStarted={false}
        gamePaused={false}
      />,
    );

    await user.click(screen.getByText('Restart'));
    expect(mockProps.onReset).toHaveBeenCalledTimes(1);

    await user.click(screen.getByText('Start'));
    expect(mockProps.onTogglePause).toHaveBeenCalledTimes(1);
  });

  it('should disable pause button when game is over or won', () => {
    const { rerender } = render(
      <GameControls
        {...mockProps}
        gameOver={true}
        gameWon={false}
        gameStarted={true}
        gamePaused={false}
      />,
    );
    expect(screen.getByText('Pause')).toBeDisabled();

    rerender(
      <GameControls
        {...mockProps}
        gameOver={false}
        gameWon={true}
        gameStarted={true}
        gamePaused={false}
      />,
    );
    expect(screen.getByText('Pause')).toBeDisabled();
  });
});
