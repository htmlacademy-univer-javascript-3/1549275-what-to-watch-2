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
import Player from './player';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];
describe('Player Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
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
          <Player />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Snatch/i)).toBeInTheDocument();
    expect(screen.getByText(/Pause/i)).toBeInTheDocument();
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
          <Player />
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
          <Player />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ошибка 404. Страница не существует./i)).toBeInTheDocument();
  });
});
