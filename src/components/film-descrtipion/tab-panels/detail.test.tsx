import { render, screen } from '@testing-library/react';
import { Details } from './details';
import films from '../../../mocks/films';

const mockFilm = films[0];

describe('FilmDetails Component', () => {
  it('should render film details correctly', () => {
    render(<Details film={mockFilm} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Released/)).toBeInTheDocument();
  });
});
