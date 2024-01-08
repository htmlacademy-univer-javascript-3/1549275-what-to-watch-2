import React, { useEffect } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Pages from '../../pages';
import PrivateRoute from './private-router';
import { AppRoute } from '../../data/enums/app-route';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import LoadingScreen from '../../pages/loading-sreen';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user/user.selectors';
import { fetchFavoriteFilms } from '../../store/api-action';
import { resetFavoriteFilms } from '../../store/favorite/favorite.slices';

const { Main, Page404, Login, MyList, Player, AddReview, Film } = Pages;

const AppRouter: React.FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavoriteFilms());
    } else {
      dispatch(resetFavoriteFilms());
    }
  }, [isAuth, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} >
        <Route index element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.Films}>
          <Route path=":id" element={<Film />} />
          <Route path=":id/review" element={
            <PrivateRoute>
              <AddReview />
            </PrivateRoute>
          }
          />
        </Route>
      </Route>
      <Route
        path="*"
        element={<Page404 />}
      />
    </Routes>
  );
};

export default AppRouter;
