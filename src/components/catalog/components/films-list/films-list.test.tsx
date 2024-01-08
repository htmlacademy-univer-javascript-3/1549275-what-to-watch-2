import { render, screen } from '@testing-library/react';
import { FilmsList } from './films-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ReducerName } from '../../../../types/reducer-name';
import { State } from '../../../../types/state';
import thunk from 'redux-thunk';
import films from '../../../../mocks/films';
import { MemoryRouter } from 'react-router-dom';

const mockFilm = films[0];

const mockStore = configureMockStore<State>([thunk]);

describe('FilmsList Component', () => {
  it('should render films correctly when loading is complete', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: [mockFilm],
        isFilmsLoading: false,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmsList maxLength={1} />
        </Provider>
      </MemoryRouter>

    );

    const filmTitle = screen.getByTestId('sample-film-title');

    expect(filmTitle).toBeInTheDocument();
  });

  it('should render loading spinner when films are loading', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: [],
        isFilmsLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <FilmsList maxLength={1} />
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
