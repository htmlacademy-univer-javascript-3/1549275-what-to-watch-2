import React from 'react';
import LOCALE from './buttons.locale';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getFavoriteFilms, getFavoriteFilmsDataLoadingStatus } from '../../store/favorite/favorite.selectors';
import { getAuthCheckedStatus } from '../../store/user/user.selectors';
import { changeStatusFilms, fetchFavoriteFilms } from '../../store/api-action';

type FilmCardProps = {
  id: string;
}
const FilmCard: React.FC<FilmCardProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const filmList = useAppSelector(getFavoriteFilms);
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const dataLoadingStatus = useAppSelector(getFavoriteFilmsDataLoadingStatus);
  const isFavorite = filmList.find((film) => film.id === id) !== undefined;

  const handleClick = () => {
    dispatch(changeStatusFilms({ filmId: id, status: isFavorite ? 0 : 1 }))
      .then(() => {
        dispatch(fetchFavoriteFilms());
      });
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleClick}
      disabled={!isAuth || dataLoadingStatus}
    >
      {isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width='19' height='20'>
          <use xlinkHref="#add" />
        </svg>}
      <span>{LOCALE.MY_LIST}</span>
      <span className="film-card__count">{filmList.length}</span>
    </button>
  );
};

export default FilmCard;
