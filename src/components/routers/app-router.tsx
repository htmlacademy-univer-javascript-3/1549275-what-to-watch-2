import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Pages from '../../pages';
import PrivateRoute from './private-router';
import { AppRoute } from '../../data/enums/app-route';
import HistoryRouter from './history-router';
import browserHistory from '../../utils/browser-history';
import { useAppSelector } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import LoadingScreen from '../../pages/loading-sreen';
import { getAuthorizationStatus } from '../../store/user/user.selectors';

const { Main, Page404, Login, MyList, Player, AddReview, Film } = Pages;

const AppRouter: React.FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
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
    </HistoryRouter>
  );
};

export default AppRouter;
