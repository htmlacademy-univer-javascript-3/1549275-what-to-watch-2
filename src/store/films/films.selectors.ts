import { IFilmData } from '../../data/abstractions/IFilmData';
import { NameSpace } from '../../data/constants/name-space';
import Catalog from '../../data/enums/catalog';
import { State } from '../../data/types/store';

export const getFilms = (state: State): IFilmData[] => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isFilmsDataLoading;
export const getFilmsErrorStatus = (state: State): boolean => state[NameSpace.Films].hasError;
export const getGenre = (state: State): Catalog => state[NameSpace.Films].genre;
export const getAllFilmCount = (state: State): number => state[NameSpace.Films].allFilmCount;
export const getFilmCount = (state: State): number => state[NameSpace.Films].filmCount;
