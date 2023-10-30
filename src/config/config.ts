export const filmData = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  promoDate: '2014',
};

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOW'
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id/:info',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Genre = ':genre',
}

export enum FilmRoute {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

export enum HeaderStyleType {
  Film = 'film-card__head',
  User = 'user-page__head',
  Unset = '',
}