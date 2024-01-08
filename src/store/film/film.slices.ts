import { createSlice } from '@reduxjs/toolkit';
import { IFilmAllInfo } from '../../data/abstractions/IFilmAllInfo';
import { IFilmData } from '../../data/abstractions/IFilmData';
import { IReview } from '../../data/abstractions/IReview';
import { NameSpace } from '../../data/constants/name-space';
import { fetchFilmAction, fetchReviewsFilm, fetchSimilarFilm } from '../api-action';

type InitialState = {
  film: IFilmAllInfo | null;
  similarFilms: IFilmData[];
  reviewsFilm: IReview[];
  isFilmDataLoading: boolean;
  isSimilarFilmsDataLoading: boolean;
  isReviewsFilmDataLoading: boolean;
  hasError: boolean;
}

const initialState: InitialState = {
  film: null,
  similarFilms: [],
  reviewsFilm: [],
  isFilmDataLoading: false,
  isSimilarFilmsDataLoading: false,
  isReviewsFilmDataLoading: false,
  hasError: false
};

export const film = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    resetFilm: (state) => {
      state.film = null;
      state.similarFilms = [];
      state.reviewsFilm = [];
      state.isFilmDataLoading = false;
      state.isReviewsFilmDataLoading = false;
      state.isSimilarFilmsDataLoading = false;
      state.hasError = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state)=> {
        state.isFilmDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action)=> {
        state.film = action.payload;
        state.isFilmDataLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state)=> {
        state.isFilmDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchSimilarFilm.pending, (state)=> {
        state.isSimilarFilmsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSimilarFilm.fulfilled, (state, action)=> {
        state.similarFilms = action.payload;
        state.isSimilarFilmsDataLoading = false;
      })
      .addCase(fetchSimilarFilm.rejected, (state)=> {
        state.isSimilarFilmsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchReviewsFilm.pending, (state)=> {
        state.isReviewsFilmDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchReviewsFilm.fulfilled, (state, action)=> {
        state.reviewsFilm = action.payload;
        state.isReviewsFilmDataLoading = false;
      })
      .addCase(fetchReviewsFilm.rejected, (state)=> {
        state.isReviewsFilmDataLoading = false;
        state.hasError = true;
      });
  }
});

export const { resetFilm } = film.actions;
