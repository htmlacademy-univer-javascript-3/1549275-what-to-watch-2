import React from 'react';
import { Link } from 'react-router-dom';
import LOCALE from './add-rewiew.locale';

type BreadcrumbsProps = {
  name: string;
  id: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ name, id }) => (
  <nav className="breadcrumbs">
    <ul className="breadcrumbs__list">
      <li className="breadcrumbs__item">
        <Link to={`/films/${id}`} className="breadcrumbs__link">
          {name}
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="breadcrumbs__link">
          {LOCALE.ADD_REWIEW}
        </a>
      </li>
    </ul>
  </nav>
);

export default Breadcrumbs;
