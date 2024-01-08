import { describe } from 'vitest';
import films from '../../mock/films';
import {
  InitialState,
  initialState,
  films as filmsReducer,
  setGenre,
  getFilmsByGenre,
  getMoreFilms,
  resetFilmsCount
} from './films.slices';
import Catalog from '../../data/enums/catalog';
import { fetchFilmsAction } from '../api-action';


const mockFilm = films[0];
const mockFilms = films;
describe('films-reducer', ()=>{
  let state: InitialState;

  beforeAll(()=>{
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('setGenre', ()=> {
    it('should set genre', () => {
      expect(filmsReducer.reducer(state, { type: setGenre.type, payload: {genre: Catalog.Comedies}}).genre)
        .toEqual(Catalog.Comedies);
    });
  });

  describe('getFilmsByGenre', ()=> {
    it('should set films', () => {
      expect(filmsReducer.reducer(state, { type: getFilmsByGenre.type}).films)
        .toEqual([]);
    });
  });

  describe('getMoreFilms', ()=> {
    it('should add filmCount', () => {
      expect(filmsReducer.reducer(state, { type: getMoreFilms.type}).filmCount)
        .toBe(16);
    });
  });

  describe('resetFilmsCount', ()=> {
    it('should reset filmCount', () => {
      expect(filmsReducer.reducer(state, { type: resetFilmsCount.type}).filmCount)
        .toBe(8);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should set isLoading true on pending', () => {
      expect(filmsReducer.reducer(state, { type: fetchFilmsAction.pending.type, payload: mockFilm }).isFilmsDataLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(filmsReducer.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: mockFilm }).isFilmsDataLoading)
        .toEqual(false);
    });
    it('should set isLoading false on rejected', () => {
      expect(filmsReducer.reducer(state, { type: fetchFilmsAction.rejected.type, payload: mockFilm }).isFilmsDataLoading)
        .toEqual(false);
    });
    it('should set hasError true on rejected', () => {
      expect(filmsReducer.reducer(state, { type: fetchFilmsAction.rejected.type, payload: mockFilm }).hasError)
        .toEqual(true);
    });
    it('should load films on fulfilled', () => {
      expect(filmsReducer.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: mockFilms }).allFilms)
        .toEqual(mockFilms);
    });
  });
});
