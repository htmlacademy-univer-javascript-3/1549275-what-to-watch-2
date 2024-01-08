import React from 'react';
import Buttons from '../buttons';

// мб в другое место
const FilmCardButtons: React.FC<{ id: string }> = ({ id }) => (
  <div className="film-card__buttons">
    <Buttons.Play id={id} />
    <Buttons.FilmCard id={id} />
  </div>
);

export default FilmCardButtons;
