import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import films from '../../mock/films';
import { FILM_STEP } from '../../data/constants/film-step';
import { NameSpace } from '../../data/constants/name-space';
import Catalog from '../../data/enums/catalog';
import FilmCatalog from './catalog';
import { State } from '../../data/types/store';

const mockStore = configureMockStore<State>([thunk]);

describe('Catalog Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [NameSpace.Films]: {
        films: [],
        genre: Catalog.All,
        allFilms: films,
        filmCount: FILM_STEP,
        allFilmCount: films.length,
        isFilmsDataLoading: false,
        hasError: false,
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCatalog />
        </Provider>
      </MemoryRouter>
    );

    const filmsList = screen.getByTestId('films-list');
    const showMoreButton = screen.getByTestId('show-more');

    expect(filmsList).toBeInTheDocument();
    expect(showMoreButton).toBeInTheDocument();
  });

  it('should render loading screen', () => {
    const store = mockStore({
      [NameSpace.Films]: {
        films: [],
        genre: Catalog.All,
        allFilms: [],
        filmCount: films.length,
        allFilmCount: films.length,
        isFilmsDataLoading: true,
        hasError: false,
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCatalog />
        </Provider>
      </MemoryRouter>
    );

    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });

  it('should show films list', () => {
    const store = mockStore({
      [NameSpace.Films]: {
        films: films,
        genre: Catalog.All,
        allFilms: films,
        filmCount: films.length,
        allFilmCount: films.length,
        isFilmsDataLoading: false,
        hasError: false,
      }
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmCatalog />
        </Provider>
      </MemoryRouter>
    );

    const filmsList = screen.queryAllByTestId('small-film-card');
    const showMoreButton = screen.queryByTestId('show-more');

    expect(filmsList).toHaveLength(films.length);
    expect(showMoreButton).toBeNull();
  });
});
