import React, { useCallback, useEffect } from 'react';
import LOCALE from './catalog.locale';
import GenresItem from './genres-item';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Catalog from '../../data/enums/catalog';
import Buttons from '../buttons';
import FilmList from '../film-list';
import GENRES from '../../data/constants/genres';
import { getAllFilmCount, getFilmCount, getFilms, getFilmsDataLoadingStatus, getGenre } from '../../store/films/films.selectors';
import { getFilmsByGenre, getMoreFilms, resetFilmsCount, setGenre } from '../../store/films/films.slices';
import LoadingSreen from '../../pages/loading-sreen';

const FilmCatalog: React.FC = () => {
  const genre = useAppSelector(getGenre);
  const filmList = useAppSelector(getFilms);
  const allFilmCount = useAppSelector(getAllFilmCount);
  const filmCount = useAppSelector(getFilmCount);
  const dataLoadingStatus = useAppSelector(getFilmsDataLoadingStatus);
  const dispatch = useAppDispatch();

  const handleSetGenre = useCallback((newGenre: Catalog) => {
    dispatch(setGenre({ genre: newGenre }));
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(getMoreFilms());
    dispatch(getFilmsByGenre());
  };

  useEffect(() => {
    if (!dataLoadingStatus) {
      dispatch(resetFilmsCount());
      dispatch(getFilmsByGenre());
    }
  }, [genre, dispatch, dataLoadingStatus]);

  if (dataLoadingStatus) {
    return <LoadingSreen />;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">
        {LOCALE.TITLE}
      </h2>

      <ul className="catalog__genres-list">
        {GENRES.map((catalog) => (
          <GenresItem
            handleSetGenre={handleSetGenre}
            isActive={catalog.title === genre}
            title={catalog.title}
            key={catalog.title}
          />
        ))}
      </ul>

      <FilmList filmList={filmList} />

      {allFilmCount > filmCount ?
        <Buttons.ShowMore handleClick={handleShowMore} />
        : null}

    </section>
  );
};

export default FilmCatalog;
