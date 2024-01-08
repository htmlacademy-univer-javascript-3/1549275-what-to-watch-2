import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TTabs, TabTypes } from '../../../types/tabs';
interface TabsProps {
  active: TTabs;
  onClick?: (tab: TTabs) => void;
}

const TabsComponent: FC<TabsProps> = ({ active, onClick }) => {
  const handleTabClick = useCallback(
    (tab: TTabs) => {
      if (onClick) {
        onClick(tab);
      }
    },
    [onClick]
  );

  const tabs = Object.values(TabTypes);

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`film-nav__item ${
              tab === active ? 'film-nav__item--active' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <Link to="" className="film-nav__link">
              {tab}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Tabs = memo(TabsComponent);
