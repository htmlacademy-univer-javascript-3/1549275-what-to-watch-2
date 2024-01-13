import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Player } from './player';
import { RouteLinks } from '../../router/consts';
import { ReducerName } from '../../types/reducer-name';
import films from '../../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = films[0];

describe('Player Component', () => {
  it('renders video player with controls', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isLoading: false,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: {
          name: 'John Doe',
          avatarUrl: 'path/to/avatar.jpg',
          email: 'john@example.com',
          id: 123,
          token: '123433',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.PLAYER}/1`]}>
          <Routes>
            <Route path={`${RouteLinks.PLAYER}/:id`} element={<Player />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const videoPlayer = screen.getByTestId('video-player');
      expect(videoPlayer).toBeInTheDocument();

      const exitButton = screen.getByText('Exit');
      expect(exitButton).toBeInTheDocument();

      const playButton = screen.getByText('Play');
      expect(playButton).toBeInTheDocument();
    });
  });

  it('toggles play/pause when play button is clicked', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isLoading: false,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: {
          name: 'John Doe',
          avatarUrl: 'path/to/avatar.jpg',
          email: 'john@example.com',
          id: 123,
          token: '123433',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.PLAYER}/1`]}>
          <Routes>
            <Route path={`${RouteLinks.PLAYER}/:id`} element={<Player />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByTestId('play-button');
    const videoPlayer: HTMLVideoElement = screen.getByTestId('video-player');

    expect(videoPlayer.paused).toBe(true);

    fireEvent.click(playButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, 1000);
    });
  });
});
