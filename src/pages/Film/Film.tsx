import React, { useLayoutEffect } from 'react';
import Logo from '../../components/logo';
import UserBlock from '../../components/user-block/user-block';
import Page404 from '../page404';
import { useParams } from 'react-router-dom';
import Buttons from '../../components/buttons';
import LikeThis from './like-this';
import LOCALE from './film.locale';
import { fetchFilmAction, fetchReviewsFilm, fetchSimilarFilm } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import LoadingSreen from '../loading-sreen';
import FilmInfo from './film-info';
import {
  getFilm,
  getFilmDataLoadingStatus,
  getFilmErrorStatus,
  getReviewsFilm,
  getSimilarFilms
} from '../../store/film/film.selectors';
import { getAuthCheckedStatus } from '../../store/user/user.selectors';
import { resetFilm } from '../../store/film/film.slices';

const Film: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const reviewsFilm = useAppSelector(getReviewsFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const hasError = useAppSelector(getFilmErrorStatus);
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);
  const isAuth = useAppSelector(getAuthCheckedStatus);

  useLayoutEffect(() => {
    if (params.id) {
      dispatch(fetchFilmAction({ filmId: params.id }));
      dispatch(fetchSimilarFilm({ filmId: params.id }));
      dispatch(fetchReviewsFilm({ filmId: params.id }));
    }
    return () => {
      dispatch(resetFilm());
    };
  }, [params.id, dispatch]);

  if (isFilmDataLoading) {
    return <LoadingSreen />;
  }

  if (hasError || film === null) {
    return <Page404 />;
  }

  return (
    <>
      <section className="film-card film-card--full" style={{ background: film.backgroundColor }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film.backgroundImage}
              alt={film.name}
            />
          </div>

          <h1 className="visually-hidden">{LOCALE.WTW}</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">
                  {film.genre}
                </span>
                <span className="film-card__year">
                  {film.released}
                </span>
              </p>

              <div className="film-card__buttons">
                <Buttons.Play id={film.id} />
                <Buttons.FilmCard count={9} />
                {isAuth ? <Buttons.AddReview id={film.id} /> : null}
              </div>
            </div>
          </div>
        </div>

        <FilmInfo film={film} reviewsFilm={reviewsFilm} />
      </section>
      {similarFilms.length !== 0 ? <LikeThis similarFilms={similarFilms} backgroundColor={film.backgroundColor} /> : null}
    </>
  );
};

export default Film;
