import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteLinks } from '../../../router/consts';
import { useAppSelector, useAppDispatch } from '../../../hooks/store';
import { setFavorite } from '../../../store/api-actions';
import { ReducerName } from '../../../types/reducer-name';
import { AuthorizationStatus } from '../../../types/authorization-status';

const enum ButtonSize {
  WIDTH = 19,
  HEIGHT = 19,
}

interface FilmCardButtonsProps {
  filmId: string;
  reviewButton?: boolean;
  isFavorite?: boolean;
}

const ButtonsContainerComponent: React.FC<FilmCardButtonsProps> = ({
  filmId,
  isFavorite,
  reviewButton = false,
}) => {
  const myFilmsCount = useAppSelector((state) => state[ReducerName.Main].favoriteCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state[ReducerName.Authorzation].authorizationStatus
  );
  const notAuth = authorizationStatus === AuthorizationStatus.Unauthorized;

  const handleSetFavorite = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (notAuth) {
      navigate(RouteLinks.LOGIN);
    }
    dispatch(setFavorite({ status: !isFavorite, filmId: filmId.toString() }));
  };

  return (
    <div className="film-card__buttons">
      <Link to={`/player/${filmId}`} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT}>
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      <button className="btn btn--list film-card__button" type="button" onClick={handleSetFavorite}>
        {isFavorite ? (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT + 1}>
            <use xlinkHref="#add"></use>
          </svg>
        )}
        <span>My list</span>
        <span className="film-card__count">{myFilmsCount}</span>
      </button>
      {reviewButton ? (
        <Link to={RouteLinks.REVIEW} className="btn film-card__button">
          Add review
        </Link>
      ) : null}
    </div>
  );
};

export const FilmCardButtons = React.memo(ButtonsContainerComponent);
