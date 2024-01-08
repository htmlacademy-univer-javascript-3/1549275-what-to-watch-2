import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import films from '../../mock/films';
import { createAPI } from '../../services/api';
import { State } from '../../data/types/store';
import thunk from 'redux-thunk';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import Film from './film';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];
describe('Film Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Favorite]: {
        favoriteFilms: [],
        isFavoriteLoading: false
      },
      [NameSpace.Film]: {
        film: mockFilm,
        reviewsFilm: [],
        similarFilms: [],
        isFilmDataLoading: false,
        isSimilarFilmsDataLoading: false,
        isReviewsFilmDataLoading: false,
        hasError: false
      }
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Film />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Snatch/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render loading screen', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Film]: {
        film: mockFilm,
        reviewsFilm: [],
        similarFilms: [],
        isFilmDataLoading: true,
        isSimilarFilmsDataLoading: false,
        isReviewsFilmDataLoading: false,
        hasError: false
      }
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Film />
        </Provider>
      </MemoryRouter>
    );

    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });

  it('should render error', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Film]: {
        film: null,
        reviewsFilm: [],
        similarFilms: [],
        isFilmDataLoading: false,
        isSimilarFilmsDataLoading: false,
        isReviewsFilmDataLoading: false,
        hasError: true
      }
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Film />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ошибка 404. Страница не существует./i)).toBeInTheDocument();
  });
});
