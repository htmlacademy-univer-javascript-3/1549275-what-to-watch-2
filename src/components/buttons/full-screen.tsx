import React from 'react';
import LOCALE from './buttons.locale';

type FullScreenProps = {
  handleClick: () => void;
}

const FullScreen: React.FC<FullScreenProps> = ({ handleClick }) => (
  <button type="button" className="player__full-screen" onClick={handleClick}>
    <svg viewBox="0 0 27 27" width="27" height="27">
      <use xlinkHref="#full-screen"></use>
    </svg>
    <span>{LOCALE.FULL_SCREEN}</span>
  </button>
);

export default FullScreen;
