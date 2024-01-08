import { render, screen } from '@testing-library/react';
import { Tabs } from './tabs';
import { MemoryRouter } from 'react-router-dom';

describe('Tabs Component', () => {
  it('should render tabs correctly', () => {
    render(
      <MemoryRouter>
        <Tabs active="Overview" />
      </MemoryRouter>
    );

    const overviewTab = screen.getByText('Overview');
    const detailsTab = screen.getByText('Details');
    const reviewsTab = screen.getByText('Reviews');

    expect(overviewTab).toBeInTheDocument();
    expect(detailsTab).toBeInTheDocument();
    expect(reviewsTab).toBeInTheDocument();
  });
});
