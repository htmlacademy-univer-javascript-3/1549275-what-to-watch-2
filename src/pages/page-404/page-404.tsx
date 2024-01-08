import React from 'react';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { RouteLinks } from '../../router/consts';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="user-page">
    <Header className="user-page__head">
      <h1 className="page-title user-page__title">404 Not Found</h1>
    </Header>
    <div className="sign-in user-page__content">
      <div className="sign-in__submit">
        <Link
          className="sign-in__btn"
          style={{textDecoration: 'none'}}
          to={RouteLinks.MAIN}
        >
          На главную
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);
export const Page404 = React.memo(NotFoundPage);
