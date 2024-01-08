import React from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo';
import UserBlock from '../../components/user-block';
import FilmList from '../../components/film-list';
import { useAppSelector } from '../../hooks/hooks';
import { getFavoriteFilms, getFavoriteFilmsDataLoadingStatus } from '../../store/favorite/favorite.selectors';
import LoadingSreen from '../loading-sreen';

const MyList: React.FC = () => {
  const filmList = useAppSelector(getFavoriteFilms);
  const dataLoadingStatus = useAppSelector(getFavoriteFilmsDataLoadingStatus);

  if (dataLoadingStatus) {
    return <LoadingSreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmList.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {filmList.length === 0 ? <div>Add some films</div> : <FilmList filmList={filmList} />}
      </section>
      <Footer />
    </div>
  );
};

export default MyList;
