import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilmData } from '../../data/abstractions/IFilmData';
import { FILM_STEP } from '../../data/constants/film-step';
import Catalog from '../../data/enums/catalog';
import { NameSpace } from '../../data/constants/name-space';
import genreDictionary from '../../utils/genre-dictionary';
import { fetchFilmsAction } from '../api-action';

type InitialState = {
  genre: Catalog;
  films: IFilmData[];
  allFilms: IFilmData[];
  filmCount: number;
  allFilmCount: number;
  isFilmsDataLoading: boolean;
  hasError: boolean;
}

const initialState: InitialState = {
  genre: Catalog.All,
  films: [],
  allFilms: [],
  filmCount: FILM_STEP,
  allFilmCount: 0,
  isFilmsDataLoading: false,
  hasError: false,
};

export const films = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{genre: Catalog}>) => {
      state.genre = action.payload.genre;
    },
    getFilmsByGenre: (state) => {
      state.films = state.allFilms.filter((f)=> genreDictionary[state.genre].includes(f.genre)).slice(0, state.filmCount);
      state.allFilmCount = state.allFilms.filter((f)=> genreDictionary[state.genre].includes(f.genre)).length;
    },
    getMoreFilms: (state) => {
      state.filmCount = state.filmCount + FILM_STEP;
    },
    resetFilmsCount: (state) => {
      state.filmCount = FILM_STEP;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state)=> {
        state.isFilmsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action)=> {
        state.allFilms = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state)=> {
        state.isFilmsDataLoading = false;
        state.hasError = true;
      });
  }
});

export const { resetFilmsCount, getMoreFilms, getFilmsByGenre, setGenre } = films.actions;
