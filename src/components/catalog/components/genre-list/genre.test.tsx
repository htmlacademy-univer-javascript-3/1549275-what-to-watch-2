import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Genre } from './genre';
import { ReducerName } from '../../../../types/reducer-name';
import { setGenre } from '../../../../store/actions';

const mockStore = configureMockStore([thunk]);

describe('Genre Component', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Action',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Action" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Action');

    expect(genreLink).toBeInTheDocument();
  });

  it('should handle click correctly', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Drama',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Drama" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Drama');
    fireEvent.click(genreLink);

    const actions = store.getActions();

    expect(actions).toEqual([setGenre('Drama')]);
  });

  it('should have active class if isActive is true', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Comedy',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Comedy" isActive />
        </Provider>
      </MemoryRouter>
    );

    const genreItem = screen.getByText('Comedy').closest('li');

    expect(genreItem).toHaveClass('catalog__genres-item--active');
  });
});
