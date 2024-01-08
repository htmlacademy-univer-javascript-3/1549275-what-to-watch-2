import React from 'react';
import { Header } from '../header';
import { FilmCardButtons } from './components/film-card-buttons';
import { Poster } from '../poster';
import { Film } from '../../types/film';

interface FilmCardProps {
  film: Film;
}

const enum PosterSize {
  WIDTH = 218,
  HEIGHT = 327,
}

const FilmCardComponent: React.FC<FilmCardProps> = ({ film }) => {
  const { backgroundImage, name, genre, released, id, posterImage, isFavorite } = film;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} data-testid="film-background-image" />
      </div>

      <Header className="film-card__head" />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <Poster src={posterImage} alt={name} width={PosterSize.WIDTH} height={PosterSize.HEIGHT} />

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <FilmCardButtons filmId={id} isFavorite={isFavorite} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const FilmCard = React.memo(FilmCardComponent);
