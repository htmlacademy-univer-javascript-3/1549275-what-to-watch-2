import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoadingScreen from './loading-screen';

describe('LoadingScreen Component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <LoadingScreen />
      </MemoryRouter>
    );

    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });
});
