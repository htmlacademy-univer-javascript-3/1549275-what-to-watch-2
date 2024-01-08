import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['/comments/id/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
      thunk: {
        extraArgument: api,
      },
    }),
});
