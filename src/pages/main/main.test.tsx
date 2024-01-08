import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Main } from './main';
import { ReducerName } from '../../types/reducer-name';
import films from '../../mocks/films';
import { AuthorizationStatus } from '../../types/authorization-status';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const promoFilm = films[0];

describe('MainPage Component', () => {
  it('renders Main page with promo film', async () => {
    const uniquePromoName = 'UniquePromo';
    const store = mockStore({
      [ReducerName.Main]: {
        promo: {...promoFilm, name: uniquePromoName},
        genreFilms: films,
        films: films,
        isPromoLoading: false,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: {
          name: 'John Doe',
          avatarUrl: 'path/to/avatar.jpg',
          email: 'john@example.com',
          id: 123,
          token: '123433',
        },
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const promoFilmTitle = screen.getByText(promoFilm.name);
      expect(promoFilmTitle).toBeInTheDocument();

    });
  });

  it('renders loading spinner while fetching promo film', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        promo: null,
        isPromoLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
