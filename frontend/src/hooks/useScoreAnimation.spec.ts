import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useScoreAnimation } from './useScoreAnimation';

describe('useScoreAnimation', () => {
  it('should initialize with isGolden as false', () => {
    const { result } = renderHook(() => useScoreAnimation(0));

    expect(result.current.isGolden).toBe(false);
  });

  it('should set isGolden to true when score increases by 5', async () => {
    const { result, rerender } = renderHook(
      ({ score }) => useScoreAnimation(score),
      { initialProps: { score: 0 } },
    );

    expect(result.current.isGolden).toBe(false);

    rerender({ score: 5 });

    expect(result.current.isGolden).toBe(true);
  });

  it('should reset isGolden to false after 800ms', async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ score }) => useScoreAnimation(score),
      { initialProps: { score: 0 } },
    );

    rerender({ score: 5 });
    expect(result.current.isGolden).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current.isGolden).toBe(false);

    vi.useRealTimers();
  });

  it('should not trigger animation for score increase of 1', () => {
    const { result, rerender } = renderHook(
      ({ score }) => useScoreAnimation(score),
      { initialProps: { score: 0 } },
    );

    rerender({ score: 1 });

    expect(result.current.isGolden).toBe(false);
  });

  it('should not trigger animation when score does not change', () => {
    const { result, rerender } = renderHook(
      ({ score }) => useScoreAnimation(score),
      { initialProps: { score: 10 } },
    );

    rerender({ score: 10 });

    expect(result.current.isGolden).toBe(false);
  });

  it('should handle multiple golden fruit animations', async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ score }) => useScoreAnimation(score),
      { initialProps: { score: 0 } },
    );

    // First golden fruit
    rerender({ score: 5 });
    expect(result.current.isGolden).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current.isGolden).toBe(false);

    // Second golden fruit
    rerender({ score: 10 });
    expect(result.current.isGolden).toBe(true);

    vi.useRealTimers();
  });
});
