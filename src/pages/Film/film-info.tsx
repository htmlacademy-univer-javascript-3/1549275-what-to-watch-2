import React from 'react';
import Tabs, { Tab } from '../../components/tabs/tabs';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import { FILM_TABS } from '../../data/constants/film-tab';
import { IFilmAllInfo } from '../../data/abstractions/IFilmAllInfo';
import { IReview } from '../../data/abstractions/IReview';

type FilmInfoProps = {
  film: IFilmAllInfo;
  reviewsFilm: IReview[];
}

const FilmInfo: React.FC<FilmInfoProps> = ({ film, reviewsFilm }) => (
  <div className="film-card__wrap film-card__translate-top">
    <div className="film-card__info">
      <div className="film-card__poster film-card__poster--big">
        <img
          src={film.posterImage}
          alt={film.name}
          width="218"
          height="327"
        />
      </div>
      <div className="film-card__desc">
        <Tabs defaultActiveKey='1' items={FILM_TABS}>
          <Tab key='1'>
            <Overview {...film} />
          </Tab>
          <Tab key='2'>
            <Details {...film} />
          </Tab>
          <Tab key='3'>
            <Reviews reviews={reviewsFilm} />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
);

export default FilmInfo;
