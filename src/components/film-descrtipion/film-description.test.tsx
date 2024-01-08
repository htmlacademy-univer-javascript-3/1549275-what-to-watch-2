import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { FilmDescription } from './film-description';
import { ReducerName } from '../../types/reducer-name';
import films from '../../mocks/films';
import { TabTypes } from '../../types/tabs';

const mockStore = configureMockStore();

const mockFilm = films[0];

describe('FilmDescription Component', () => {
  it('should render tabs and the default panel', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmDescription film={mockFilm} />
        </MemoryRouter>
      </Provider>
    );

    const tabs = Object.values(TabTypes);

    for (const tab of tabs) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });
});
