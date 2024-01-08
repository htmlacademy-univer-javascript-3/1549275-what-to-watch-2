import { FC } from 'react';

interface SpinnerProps {
  view?: 'display'| 'container';
}

export const Spinner: FC<SpinnerProps> = ({ view = 'container' }) => (
  <div data-testid="spinner" className={`spinner-${view}`}>
    <div className="spinner" />
  </div>
);
