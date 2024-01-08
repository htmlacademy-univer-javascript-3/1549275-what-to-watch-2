import { render, screen, waitFor } from '@testing-library/react';
import { VideoPlayer } from './videoplayer';

const mockProps = {
  src: 'mock-video.mp4',
  poster: 'mock-poster.jpg',
};

describe('VideoPlayer Component', () => {
  it('renders video player with correct attributes', () => {
    render(<VideoPlayer {...mockProps} />);

    const videoPlayer = screen.getByTestId('video-player');

    expect(videoPlayer).toBeInTheDocument();
    expect(videoPlayer.tagName).toBe('VIDEO');
    expect(videoPlayer).toHaveAttribute('src', mockProps.src);
    expect(videoPlayer).toHaveAttribute('poster', mockProps.poster);
    expect(videoPlayer).toHaveClass('player__video');
    expect(videoPlayer).toHaveAttribute('loop');
  });

  it('plays the video after a delay', async () => {
    render(<VideoPlayer {...mockProps} />);

    const videoPlayer: HTMLVideoElement = screen.getByTestId('video-player');
    expect(videoPlayer.paused).toBe(true);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, 1000);
    });
  });
});
