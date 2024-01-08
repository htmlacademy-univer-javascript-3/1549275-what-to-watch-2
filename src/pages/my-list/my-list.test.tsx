import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { MyList } from './my-list';
import { ReducerName } from '../../types/reducer-name';
import films from '../../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const film = films[0];


describe('MyListPage Component', () => {
  it('renders My List page with favorite films', async () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteFilms: [film],
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
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<MyList />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const myListTitle = screen.getByText(/My list/);
      expect(myListTitle).toBeInTheDocument();

      const filmCount = screen.getByTestId('favorite-count');
      expect(filmCount).toHaveTextContent(String(1));

      const filmTitle = screen.getByText(film.name);
      expect(filmTitle).toBeInTheDocument();
    });
  });
});
