import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Tabs } from './tabs';
import { Overview } from './tab-panels/overview';
import { Details as FilmDetails } from './tab-panels/details';
import { Reviews as FilmReviews } from './tab-panels/reviews';
import { Film } from '../../types/film';
import { TTabs, TabTypes } from '../../types/tabs';

interface FilmDescriptionProps {
  film: Film;
}

const FilmDescriptionComponent: FC<FilmDescriptionProps> = ({ film }) => {
  const [activeTab, setActiveTab] = useState<TTabs>(TabTypes.Overview);

  const handleTabClick = useCallback((tab: TTabs) => {
    setActiveTab(tab);
  }, []);

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabTypes.Overview:
        return <Overview film={film} />;
      case TabTypes.Details:
        return <FilmDetails film={film} />;
      case TabTypes.Reviews:
        return <FilmReviews />;
      default:
        return null;
    }
  }, [activeTab, film]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setActiveTab(TabTypes.Overview);
    }

    return () => {
      isMounted = false;
    };
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} active={activeTab} />

      {panel}
    </div>
  );
};

export const FilmDescription = memo(FilmDescriptionComponent);
