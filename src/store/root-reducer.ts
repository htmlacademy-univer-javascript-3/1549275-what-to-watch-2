import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../data/constants/name-space';
import { film } from './film/film.slices';
import { userProcess } from './user/user.slices';
import { films } from './films/films.slices';
import { promo } from './promo/promo.slices';
import { favorite } from './favorite/favorite.slices';

export const rootReducer = combineReducers({
  [NameSpace.Film]: film.reducer,
  [NameSpace.Films]: films.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Promo]: promo.reducer,
  [NameSpace.Favorite]: favorite.reducer
});
