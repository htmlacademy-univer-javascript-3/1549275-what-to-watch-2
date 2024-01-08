import { createSlice } from '@reduxjs/toolkit';
import { IFilmData } from '../../data/abstractions/IFilmData';
import { NameSpace } from '../../data/constants/name-space';
import { fetchFavoriteFilms } from '../api-action';

export type InitialState = {
  favoriteFilms: IFilmData[];
  isFavoriteLoading: boolean;
}

export const initialState: InitialState = {
  favoriteFilms: [],
  isFavoriteLoading: false
};

export const favorite = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    resetFavoriteFilms: (state) => {
      state.isFavoriteLoading = false;
      state.favoriteFilms = [];
    }
  },
  extraReducers(builder){
    builder
      .addCase(fetchFavoriteFilms.pending,(state)=> {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled,(state, action)=> {
        state.isFavoriteLoading = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected,(state)=> {
        state.favoriteFilms = [];
        state.isFavoriteLoading = false;
      });
  }
});

export const { resetFavoriteFilms } = favorite.actions;
