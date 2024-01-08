import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import films from '../mock/films';
import reviews from '../mock/reviews';
import { AuthData } from '../data/types/auth-data';
import { State } from '../data/types/store';
import {
  addReview,
  changeStatusFilms,
  checkAuthAction,
  fetchFavoriteFilms,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchReviewsFilm,
  fetchSimilarFilm,
  loginAction,
  logoutAction
} from './api-action';
import { redirectToRoute } from './action';

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;
  const mockAuthorizationData: AuthData = { login: '123@gmail.com', password: '123' };

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);


  it('authorization status is Auth when server returned 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    mockAPI
      .onPost('/login')
      .reply(200, { token: 'token' });


    const store = mockStore();

    await store.dispatch(loginAction(mockAuthorizationData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);

    const store = mockStore();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should fetch film when GET /films/{id}', async () => {
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction({filmId: '1'}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilm({filmId: '1'}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarFilm.pending.type,
      fetchSimilarFilm.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsFilm({filmId: '1'}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsFilm.pending.type,
      fetchReviewsFilm.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData = {
      filmId: '1',
      comment: 'comment',
      rating: 8,
    };

    mockAPI
      .onPost(`/comments/${postData.filmId}`, {
        comment: postData.comment,
        rating: postData.rating
      })
      .reply(200);

    const store = mockStore();

    await store.dispatch(addReview(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReview.pending.type,
      addReview.fulfilled.type
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type
    ]);
  });

  it('POST /favorite/{filmId}/{status}', async () => {
    const postData = {
      filmId: '1',
      status: 1 as const
    };

    mockAPI
      .onPost('/favorite/1/1')
      .reply(200);

    const store = mockStore();

    await store.dispatch(changeStatusFilms(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      changeStatusFilms.pending.type,
      changeStatusFilms.fulfilled.type
    ]);
  });
});
