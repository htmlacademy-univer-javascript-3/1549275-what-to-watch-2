import React from 'react';
import LOCALE from './buttons.locale';

type PlayPlayerProps = {
  handleClick: () => void;
}

const PlayPlayer: React.FC<PlayPlayerProps> = ({ handleClick }) => (
  <button type="button" className="player__play" onClick={handleClick}>
    <svg viewBox="0 0 19 19" width="19" height="19">
      <use xlinkHref="#play-s"></use>
    </svg>
    <span>{LOCALE.PLAY}</span>
  </button>
);

export default PlayPlayer;
