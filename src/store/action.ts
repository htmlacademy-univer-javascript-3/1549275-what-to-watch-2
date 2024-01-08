import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../data/enums/app-route';

export const redirectToRoute = createAction<AppRoute>('film/redirectToRoute');
