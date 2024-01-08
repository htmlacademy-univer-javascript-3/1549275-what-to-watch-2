import React from 'react';
import LOCALE from './buttons.locale';

type PausePlayerProps = {
  handleClick: () => void;
}

const PausePlayer: React.FC<PausePlayerProps> = ({ handleClick }) => (
  <button type="button" className="player__play" onClick={handleClick}>
    <svg viewBox="0 0 14 21" width="14" height="21">
      <use xlinkHref="#pause"></use>
    </svg>
    <span>{LOCALE.PAUSE}</span>
  </button>
);

export default PausePlayer;
