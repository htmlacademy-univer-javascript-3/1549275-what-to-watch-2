import React from 'react';
import { Link } from 'react-router-dom';
import { RouteLinks } from '../../router/consts';

interface LogoProps {
  className?: string;
}

const LogoComponent: React.FC<LogoProps> = ({ className }) => (
  <div data-testid="logo" className="logo">
    <Link data-testid="logo-link" className={`logo__link ${className ? className : ''}`} to={RouteLinks.MAIN}>
      <span data-testid="logo-letter" className="logo__letter logo__letter--1">W</span>
      <span data-testid="logo-letter" className="logo__letter logo__letter--2">T</span>
      <span data-testid="logo-letter" className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export const Logo = React.memo(LogoComponent);
