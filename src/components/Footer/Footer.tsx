import React from 'react';
import { Logo } from '../logo';

const FooterComponent: React.FC = () => (
  <footer className="page-footer">
    <Logo className='logo__link--light' />

    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export const Footer = React.memo(FooterComponent);
