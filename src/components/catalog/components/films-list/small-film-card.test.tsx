import { fireEvent, render, screen } from '@testing-library/react';
import { FilmsList } from './films-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ReducerName } from '../../../../types/reducer-name';
import { State } from '../../../../types/state';
import thunk from 'redux-thunk';
import films from '../../../../mocks/films';
import { MemoryRouter } from 'react-router-dom';
import { SmallFilmCard } from './small-film-card';

const mockFilm = films[0];

const mockStore = configureMockStore<State>([thunk]);

describe('FilmsList Component', () => {
  const onMouseEnterMock = () => (true);
  const onMouseLeaveMock = () => (true);
  it('should handle card hover correctly', () => {
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

    const filmCard = screen.getByTestId('sample-film-title');

    expect(filmCard).toHaveClass('small-film-card');

    fireEvent.mouseEnter(filmCard);

    expect(filmCard).toHaveAttribute('data-active', 'true');

    fireEvent.mouseLeave(filmCard);

    expect(filmCard).toHaveAttribute('data-active', 'false');
  });

  it('should render active state with VideoPlayer when active', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive onMouseEnter={onMouseEnterMock} onMouseLeave={onMouseLeaveMock} />
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('sample-film-title');
    const videoPlayer = screen.getByTestId('video-player');

    expect(filmCard).toHaveAttribute('data-active', 'true');
    expect(videoPlayer).toBeInTheDocument();
  });

  it('should render inactive state with image when not active', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive={false} onMouseEnter={onMouseEnterMock} onMouseLeave={onMouseLeaveMock} />
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('sample-film-title');
    const image = screen.getByAltText('Snatch');

    expect(filmCard).toHaveAttribute('data-active', 'false');
    expect(image).toBeInTheDocument();
  });
});
