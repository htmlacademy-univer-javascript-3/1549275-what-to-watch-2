import { describe } from 'vitest';
import { InitialState, film, initialState } from './film.slices';
import films from '../../mock/films';
import reviews from '../../mock/reviews';
import { fetchFilmAction, fetchReviewsFilm, fetchSimilarFilm } from '../api-action';

const mockFilm = films[0];
const mockFilms = films;
const mockReviews = reviews;

describe('film-reducer', ()=>{
  let state: InitialState;

  beforeAll(()=>{
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(film.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('fetchFilmAction', () => {
    it('should set isLoading on pending', () => {
      expect(film.reducer(state, { type: fetchFilmAction.pending.type, payload: mockFilm }).isFilmDataLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      expect(film.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: mockFilm }).film)
        .toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(film.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: mockFilm }).isFilmDataLoading)
        .toEqual(false);
    });
  });

  describe('fetchSimilarFilm', () => {
    it('should set isLoading on pending', () => {
      expect(film.reducer(state, { type: fetchSimilarFilm.pending.type, payload: mockFilm }).isSimilarFilmsDataLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(film.reducer(state, { type: fetchSimilarFilm.fulfilled.type, payload: mockFilm }).isSimilarFilmsDataLoading)
        .toEqual(false);
    });
    it('should load similar films on fulfilled', () => {
      expect(film.reducer(state, { type: fetchSimilarFilm.fulfilled.type, payload: mockFilms }).similarFilms)
        .toEqual(mockFilms);
    });
  });

  describe('fetchReviews test', () => {
    it('should set isLoading on pending', () => {
      expect(film.reducer(state, { type: fetchReviewsFilm.pending.type, payload: mockFilm }).isReviewsFilmDataLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(film.reducer(state, { type: fetchReviewsFilm.fulfilled.type, payload: mockFilm }).isReviewsFilmDataLoading)
        .toEqual(false);
    });
    it('should load reviews on fulfilled', () => {
      expect(film.reducer(state, { type: fetchReviewsFilm.fulfilled.type, payload: mockReviews }).reviewsFilm)
        .toMatchObject(mockReviews);
    });
  });
});
