import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner Component', () => {
  it('should render the spinner with the default class', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-container');
  });

  it('should render the spinner with the full display class when fullDisplay is true', () => {
    render(<Spinner view='display' />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('spinner-display');
  });
});
