import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import PlayerNameDialog from './PlayerNameDialog';

describe('PlayerNameDialog', () => {
  it('should render the dialog with welcome message', () => {
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    expect(screen.getByText('Welcome to Snake Game!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('should allow typing a valid name', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Player1');

    expect(input).toHaveValue('Player1');
  });

  it('should show error for invalid characters', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Player@123');

    expect(
      screen.getByText(/Only letters, numbers, hyphens/i),
    ).toBeInTheDocument();
  });

  it('should accept letters, numbers, hyphens, and underscores', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Player_123-Test');

    expect(
      screen.queryByText(/Only letters, numbers/i),
    ).not.toBeInTheDocument();
  });

  it('should clear error when input is empty', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Invalid@Name');
    expect(screen.getByText(/Only letters, numbers/i)).toBeInTheDocument();

    await user.clear(input);
    expect(
      screen.queryByText(/Only letters, numbers/i),
    ).not.toBeInTheDocument();
  });

  it('should call onSaveName with trimmed name when saved', async () => {
    const user = userEvent.setup();
    const onSaveName = vi.fn();
    render(<PlayerNameDialog onSaveName={onSaveName} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Player1');

    const button = screen.getByText('Start Playing');
    await user.click(button);

    expect(onSaveName).toHaveBeenCalledWith('Player1');
  });

  it('should not call onSaveName for invalid name', async () => {
    const user = userEvent.setup();
    const onSaveName = vi.fn();
    render(<PlayerNameDialog onSaveName={onSaveName} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Invalid@Name');
    await user.click(screen.getByText('Start Playing'));

    expect(onSaveName).not.toHaveBeenCalled();
  });

  it('should not call onSaveName for empty name', async () => {
    const user = userEvent.setup();
    const onSaveName = vi.fn();
    render(<PlayerNameDialog onSaveName={onSaveName} />);

    await user.click(screen.getByText('Start Playing'));

    expect(onSaveName).not.toHaveBeenCalled();
  });

  it('should handle Enter key to save name', async () => {
    const user = userEvent.setup();
    const onSaveName = vi.fn();
    render(<PlayerNameDialog onSaveName={onSaveName} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Player1{Enter}');

    expect(onSaveName).toHaveBeenCalledWith('Player1');
  });

  it('should disable save button when name is invalid', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'Invalid@Name');

    const saveButton = screen.getByText('Start Playing');
    expect(saveButton).toBeDisabled();
  });

  it('should disable save button when name is empty', () => {
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const saveButton = screen.getByText('Start Playing');
    expect(saveButton).toBeDisabled();
  });

  it('should enable save button when name is valid', async () => {
    const user = userEvent.setup();
    render(<PlayerNameDialog onSaveName={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your name');
    await user.type(input, 'ValidPlayer');

    const saveButton = screen.getByText('Start Playing');
    expect(saveButton).not.toBeDisabled();
  });
});
