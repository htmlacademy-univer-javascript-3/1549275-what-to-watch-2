import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { IFilmData } from '../data/abstractions/IFilmData';
import { AuthData } from '../data/types/auth-data';
import { IUserData } from '../data/abstractions/IUserData';
import { dropToken, saveToken } from '../services/token';
import { AppRoute } from '../data/enums/app-route';
import { IFilmAllInfo } from '../data/abstractions/IFilmAllInfo';
import { IFilmPromo } from '../data/abstractions/IFilmPromo';
import { AppDispatch, State } from '../data/types/store';
import { IReview } from '../data/abstractions/IReview';
import {
  getFilms,
  checkAuth,
  logout,
  getFilm,
  getSimilarFilms,
  getReviewsFilm,
  getPromo,
  login
} from '../services/endpoints';

export const fetchFilmsAction = createAsyncThunk<
  IFilmData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/loadFilms',
    async (_arg, {extra: api}) => {
      const { data } = await api.get<IFilmData[]>(getFilms());
      return data;
    },
  );

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, { extra: api}) => {
      await api.get(checkAuth());
    },
  );

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({ login: email, password }, { dispatch, extra: api }) => {
      const {data: { token }} = await api.post<IUserData>(login(), { email, password });
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Root));
    },
  );

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, { extra: api }) => {
      await api.delete(logout());
      dropToken();
    },
  );

export const fetchFilmAction = createAsyncThunk<
  IFilmAllInfo,
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/loadFilm',
  async ({filmId}, { extra: api }) => {
    const { data } = await api.get<IFilmAllInfo>(getFilm(filmId));
    return data;
  });

export const fetchSimilarFilm = createAsyncThunk<
  IFilmData[],
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/loadSimilarFilms',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<IFilmData[]>(getSimilarFilms(filmId));
    return data;
  });

export const fetchReviewsFilm = createAsyncThunk<
  IReview[],
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/loadReviewsFilm',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<IReview[]>(getReviewsFilm(filmId));
    return data;
  });

export const fetchPromoAction = createAsyncThunk<
  IFilmPromo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/loadPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<IFilmPromo>(getPromo());
    return data;
  });

export const addReview = createAsyncThunk<
  void,
  { comment: string; rating: number; filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/comments/id', async ({ comment, rating, filmId }, { extra: api }) => {
  await api.post(`/comments/${filmId}`, { comment, rating });
});
