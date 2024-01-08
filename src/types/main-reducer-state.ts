import { Film } from './film';

export interface MainReducerState {
  films: Film[];
  genreFilms: Film[];
  currentGenre: string;
  isFilmsLoading: boolean;
  error: null | string;
  promo: null | Film;
  favoriteFilms: Film[];
  favoriteCount: number;
  isPromoLoading: boolean;
}
