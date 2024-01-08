import { renderHook, act } from '@testing-library/react';
import useVideoPlayer from './use-video-player';

describe('Hook: useVideoPlayer', () => {
  it('should toggle play state', () => {
    const videoRefMock = { current: { pause: vi.fn(), play: vi.fn() } };
    const sliderRefMock = { current: null };

    const { result } = renderHook(() => useVideoPlayer(videoRefMock, sliderRefMock));

    act(() => {
      result.current.togglePlay();
    });

    expect(videoRefMock.current.pause).toHaveBeenCalled();

    act(() => {
      result.current.togglePlay();
    });

    expect(videoRefMock.current.play).toHaveBeenCalled();
  });

  it('should update progress on handleProgress', () => {
    const videoRefMock = { current: { duration: 100, currentTime: 50 } };
    const sliderRefMock = { current: null };

    const { result } = renderHook(() => useVideoPlayer(videoRefMock, sliderRefMock));

    act(() => {
      result.current.handleProgress();
    });

    expect(result.current.progress).toBe(50);
  });

  it('should handle slider interaction', () => {
    const videoRefMock = { current: { duration: 100, currentTime: 0 } };
    const sliderRefMock = { current: { clientWidth: 200 } };

    const { result } = renderHook(() => useVideoPlayer(videoRefMock, sliderRefMock));

    act(() => {
      result.current.handleSlider(100);
    });

    expect(result.current.progress).toBe(50);
    expect(videoRefMock.current.currentTime).toBe(50);
  });

  it('should request fullscreen on handleFullscreen', () => {
    const videoRefMock = { current: { requestFullscreen: vi.fn() } };
    const sliderRefMock = { current: null };

    const { result } = renderHook(() => useVideoPlayer(videoRefMock, sliderRefMock));

    act(() => {
      result.current.handleFullSrceen();
    });

    expect(videoRefMock.current.requestFullscreen).toHaveBeenCalled();
  });
});
