/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react';
import useSmallVideoPlayer from './use-small-video-player';
import { TIMEOUT_SEC } from '../data/constants/timeout';

vi.useFakeTimers();

describe('Hook: useSmallVideoPlayer', () => {
  it('should return expected elements', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));
    const { isHovered, handleMouseEnter, handleMouseLeave } = result.current;

    expect(isHovered).toBeFalsy();
    expect(typeof handleMouseLeave).toBe('function');
    expect(typeof handleMouseEnter).toBe('function');
  });

  it('should be correctly change state handleMouseEnter()', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));

    act(() => {
      result.current.handleMouseEnter();
    });

    expect(result.current.isHovered).toBeTruthy();
  });

  it('should be correctly change state handleMouseLeave()', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));
    const { isHovered, handleMouseEnter, handleMouseLeave } = result.current;

    act(() => handleMouseEnter());
    act(() => handleMouseLeave());
    expect(isHovered).toBeFalsy();
  });

  it('should play video when hovered', () => {
    const videoRefMock = { current: { play: vi.fn(), pause: vi.fn(), currentTime: 0 } };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));

    act(() => {
      result.current.handleMouseEnter();
    });

    setTimeout(() => {
      expect(result.current.isHovered).toBeTruthy();
      expect(videoRefMock.current.play).toHaveBeenCalled();
    }, TIMEOUT_SEC);

  });

  test('should pause video when not hovered', () => {
    const videoRefMock = { current: { play: vi.fn(), pause: vi.fn(), currentTime: 0 } };

    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));

    act(() => {
      result.current.handleMouseEnter();
      result.current.handleMouseLeave();
    });

    setTimeout(() => {
      expect(videoRefMock.current.pause).toHaveBeenCalled();
      expect(videoRefMock.current.currentTime).toBe(0);
    }, TIMEOUT_SEC);
  });

  test('should clear timeout on unmount', () => {
    const videoRefMock = { current: { play: vi.fn(), pause: vi.fn(), currentTime: 0 } };
    vi.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useSmallVideoPlayer(videoRefMock));

    unmount();

    expect(global.clearTimeout).toHaveBeenCalled();
  });
});
