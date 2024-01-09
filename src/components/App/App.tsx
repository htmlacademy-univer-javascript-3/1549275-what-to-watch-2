import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/main-page.tsx';
import SignIn from '../../pages/SignIn/sign-in.tsx';
import MyList from '../../pages/MyList/my-list.tsx';
import Film from '../../pages/Film/film.tsx';
import AddReview from '../../pages/AddReview/add-review.tsx';
import Player from '../../pages/Player/player.tsx';
import NotFound404 from '../../pages/NotFoundPage/not-found-page.tsx';
import PrivateRoute from '../PrivateRoute/private-route.tsx';
import Scroll from '../Scroll/scroll.tsx';
import { FilmsData, ReviewsData } from '../../types';
import { AppRoute, AuthStatus } from '../../config/config.ts';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../LoadingScreen/loading-screen.tsx';
import HistoryRouter from '../HistoryRouter/history-router.tsx';
import browserHistory from '../../browser-history.ts';

type AppProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
}

function App({filmsData, reviewsData}: AppProps) {
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const authStatus = useAppSelector((state) => state.authStatus);

  if (authStatus === AuthStatus.Unknown || isFilmsDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Scroll/>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage/>
          }
        >
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignIn></SignIn>}
        >
        </Route>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={authStatus}>
              <MyList></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={
            <Film
              filmsData={filmsData}
              reviewsData={reviewsData}
            />
          }
        >
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={authStatus}>
              <AddReview filmsData={filmsData}></AddReview>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Player}
          element={<Player filmsData={filmsData}></Player>}
        >
        </Route>
        <Route
          path="*"
          element={<NotFound404></NotFound404>}
        >
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
