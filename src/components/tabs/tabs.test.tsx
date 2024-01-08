
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tabs, { Tab } from './tabs';
import { FILM_TABS } from '../../data/constants/film-tab';

describe('Tabs Component', () => {
  it('should render tabs correctly', () => {
    render(
      <MemoryRouter>
        <Tabs defaultActiveKey='1' items={FILM_TABS}>
          <Tab key='1'>
            <span>1TEST</span>
          </Tab>
          <Tab key='2'>
            <span>2TEST</span>
          </Tab>
          <Tab key='3'>
            <span>3TEST</span>
          </Tab>
        </Tabs>
      </MemoryRouter>
    );

    const overviewTab = screen.getByText('Overview');
    const detailsTab = screen.getByText('Details');
    const reviewsTab = screen.getByText('Reviews');
    const mainText = screen.getByText('1TEST');
    const secondText = screen.queryByText('2TEST');

    expect(overviewTab).toBeInTheDocument();
    expect(detailsTab).toBeInTheDocument();
    expect(reviewsTab).toBeInTheDocument();
    expect(mainText).toBeInTheDocument();
    expect(secondText).toBeNull();
  });
});
