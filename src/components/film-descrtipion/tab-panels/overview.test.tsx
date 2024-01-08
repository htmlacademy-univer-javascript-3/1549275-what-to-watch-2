import { render, screen } from '@testing-library/react';
import { Overview } from './overview';
import films from '../../../mocks/films';

const mockFilm = films[0];


describe('Overview Component', () => {
  it('should render film overview correctly', () => {
    render(<Overview film={mockFilm} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
  });
});
