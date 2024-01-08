import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../data/constants/name-space';
import { IFilmPromo } from '../../data/abstractions/IFilmPromo';
import { fetchPromoAction } from '../api-action';

export type InitialState = {
  promo: IFilmPromo | null;
  isPromoDataLoading: boolean;
  hasError: boolean;
}

export const initialState: InitialState = {
  promo: null,
  isPromoDataLoading: false,
  hasError: false
};

export const promo = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state)=> {
        state.isPromoDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action)=> {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
      })
      .addCase(fetchPromoAction.rejected, (state)=> {
        state.isPromoDataLoading = false;
        state.hasError = true;
      });
  }
});
