import React from 'react';
import Logo from '../../components/logo';
import Breadcrumbs from './breadcrumbs';
import UserBlock from '../../components/user-block';
import { IFilmAllInfo } from '../../data/abstractions/IFilmAllInfo';

type HeaderProps = {
  film: IFilmAllInfo;
}

const Header: React.FC<HeaderProps> = ({ film }) => (
  <div className="film-card__header">
    <div className="film-card__bg">
      <img src={film.backgroundImage} alt={film.name} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <header className="page-header">
      <Logo />
      <Breadcrumbs name={film.name} id={film.id} />
      <UserBlock />
    </header>

    <div className="film-card__poster film-card__poster--small">
      <img
        src={film.posterImage}
        alt={film.name}
        width="218"
        height="327"
      />
    </div>
  </div>
);

const HeaderMemo = React.memo(Header);

export default HeaderMemo;
