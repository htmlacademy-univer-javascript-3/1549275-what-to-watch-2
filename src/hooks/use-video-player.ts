import { useState } from 'react';

const useVideoPlayer = (videoRef: React.MutableRefObject<HTMLVideoElement | null>, sliderRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    if (videoRef.current === null) {
      return;
    }
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const newProgress = (currentTime / duration) * 100;
    setProgress(newProgress);
  };

  const handleFullSrceen = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.requestFullscreen();
  };

  const handleSlider = (clientX: number) => {
    if (videoRef.current === null || sliderRef.current === null) {
      return;
    }
    const newProgress = clientX / sliderRef.current.clientWidth;
    setProgress(newProgress * 100);
    videoRef.current.currentTime = videoRef.current.duration * newProgress;
  };

  return {
    isPlaying,
    progress,
    togglePlay,
    handleProgress,
    handleSlider,
    handleFullSrceen
  };
};

export default useVideoPlayer;
