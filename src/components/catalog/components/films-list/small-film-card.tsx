import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '../../../../router/consts';
import { VideoPlayer } from '../../../videoplayer';
import { Film } from '../../../../types/film';

interface SmallFilmCardProps {
  film: Film;
  isActive?: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const SmallFilmCardComponent: React.FC<SmallFilmCardProps> = ({
  film,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();
  const { id, name, previewImage, previewVideoLink } = film;

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(id);
  }, [id, onMouseEnter]);

  const handleClick = () => {
    navigate(`${RouteLinks.FILMS}/${id}`);
  };

  return (
    <article
      className={'small-film-card catalog__films-card'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isActive}
      data-testid="sample-film-title"
      onClick={handleClick}
    >
      <div className="small-film-card__image">
        {isActive ? (
          <VideoPlayer src={previewVideoLink} poster={previewImage} />
        ) : (
          <img src={previewImage} alt={name} />
        )}
      </div>
      <h3 className="small-film-card__title">{name}</h3>
    </article>
  );
};

export const SmallFilmCard = React.memo(SmallFilmCardComponent);
