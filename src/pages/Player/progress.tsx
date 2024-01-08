import React from 'react';
import LOCALE from './player.locale';
import { getTimeLeft } from '../../utils/get-time-left';

const PADDING = 25;

type ProgressProps = {
  progress: number;
  runTime: number;
  handleSlider: (clientX: number) => void;
  sliderRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Progress: React.FC<ProgressProps> = ({ progress, handleSlider, sliderRef, runTime }) => (
  <div className="player__controls-row">
    <div
      className="player__time"
      ref={sliderRef}
      onClick={(e) => {
        handleSlider(e.clientX - PADDING);
      }}
    >
      <progress className="player__progress" value={progress} max="100" />
      <div
        className="player__toggler"
        style={{ left: `${progress}%` }}
      >
        {LOCALE.TOGGLER}
      </div>
    </div>
    <div className="player__time-value">
      {getTimeLeft(runTime)}
    </div>
  </div>
);

export default Progress;
