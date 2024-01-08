import { IFilmPromo } from '../../data/abstractions/IFilmPromo';
import { NameSpace } from '../../data/constants/name-space';
import { State } from '../../data/types/store';

export const getPromo = (state: State): IFilmPromo | null => state[NameSpace.Promo].promo;
export const getPromoDataLoadingStatus = (state: State): boolean => state[NameSpace.Promo].isPromoDataLoading;
export const getPromoErrorStatus = (state: State): boolean => state[NameSpace.Promo].hasError;
