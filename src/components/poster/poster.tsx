import React, { memo } from 'react';

interface PosterProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const FilmPosterComponent: React.FC<PosterProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
}) => (
  <div className={`film-card__poster ${className}`}>
    <img src={src} alt={alt} width={width} height={height} />
  </div>
);

export const Poster = memo(FilmPosterComponent);
