import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import WinDialog from './WinDialog';

describe('WinDialog', () => {
  const defaultProps = {
    score: 100,
    won: false,
    isNewHighscore: false,
    previousHighscore: null,
    scoreTooLow: false,
    onPlayAgain: vi.fn(),
  };

  it('should render game over message by default', () => {
    render(<WinDialog {...defaultProps} />);

    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText('Better luck next time!')).toBeInTheDocument();
    expect(screen.getByText('Final Score: 100')).toBeInTheDocument();
  });

  it('should render congratulations message when won', () => {
    render(<WinDialog {...defaultProps} won={true} />);

    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You won the game!')).toBeInTheDocument();
  });

  it('should render new highscore message when achieved', () => {
    render(<WinDialog {...defaultProps} isNewHighscore={true} score={150} />);

    expect(screen.getByText('New Highscore!')).toBeInTheDocument();
    expect(
      screen.getByText('You beat your personal best!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Final Score: 150')).toBeInTheDocument();
  });

  it('should show score too low message', () => {
    render(<WinDialog {...defaultProps} scoreTooLow={true} score={2} />);

    expect(
      screen.getByText('Score too low to save (minimum: 3 points)'),
    ).toBeInTheDocument();
  });

  it('should display previous highscore when available', () => {
    render(<WinDialog {...defaultProps} previousHighscore={80} score={100} />);

    expect(screen.getByText(/Previous Best: 80/i)).toBeInTheDocument();
  });

  it('should call onPlayAgain when Play Again button is clicked', async () => {
    const user = userEvent.setup();
    const onPlayAgain = vi.fn();

    render(<WinDialog {...defaultProps} onPlayAgain={onPlayAgain} />);

    await user.click(screen.getByText('Play Again'));

    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });

  it('should prioritize won message over highscore message', () => {
    render(<WinDialog {...defaultProps} won={true} isNewHighscore={true} />);

    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You won the game!')).toBeInTheDocument();
  });

  it('should apply correct styling for new highscore', () => {
    render(<WinDialog {...defaultProps} isNewHighscore={true} />);

    const heading = screen.getByText('New Highscore!');
    expect(heading).toHaveClass('text-amber-500');
  });

  it('should not show previous highscore when null', () => {
    render(<WinDialog {...defaultProps} previousHighscore={null} />);

    expect(screen.queryByText(/Previous Best:/i)).not.toBeInTheDocument();
  });
});
