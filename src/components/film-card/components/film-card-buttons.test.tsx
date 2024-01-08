import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { State } from '../../../types/state';
import { AuthorizationStatus } from '../../../types/authorization-status';
import { FilmCardButtons } from './film-card-buttons';
import { ReducerName } from '../../../types/reducer-name';
import { createAPI } from '../../../services/api';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('FilmCardButtons Component', () => {
  const storeAuthorized = mockStore({
    [ReducerName.Main]: {
      favoriteCount: 10,
    },
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Authorized,
    },
  });

  it('should render correctly when authorized', () => {
    render(
      <Provider store={storeAuthorized}>
        <MemoryRouter>
          <FilmCardButtons filmId="1" isFavorite reviewButton={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render the Play button when reviewButton is false', () => {
    render(
      <Provider store={storeAuthorized}>
        <MemoryRouter>
          <FilmCardButtons filmId="1" isFavorite reviewButton={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should render the Add review button when reviewButton is true', () => {
    render(
      <Provider store={storeAuthorized}>
        <MemoryRouter>
          <FilmCardButtons filmId="1" isFavorite reviewButton />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
