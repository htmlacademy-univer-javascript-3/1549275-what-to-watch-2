import { FC, memo } from 'react';
import { useFilmRating } from '../../../hooks/films';
import { Film } from '../../../types/film';

interface OverviewProps {
  film: Film;
}

const OverviewComponent: FC<OverviewProps> = ({ film }) => {
  const {
    rating,
    scoresCount,
    director,
    starring,
    description,
  } = film;

  const filmRatingLevel = useFilmRating(rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLevel}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
};

export const Overview = memo(OverviewComponent);
