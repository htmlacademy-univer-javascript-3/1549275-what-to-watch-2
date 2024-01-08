import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import films from '../../mock/films';
import { createAPI } from '../../services/api';
import { State } from '../../data/types/store';
import thunk from 'redux-thunk';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import MyList from './my-list';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('MyList Component', () => {
  it('should render without errors with empty favoriteFilms', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Favorite]: {
        favoriteFilms: [],
        isFavoriteLoading: false
      }
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MyList />
        </Provider>
      </MemoryRouter>
    );

    const filmCountElement = screen.getByTestId('film-count');
    const filmCountValue = filmCountElement.textContent;

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add some films/i)).toBeInTheDocument();
    expect(filmCountElement).toBeInTheDocument();
    expect(filmCountValue).toBe('0');
  });

  it('should render without errors with favoriteFilms', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Favorite]: {
        favoriteFilms: films.slice(0, 3),
        isFavoriteLoading: false
      }
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MyList />
        </Provider>
      </MemoryRouter>
    );

    const filmCountElement = screen.getByTestId('film-count');
    const filmCountValue = filmCountElement.textContent;

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add some films/i)).toBeNull();
    expect(filmCountElement).toBeInTheDocument();
    expect(filmCountValue).toBe('3');
  });
});
