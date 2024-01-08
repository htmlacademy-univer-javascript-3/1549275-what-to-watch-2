import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducer-name';
import { dropToken, saveToken } from '../../services/token';
import { checkAuth, login, logout } from '../api-actions';
import { AuthorizationReducerState } from '../../types/authorization-reducer-state';
import { AuthorizationStatus } from '../../types/authorization-status';

const initialState: AuthorizationReducerState = {
  authorizationStatus: AuthorizationStatus.Idle,
  user: null,
};

export const authorizationReducer = createSlice({
  name: ReducerName.Authorzation,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.Unauthorized;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unauthorized;
      });
  },
});
