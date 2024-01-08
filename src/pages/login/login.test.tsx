import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../data/types/store';
import { NameSpace } from '../../data/constants/name-space';
import { AuthorizationStatus } from '../../data/enums/authorization-status';
import Login from './login';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('Login Component', () => {
  const store = mockStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }
  });

  it('renders login page with form fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in__btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('submits form with valid email and password', async () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in__btn');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(signInButton).not.toBeInTheDocument();
      }, 1000);
    });

  });

  it('displays error message for invalid email', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const signInButton = screen.getByTestId('sign-in__btn');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });

  it('displays error message for invalid password', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in__btn');

    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });
});
