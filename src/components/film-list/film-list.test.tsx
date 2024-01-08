import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import films from '../../mock/films';
import FilmList from './film-list';

describe('Film List Component', () => {
  it('should render without errors with film list', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={films} />
      </MemoryRouter>
    );

    const filmsList = screen.queryAllByTestId('small-film-card');

    expect(filmsList).toHaveLength(films.length);
  });

  it('should render without errors with empty film list', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={[]} />
      </MemoryRouter>
    );

    const filmsList = screen.queryAllByTestId('small-film-card');

    expect(filmsList).toHaveLength(0);
  });
});
