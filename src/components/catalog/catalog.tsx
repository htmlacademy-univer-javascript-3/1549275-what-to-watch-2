import React, { useCallback, useState } from 'react';
import { GenreList } from './components/genre-list';
import { FilmsList } from './components/films-list';
import { Button } from '../button';
import { useAppSelector } from '../../hooks/store';
import { ReducerName } from '../../types/reducer-name';
import { Film } from '../../types/film';

const DEFAULT_LIST_LENGTH = 8;

interface CatalogProps {
  withoutGenre?: boolean;
  withoutButton?: boolean;
  listLength?: number;
  films?: Film[];
}

const CatalogComponent: React.FC<CatalogProps> = ({
  withoutGenre = false,
  withoutButton = false,
  listLength,
  films,
}) => {
  const stateGenreFilms = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const [maxLength, setMaxLength] = useState(listLength || DEFAULT_LIST_LENGTH);

  const handleClick = useCallback(()=>{
    setMaxLength((prev) => prev + DEFAULT_LIST_LENGTH);
  },[]);

  const showButton = !withoutButton && stateGenreFilms.length >= maxLength;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {!withoutGenre ? <GenreList /> : null}

      <FilmsList maxLength={maxLength} films={films} />

      {showButton ? (
        <div className="catalog__more">
          <Button label="Show more" className="catalog__button" type="button" onClick={handleClick}/>
        </div>
      ) : null}
    </section>
  );
};

export const Catalog = React.memo(CatalogComponent);
