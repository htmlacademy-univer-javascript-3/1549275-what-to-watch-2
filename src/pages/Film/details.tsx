import React, { ReactNode } from 'react';
import LOCALE from './film.locale';
import { IFilmAllInfo } from '../../data/abstractions/IFilmAllInfo';
import { convertTimeToString } from '../../utils/convert-time-to-string';

const Item: React.FC<{ name: string; value: ReactNode }> = ({ name, value }) => (
  <p className="film-card__details-item">
    <strong className="film-card__details-name">{name}</strong>
    <span className="film-card__details-value">{value}</span>
  </p>
);

const Details: React.FC<IFilmAllInfo> = ({ director, starring, runTime, genre, released }) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <Item name={LOCALE.Director} value={director} />
      <Item
        name={LOCALE.Starring}
        value={
          starring.map((star, index) => (
            <>
              {`${star}${index !== starring.length - 1 ? ',' : ''}`}{index !== starring.length - 1 ? <br /> : null}
            </>
          ))
        }
      />
    </div>

    <div className="film-card__text-col">
      <Item name={LOCALE.RUN_TIME} value={convertTimeToString(runTime)} />
      <Item name={LOCALE.Genre} value={genre} />
      <Item name={LOCALE.Released} value={released} />
    </div>
  </div>
);

export default Details;
