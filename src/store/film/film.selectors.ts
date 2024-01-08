import { IFilmAllInfo } from '../../data/abstractions/IFilmAllInfo';
import { IFilmData } from '../../data/abstractions/IFilmData';
import { IReview } from '../../data/abstractions/IReview';
import { NameSpace } from '../../data/constants/name-space';
import { State } from '../../data/types/store';

export const getFilm = (state: State): IFilmAllInfo | null => state[NameSpace.Film].film;
export const getSimilarFilms = (state: State): IFilmData[] => state[NameSpace.Film].similarFilms;
export const getReviewsFilm = (state: State): IReview[] => state[NameSpace.Film].reviewsFilm;
export const getFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.Film].isFilmDataLoading;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Film].isSimilarFilmsDataLoading;
export const getReviewsFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Film].isReviewsFilmDataLoading;
export const getFilmErrorStatus = (state: State): boolean => state[NameSpace.Film].hasError;
