import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';

describe('Footer Component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2023 What to watch Ltd./i)).toBeInTheDocument();
  });
});
