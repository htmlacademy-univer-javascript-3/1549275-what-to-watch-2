import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import films from '../mocks/films';
import reviews from '../mocks/reviews';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { setFavorite, checkAuth, fetchReviews, fetchFavoriteFilms, fetchFilm, fetchFilms, fetchPromo, fetchSimilar, login, logout, addReview } from './api-actions';
import { AuthorizationData } from '../types/authorization-data';

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;
  const mockAuthorizationData: AuthorizationData = { email: '123@gmail.com', password: '123' };

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

    await store.dispatch(checkAuth());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    mockAPI
      .onPost('/login')
      .reply(200, { token: 'token' });


    const store = mockStore();

    await store.dispatch(login(mockAuthorizationData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);

    const store = mockStore();

    await store.dispatch(logout());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilms.pending.type,
      fetchFilms.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromo());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromo.pending.type,
      fetchPromo.fulfilled.type
    ]);
  });

  it('should fetch film when GET /films/{id}', async () => {
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilm('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilm.pending.type,
      fetchFilm.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilar('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilar.pending.type,
      fetchSimilar.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviews('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviews.pending.type,
      fetchReviews.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData = {
      filmId: '1',
      comment: 'comment',
      rating: 8,
      backToFilm: () => null,
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
      status: true
    };

    mockAPI
      .onPost('/favorite/1/1')
      .reply(200);

    const store = mockStore();

    await store.dispatch(setFavorite(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      setFavorite.pending.type,
      setFavorite.fulfilled.type
    ]);
  });
});
