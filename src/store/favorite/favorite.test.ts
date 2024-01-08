import { describe } from 'vitest';
import films from '../../mock/films';
import { InitialState, favorite, initialState, resetFavoriteFilms } from './favorite.slices';
import { fetchFavoriteFilms } from '../api-action';

const mockFilm = films[0];

describe('favorite-reducer', ()=>{
  let state: InitialState;

  beforeAll(()=>{
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(favorite.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('resetFavoriteFilms', () => {
    it('should set resetFavoriteFilms false', () => {
      expect(favorite.reducer(state, { type: resetFavoriteFilms }).isFavoriteLoading)
        .toEqual(false);
    });
    it('should set reset favoriteFilms', () => {
      expect(favorite.reducer(state, { type: resetFavoriteFilms }).favoriteFilms)
        .toEqual([]);
    });
  });

  describe('fetchFavoriteFilms', () => {
    it('should set isLoading true on pending', () => {
      expect(favorite.reducer(state, { type: fetchFavoriteFilms.pending.type, payload: mockFilm }).isFavoriteLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      expect(favorite.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: mockFilm }).favoriteFilms)
        .toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(favorite.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: mockFilm }).isFavoriteLoading)
        .toEqual(false);
    });
    it('should set isLoading false on rejected', () => {
      expect(favorite.reducer(state, { type: fetchFavoriteFilms.rejected.type, payload: mockFilm }).isFavoriteLoading)
        .toEqual(false);
    });
    it('should reset films on rejected', () => {
      expect(favorite.reducer(state, { type: fetchFavoriteFilms.rejected.type, payload: mockFilm }).favoriteFilms)
        .toEqual([]);
    });
  });
});
