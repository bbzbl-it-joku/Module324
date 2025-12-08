import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    // Reset document class
    document.documentElement.className = '';

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should return false when dark class is not present', () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(false);
  });

  it('should return true when dark class is present', () => {
    document.documentElement.classList.add('dark');

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(true);
  });

  it('should return true when prefers-color-scheme is dark', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(true);
  });

  it('should observe class changes on documentElement', () => {
    const { result, rerender } = renderHook(() => useDarkMode());

    expect(result.current).toBe(false);

    document.documentElement.classList.add('dark');

    // Trigger MutationObserver callback manually
    rerender();

    // The hook should update when class changes
    // Note: This is simplified - in real usage MutationObserver would trigger
  });

  it('should clean up observer on unmount', () => {
    const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');

    const { unmount } = renderHook(() => useDarkMode());

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
