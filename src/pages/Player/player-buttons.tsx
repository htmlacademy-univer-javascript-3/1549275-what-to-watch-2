import React from 'react';
import Buttons from '../../components/buttons';

type PlayerButtons = {
  togglePlay: () => void;
  handleFullSrceen: () => void;
  isPlaying: boolean;
  name: string;
}

const PlayerButtons: React.FC<PlayerButtons> = ({ togglePlay, handleFullSrceen, isPlaying, name }) => (
  <div className="player__controls-row">
    {isPlaying ?
      <Buttons.PausePlayer handleClick={togglePlay} /> :
      <Buttons.PlayPlayer handleClick={togglePlay} />}
    <div className="player__name">{name}</div>
    <Buttons.FullScreen handleClick={handleFullSrceen} />
  </div>
);

export default PlayerButtons;
