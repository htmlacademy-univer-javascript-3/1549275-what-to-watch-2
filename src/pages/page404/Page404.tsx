import React from 'react';
import { Link } from 'react-router-dom';
import LOCALE from './page404.locale';
import './page404.css';

const Page404: React.FC = () => (
  <div className='page404-container'>
    <h1>{LOCALE.TITLE}</h1>
    <Link to='/' className='link'>
      {LOCALE.LINK}
    </Link>
  </div>
);

export default Page404;
