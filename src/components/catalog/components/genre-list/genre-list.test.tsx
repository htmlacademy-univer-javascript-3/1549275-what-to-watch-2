import { render, screen } from '@testing-library/react';
import { GenreList } from './genre-list';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { ReducerName } from '../../../../types/reducer-name';
import { Genre } from '../../../../types/genre';

const mockStore = configureMockStore([thunk]);

const mockFilms = [
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Drama' },
  { id: 3, genre: 'Action' },
];

const initialState = {
  [ReducerName.Main]: {
    currentGenre: Genre.DefaultGenre,
    films: mockFilms,
  },
};

describe('GenreList Component', () => {
  it('should render all genres from genreList', () => {
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <GenreList />
        </Provider>
      </MemoryRouter>
    );

    const genres = screen.getAllByRole('listitem');

    expect(genres).toHaveLength(3);
  });
});

