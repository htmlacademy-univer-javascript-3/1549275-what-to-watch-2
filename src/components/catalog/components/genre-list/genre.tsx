import React, { FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/store';
import { setGenre } from '../../../../store/actions';

interface GenreProps {
  genre: string;
  isActive: boolean;
}
const GenreComponent: React.FC<GenreProps> = ({ genre, isActive }) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (event: FormEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      dispatch(setGenre(genre));
    },
    [dispatch, genre]
  );

  return (
    <li
      className={`catalog__genres-item catalog__genres-item${
        isActive ? '--active' : ''
      }`}
    >
      <Link to="#" className="catalog__genres-link" onClick={handleClick}>
        {genre}
      </Link>
    </li>
  );
};

export const Genre = React.memo(GenreComponent);
