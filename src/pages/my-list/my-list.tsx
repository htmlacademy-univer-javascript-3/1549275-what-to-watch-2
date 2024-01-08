import React, { useEffect } from 'react';
import { Catalog } from '../../components/catalog';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchFavoriteFilms } from '../../store/api-actions';
import { ReducerName } from '../../types/reducer-name';

const MyListPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const favoriteFilms = useAppSelector((state) => state[ReducerName.Main].favoriteFilms);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilms());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <h1 className="page-title user-page__title">
          My list <span data-testid="favorite-count" className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
      </Header>

      <Catalog withoutButton withoutGenre films={favoriteFilms} />

      <Footer />
    </div>
  );
};
export const MyList = React.memo(MyListPage);
