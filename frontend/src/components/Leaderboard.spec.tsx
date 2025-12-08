import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { LeaderboardEntry } from '../types/game';
import Leaderboard from './Leaderboard';

describe('Leaderboard', () => {
  const mockEntries: LeaderboardEntry[] = [
    {
      id: 1,
      name: 'Player1',
      score: 150,
      difficulty: 'easy',
      won: false,
      timestamp: Date.now(),
    },
    {
      id: 2,
      name: 'Player2',
      score: 100,
      difficulty: 'easy',
      won: false,
      timestamp: Date.now(),
    },
    {
      id: 3,
      name: 'Player3',
      score: 80,
      difficulty: 'easy',
      won: false,
      timestamp: Date.now(),
    },
    {
      id: 4,
      name: 'Player4',
      score: 200,
      difficulty: 'medium',
      won: false,
      timestamp: Date.now(),
    },
  ];

  it('should render leaderboard with filtered entries by difficulty', () => {
    render(<Leaderboard difficulty="easy" entries={mockEntries} />);

    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('Player3')).toBeInTheDocument();
    expect(screen.queryByText('Player4')).not.toBeInTheDocument();
  });

  it('should sort entries by score descending', () => {
    render(<Leaderboard difficulty="easy" entries={mockEntries} />);

    const scores = screen.getAllByText(/^\d+$/);
    expect(scores[0]).toHaveTextContent('150');
    expect(scores[1]).toHaveTextContent('100');
    expect(scores[2]).toHaveTextContent('80');
  });

  it('should display medals for top 3', () => {
    render(<Leaderboard difficulty="easy" entries={mockEntries} />);

    expect(screen.getByText('🥇')).toBeInTheDocument();
    expect(screen.getByText('🥈')).toBeInTheDocument();
    expect(screen.getByText('🥉')).toBeInTheDocument();
  });

  it('should highlight current player entry', () => {
    render(
      <Leaderboard
        difficulty="easy"
        entries={mockEntries}
        currentPlayerName="Player2"
      />,
    );

    // Player should be marked with (You)
    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('should show empty state when no entries', () => {
    render(<Leaderboard difficulty="easy" entries={[]} />);

    expect(screen.getByText(/No scores yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Be the first/i)).toBeInTheDocument();
  });

  it('should show player rank when provided', () => {
    render(
      <Leaderboard
        difficulty="easy"
        entries={mockEntries}
        currentPlayerName="Player2"
      />,
    );

    // Player is marked with (You)
    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('should show top 5 entries', () => {
    const manyEntries: LeaderboardEntry[] = Array.from(
      { length: 10 },
      (_, i) => ({
        id: i + 1,
        name: `Player${i + 1}`,
        score: 100 - i * 5,
        difficulty: 'hard',
        won: false,
        timestamp: Date.now(),
      }),
    );

    render(<Leaderboard difficulty="hard" entries={manyEntries} />);

    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player5')).toBeInTheDocument();
    expect(screen.queryByText('Player7')).not.toBeInTheDocument();
  });

  it('should show player entry outside top 5', () => {
    const manyEntries: LeaderboardEntry[] = Array.from(
      { length: 10 },
      (_, i) => ({
        id: i + 1,
        name: `Player${i + 1}`,
        score: 100 - i * 5,
        difficulty: 'medium',
        won: false,
        timestamp: Date.now(),
      }),
    );

    render(
      <Leaderboard
        difficulty="medium"
        entries={manyEntries}
        currentPlayerName="Player8"
      />,
    );

    expect(screen.getByText('Player8')).toBeInTheDocument();
    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('should format dates correctly', () => {
    const timestamp = new Date('2024-01-15').getTime();
    const entriesWithDate: LeaderboardEntry[] = [
      {
        id: 1,
        name: 'Player1',
        score: 100,
        difficulty: 'easy',
        won: false,
        timestamp,
      },
    ];

    render(<Leaderboard difficulty="easy" entries={entriesWithDate} />);

    // Check if date is formatted (format: dd.mm)
    expect(screen.getByText(/15\.01/)).toBeInTheDocument();
  });

  it('should handle case-insensitive player name matching', () => {
    render(
      <Leaderboard
        difficulty="easy"
        entries={mockEntries}
        currentPlayerName="PLAYER1"
      />,
    );

    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('should not show rank when player has no entry', () => {
    render(
      <Leaderboard
        difficulty="easy"
        entries={mockEntries}
        currentPlayerName="NonExistentPlayer"
      />,
    );

    expect(screen.queryByText('(You)')).not.toBeInTheDocument();
  });
});
