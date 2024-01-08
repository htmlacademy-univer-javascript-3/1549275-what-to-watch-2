import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe } from 'vitest';
import AddReview from './add-review';
import FilmCard from './film-card';
import { State } from '../../data/types/store';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import { Provider } from 'react-redux';
import FullScreen from './full-screen';
import PausePlayer from './pause-player';
import PlayPlayer from './play-player';
import Play from './play';
import ShowMore from './show-more';

const mockStore = configureMockStore<State>([thunk]);

describe('Button Components', () => {
  describe('AddReview', () => {
    it('should render without errors', () => {
      render(
        <MemoryRouter>
          <AddReview id="1" />
        </MemoryRouter>
      );

      expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    });
  });

  describe('FilmCard', () => {
    it('should render without errors', () => {
      const store = mockStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth
        },
        [NameSpace.Favorite]: {
          favoriteFilms: [],
          isFavoriteLoading: false
        }
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <FilmCard id="1" />
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/My list/i)).toBeInTheDocument();
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });

  describe('FullScreen', () => {
    it('should render without errors', () => {
      const mockHandleClick = vi.fn();
      render(
        <MemoryRouter>
          <FullScreen handleClick={mockHandleClick} />
        </MemoryRouter>
      );
      const fullScreenButton = screen.getByRole('button');

      fireEvent.click(fullScreenButton);

      expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
      expect(mockHandleClick).toHaveBeenCalled();
    });
  });

  describe('PausePlayer', () => {
    it('should render without errors', () => {
      const mockHandleClick = vi.fn();
      render(
        <MemoryRouter>
          <PausePlayer handleClick={mockHandleClick} />
        </MemoryRouter>
      );
      const fullScreenButton = screen.getByRole('button');

      fireEvent.click(fullScreenButton);

      expect(screen.getByText(/Pause/i)).toBeInTheDocument();
      expect(mockHandleClick).toHaveBeenCalled();
    });
  });

  describe('PlayPlayer', () => {
    it('should render without errors', () => {
      const mockHandleClick = vi.fn();
      render(
        <MemoryRouter>
          <PlayPlayer handleClick={mockHandleClick} />
        </MemoryRouter>
      );
      const fullScreenButton = screen.getByRole('button');

      fireEvent.click(fullScreenButton);

      expect(screen.getByText(/Play/i)).toBeInTheDocument();
      expect(mockHandleClick).toHaveBeenCalled();
    });
  });

  describe('ShowMore', () => {
    it('should render without errors', () => {
      const mockHandleClick = vi.fn();
      render(
        <MemoryRouter>
          <ShowMore handleClick={mockHandleClick} />
        </MemoryRouter>
      );
      const fullScreenButton = screen.getByRole('button');

      fireEvent.click(fullScreenButton);

      expect(screen.getByText(/Show more/i)).toBeInTheDocument();
      expect(mockHandleClick).toHaveBeenCalled();
    });
  });

  describe('Play', () => {
    it('should render without errors', () => {
      render(
        <MemoryRouter>
          <Play id="1" />
        </MemoryRouter>
      );

      expect(screen.getByText(/Play/i)).toBeInTheDocument();
    });
  });
});
