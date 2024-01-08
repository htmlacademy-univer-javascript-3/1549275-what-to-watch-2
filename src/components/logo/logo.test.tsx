import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from './logo';

describe('Logo Component', () => {
  it('should render the logo link with the correct text and attributes', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveTextContent('WTW');
  });

  it('should render the logo letters', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoLetters = screen.getAllByTestId('logo-letter');

    expect(logoLetters).toHaveLength(3);
    expect(logoLetters[0]).toHaveTextContent('W');
    expect(logoLetters[1]).toHaveTextContent('T');
    expect(logoLetters[2]).toHaveTextContent('W');
  });

  it('should apply additional class name when provided', () => {
    render(
      <MemoryRouter>
        <Logo className="custom-logo-class" />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');

    expect(logoLink).toHaveClass('custom-logo-class');
  });
});
