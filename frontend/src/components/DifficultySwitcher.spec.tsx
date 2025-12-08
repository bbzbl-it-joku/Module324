import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DifficultySwitcher from './DifficultySwitcher';

describe('DifficultySwitcher', () => {
  it('should display all difficulty levels and highlight current', () => {
    const mockOnChange = vi.fn();
    render(
      <DifficultySwitcher
        currentDifficulty="hard"
        onDifficultyChange={mockOnChange}
      />,
    );

    expect(screen.getByText('easy')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText('hard')).toHaveClass('bg-emerald-500');
  });

  it('should call onDifficultyChange when button clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(
      <DifficultySwitcher
        currentDifficulty="easy"
        onDifficultyChange={mockOnChange}
      />,
    );

    await user.click(screen.getByText('hard'));
    expect(mockOnChange).toHaveBeenCalledWith('hard');
  });

  it('should disable buttons when disabled prop is true', () => {
    const mockOnChange = vi.fn();
    render(
      <DifficultySwitcher
        currentDifficulty="medium"
        onDifficultyChange={mockOnChange}
        disabled={true}
      />,
    );

    expect(screen.getByText('easy')).toBeDisabled();
    expect(screen.getByText('medium')).toBeDisabled();
    expect(screen.getByText('hard')).toBeDisabled();
  });
});
