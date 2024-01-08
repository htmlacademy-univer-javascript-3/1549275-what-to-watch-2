import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import UserBlock from './user-block';
describe('PrivateRoute', () => {
  const mockStore = configureMockStore([]);

  it('should render public route when user is not authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).toBeNull();
  });

  it('should render private route when user is authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).toBeNull();
  });
});
