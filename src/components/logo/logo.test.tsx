import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './logo';

describe('Logo Component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByText(/T/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/W/i)).toHaveLength(2);
  });
});
