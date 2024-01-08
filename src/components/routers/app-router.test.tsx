import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import AppRouter from './app-router';
import { createAPI } from '../../services/api';
import { State } from '../../data/types/store';
import films from '../../mock/films';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import reviews from '../../mock/reviews';
import { IReview } from '../../data/abstractions/IReview';
import Catalog from '../../data/enums/catalog';
import { FILM_STEP } from '../../data/constants/film-step';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];
const mockReviews: IReview[] = reviews;
describe('logged in routing', () => {
  const store = mockStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth
    },
    [NameSpace.Film]: {
      film: mockFilm,
      reviewsFilm: mockReviews,
      similarFilms: [],
      isFilmDataLoading: false,
      isSimilarFilmsDataLoading: false,
      isReviewsFilmDataLoading: false,
      hasError: false
    },
    [NameSpace.Films]: {
      films: films.slice(0, FILM_STEP),
      genre: Catalog.All,
      allFilms: films,
      filmCount: FILM_STEP,
      allFilmCount: films.length,
      isFilmsDataLoading: false,
      hasError: false,
    },
    [NameSpace.Promo]: {
      promo: mockFilm,
      isPromoDataLoading: false,
      hasError: false
    },
    [NameSpace.Favorite]: {
      favoriteFilms: [],
      isFavoriteLoading: false
    }
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <AppRouter />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render main page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render reviews editor when navigated to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list when navigated to "/mylist"', () => {
    routes.push('/mylist');
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/asdasd');
    render(fakeApp);
    expect(screen.getByText('Ошибка 404. Страница не существует.')).toBeInTheDocument();
  });
});

describe('not logged in routing', () => {
  const store = mockStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth
    },
    [NameSpace.Film]: {
      film: mockFilm,
      reviewsFilm: mockReviews,
      similarFilms: [],
      isFilmDataLoading: false,
      isSimilarFilmsDataLoading: false,
      isReviewsFilmDataLoading: false,
      hasError: false
    },
    [NameSpace.Films]: {
      films: films.slice(0, FILM_STEP),
      genre: Catalog.All,
      allFilms: films,
      filmCount: FILM_STEP,
      allFilmCount: films.length,
      isFilmsDataLoading: false,
      hasError: false,
    },
    [NameSpace.Promo]: {
      promo: mockFilm,
      isPromoDataLoading: false,
      hasError: false
    },
    [NameSpace.Favorite]: {
      favoriteFilms: [],
      isFavoriteLoading: false
    }
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <AppRouter />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Unscrupulous boxing promoters/i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/qwertasdfg');
    render(fakeApp);
    expect(screen.getByText('Ошибка 404. Страница не существует.')).toBeInTheDocument();
  });
});
