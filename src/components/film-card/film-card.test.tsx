import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import films from '../../mocks/films';
import { FilmCard } from './film-card';
import { ReducerName } from '../../types/reducer-name';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Genre } from '../../types/genre';

const mockStore = configureMockStore();

const mockFilm = films[0];

describe('FilmCard Component', () => {
  const initialState = {
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Authorized,
      user: null,
    },
    [ReducerName.Film]: {
      film: mockFilm,
      reviews: [],
      similar: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      genreFilms: [],
      currentGenre: Genre.DefaultGenre,
      isFilmsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  };

  it('should render the film card with correct details', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={mockFilm} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('should have the correct alt text for the background image', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={mockFilm} />
        </MemoryRouter>
      </Provider>
    );

    const backgroundImageElement = screen.getByTestId('film-background-image');

    expect(backgroundImageElement).toHaveAttribute('alt', mockFilm.name);
  });
});
