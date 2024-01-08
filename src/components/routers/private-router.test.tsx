import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import PrivateRoute from './private-router';

describe('PrivateRoute', () => {
  const mockStore = configureMockStore([]);

  it('should render public route when user is not authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<h1>public</h1>} />
            <Route path="/private" element={<PrivateRoute><h1>private</h1></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/public/i)).toBeInTheDocument();
    expect(screen.queryByText(/private/i)).not.toBeInTheDocument();
  });

  it('should render private route when user is authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/login" element={<h1>public</h1>} />
            <Route path="/private" element={<PrivateRoute><h1>private</h1></PrivateRoute>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/private/i)).toBeInTheDocument();
    expect(screen.queryByText(/public/i)).not.toBeInTheDocument();
  });
});
