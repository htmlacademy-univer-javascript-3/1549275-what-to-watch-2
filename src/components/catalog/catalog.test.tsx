import { render, fireEvent, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Catalog } from './catalog';
import { ReducerName } from '../../types/reducer-name';
import films from '../../mocks/films';
import { State } from '../../types/state';
import thunk from 'redux-thunk';
import { Genre } from '../../types/genre';

const mockFilm = films[0];
const mockStore = configureMockStore<State>([thunk]);

describe('Catalog Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: [mockFilm],
        isFilmsLoading: false,
        films: films,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const filmsList = screen.getByTestId('films-list');
    expect(filmsList).toBeInTheDocument();
  });

  it('should handle "Show more" button click', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: films,
        isFilmsLoading: false,
        films: films,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const showMoreButton = screen.getByTestId('show-more');

    fireEvent.click(showMoreButton);

    const filmsList = screen.getByTestId('films-list');
    expect(filmsList.children.length).toBe(16);
  });
});
