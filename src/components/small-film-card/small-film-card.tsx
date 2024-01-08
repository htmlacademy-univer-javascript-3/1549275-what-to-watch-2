import React from 'react';
import { Link } from 'react-router-dom';
import SmallVideoPlayer from '../video-player/small-video-player';
import { IFilmData } from '../../data/abstractions/IFilmData';

const SmallFilmCard: React.FC<IFilmData> = (props) => (
  <Link className="small-film-card catalog__films-card small-film-card__link" to={`/films/${props.id}`}>
    <SmallVideoPlayer {...props} />
    <h3 className="small-film-card__title">
      <p className="small-film-card__link">
        {props.name}
      </p>
    </h3>
  </Link>
);

export default SmallFilmCard;
