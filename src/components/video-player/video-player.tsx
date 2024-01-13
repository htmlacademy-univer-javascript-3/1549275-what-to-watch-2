import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster: string;
}

const VideoPlayerComponent: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 1000);
    }
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <video data-testid="video-player" ref={videoRef} src={src} poster={poster} className="player__video" loop muted>
      <source src={src} type="video/mp4" />
    </video>
  );
};
export const VideoPlayer = React.memo(VideoPlayerComponent);
