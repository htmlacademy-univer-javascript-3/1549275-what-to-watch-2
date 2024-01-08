import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import films from '../../mock/films';
import { NameSpace } from '../../data/constants/name-space';
import FilmCard from './film-card';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import { State } from '../../data/types/store';

const mockFilm = films[0];
const mockStore = configureMockStore<State>([thunk]);

describe('Film Card Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
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

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCard />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Snatch/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render loading screen', () => {
    const store = mockStore({
      [NameSpace.Promo]: {
        promo: mockFilm,
        isPromoDataLoading: true,
        hasError: false
      },
      [NameSpace.Favorite]: {
        favoriteFilms: [],
        isFavoriteLoading: false
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCard />
        </Provider>
      </MemoryRouter>
    );

    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });

  it('should render error screen', () => {
    const store = mockStore({
      [NameSpace.Promo]: {
        promo: mockFilm,
        isPromoDataLoading: false,
        hasError: true
      },
      [NameSpace.Favorite]: {
        favoriteFilms: [],
        isFavoriteLoading: false
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCard />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ошибка 404. Страница не существует./i)).toBeInTheDocument();
  });
});
