import React, { useLayoutEffect } from 'react';
import { FilmCard } from '../../components/film-card';
import { Catalog } from '../../components/catalog';
import { Footer } from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Spinner } from '../../components/spinner/spinner';
import { ReducerName } from '../../types/reducer-name';
import { fetchPromo } from '../../store/api-actions';
import { Page404 } from '../page-404';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isPromoLoading, promo } = useAppSelector((state) => state[ReducerName.Main]);

  useLayoutEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchPromo());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isPromoLoading) {
    return <Spinner />;
  }

  return promo ? (
    <>
      <FilmCard film={promo} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  ) : (
    <Page404 />
  );
};
export const Main = React.memo(MainPage);
