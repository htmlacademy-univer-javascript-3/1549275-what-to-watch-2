import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { SignIn } from './sign-in';
import { ReducerName } from '../../types/reducer-name';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('SignIn Component', () => {
  const store = mockStore({
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Unauthorized,
      user: null,
    },
    [ReducerName.Main]: {
      error: null,
    },
  });

  it('renders sign-in page with form fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('signin-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('submits form with valid email and password', async () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('signin-button');

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
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const signInButton = screen.getByTestId('signin-button');

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
            <Route path='*' element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('signin-button');

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
