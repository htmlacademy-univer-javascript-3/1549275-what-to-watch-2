import { describe } from 'vitest';
import { InitialState, initialState, promo } from './promo.slices';
import { fetchPromoAction } from '../api-action';
import films from '../../mock/films';

const mockFilm = films[0];

describe('promo-reducer', ()=>{
  let state: InitialState;

  beforeAll(()=>{
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(promo.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('fetchPromoAction', () => {
    it('should set isLoading on pending', () => {
      expect(promo.reducer(state, { type: fetchPromoAction.pending.type, payload: mockFilm }).isPromoDataLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      expect(promo.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: mockFilm }).promo)
        .toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(promo.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: mockFilm }).isPromoDataLoading)
        .toEqual(false);
    });
  });
});
