import { useState } from 'react';
import FilmList from '../../components/FilmList/FilmList';
import FilmPreview from '../../components/FilmPreview/FilmPreview';
import Footer from '../../components/Footer/Footer';
import { changeGenre, getFilmsByGenre } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FilmData } from '../../types';
import GenreList from '../../components/GenreList/GenreList';
import { filmsData } from '../../mocks/films';

function MainPage (): JSX.Element {

  const dispatch = useAppDispatch();
  const genreName = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);

  const [firstFilm] = films;
  const [filmPreview, setFilmPreview] = useState(firstFilm);

  const handleFilmCardClick = (film: FilmData) => {
    setFilmPreview(film);
  };

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsByGenre({genre}));
  };

  return (
    <>
      <FilmPreview film={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsData={filmsData} activeGenre={genreName} clickHandler={handleGenreClick}/>

          <FilmList filmsData={films} clickHandler={handleFilmCardClick}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
