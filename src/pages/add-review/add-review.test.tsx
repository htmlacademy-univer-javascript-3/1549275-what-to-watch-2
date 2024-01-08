import { render, fireEvent, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { State } from '../../data/types/store';
import films from '../../mock/films';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import Catalog from '../../data/enums/catalog';
import { FILM_STEP } from '../../data/constants/film-step';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddReview from './add-review';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('AddReview Component', () => {
  const store = mockStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    [NameSpace.Film]: {
      film: mockFilm,
      reviewsFilm: [],
      similarFilms: [],
      isFilmDataLoading: false,
      isSimilarFilmsDataLoading: false,
      isReviewsFilmDataLoading: false,
      hasError: false
    },
    [NameSpace.Films]: {
      films: [],
      genre: Catalog.All,
      allFilms: films,
      filmCount: FILM_STEP,
      allFilmCount: films.length,
      isFilmsDataLoading: false,
      hasError: false,
    },
    [NameSpace.Promo]: {
      promo: mockFilm,
      isPromoDataLoading: false,
      hasError: false
    },
    [NameSpace.Favorite]: {
      favoriteFilms: [],
      isFavoriteLoading: false
    }
  });

  it('should render the form elements correctly', () => {
    render(
      <MemoryRouter initialEntries={['films/1/rewiew']}>
        <Provider store={store}>
          <AddReview />
        </Provider>
      </MemoryRouter>
    );

    const ratingInputs = screen.getAllByRole('radio');
    const reviewTextarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Post/ });

    expect(ratingInputs).toHaveLength(10);
    expect(reviewTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should update rating and review text when user interacts with the form', () => {
    render(
      <MemoryRouter initialEntries={['films/1/rewiew']}>
        <Provider store={store}>
          <AddReview />
        </Provider>
      </MemoryRouter>
    );

    const ratingInputs = screen.getAllByRole('radio');
    const reviewTextarea = screen.getByTestId('review-text');

    fireEvent.click(ratingInputs[0]);
    fireEvent.change(reviewTextarea, { target: { value: 'This is a review.' } });

    expect(ratingInputs[0]).toBeChecked();
    expect(reviewTextarea).toHaveValue('This is a review.');
  });

  it('should disable submit button when rating and review text are not set correctly', () => {
    render(
      <MemoryRouter initialEntries={['films/1/rewiew']}>
        <Provider store={store}>
          <AddReview />
        </Provider>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Post' });

    expect(submitButton).toBeDisabled();

    fireEvent.click(screen.getByTestId('star-1'));
    fireEvent.change(screen.getByTestId('review-text'), {
      target: { value: 'Short' },
    });

    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when rating and review text are set correctly', () => {
    render(
      <MemoryRouter initialEntries={['films/1/rewiew']}>
        <Provider store={store}>
          <AddReview />
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
