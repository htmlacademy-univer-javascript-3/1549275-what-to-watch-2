import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Genre } from '../../types/genre';
import { ReducerName } from '../../types/reducer-name';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import films from '../../mocks/films';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import thunk from 'redux-thunk';
import { AddReviewForm } from './add-review-form';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('AddReviewForm Component', () => {
  const store = mockStore({
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Authorized,
      user: null,
    },
    [ReducerName.Film]: {
      film: mockFilm,
      reviews: [],
      similar: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      genreFilms: [],
      currentGenre: Genre.DefaultGenre,
      isFilmsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });

  it('should render the form elements correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddReviewForm filmId="1" />
        </Provider>
      </MemoryRouter>
    );

    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');
    const submitButton = screen.getByRole('button', { name: /Post/ });

    expect(ratingInputs).toHaveLength(10);
    expect(reviewTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should update rating and review text when user interacts with the form', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddReviewForm filmId="1" />
        </Provider>
      </MemoryRouter>
    );

    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');

    fireEvent.click(ratingInputs[0]);
    fireEvent.change(reviewTextarea, { target: { value: 'This is a review.' } });

    expect(ratingInputs[0]).toBeChecked();
    expect(reviewTextarea).toHaveValue('This is a review.');
  });

  it('should disable submit button when rating and review text are not set correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddReviewForm filmId="1" />
        </Provider>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Post' });

    expect(submitButton).toBeDisabled();

    fireEvent.click(screen.getByTestId('rating-1'));
    fireEvent.change(screen.getByTestId('review-text'), {
      target: { value: 'Short' },
    });

    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when rating and review text are set correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddReviewForm filmId="1" />
        </Provider>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Post' });

    fireEvent.click(screen.getByRole('radio', { name: /Rating 5/ }));
    fireEvent.change(screen.getByTestId('review-text'), {
      target: { value: 'test test test test test test test test test test test test test test test test test test test test' },
    });

    expect(submitButton).not.toBeDisabled();
  });
});
