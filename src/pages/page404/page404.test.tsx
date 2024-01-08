import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page404 from './page404';

describe('Page404 Component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );

    expect(screen.getByText(/Ошибка 404. Страница не существует./i)).toBeInTheDocument();
  });
});
