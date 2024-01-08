import { Film } from './film';
import { Review } from './review';

export interface FilmReducerState {
  film: Film | null;
  reviews: Review[];
  similar: Film[];
  isLoading: boolean;
}
