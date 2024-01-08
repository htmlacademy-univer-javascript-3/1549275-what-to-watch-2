
import { IFilmData } from '../../data/abstractions/IFilmData';
import { NameSpace } from '../../data/constants/name-space';
import { State } from '../../data/types/store';

export const getFavoriteFilms = (state: State): IFilmData[] => state[NameSpace.Favorite].favoriteFilms;
export const getFavoriteFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isFavoriteLoading;

