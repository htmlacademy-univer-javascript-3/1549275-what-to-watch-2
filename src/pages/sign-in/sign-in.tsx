import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { login } from '../../store/api-actions';
import { ReducerName } from '../../types/reducer-name';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { errorHandle } from '../../services/error-handle';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

interface FormFieldProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFieldComponent = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ type, name, id, placeholder, label, value = '', onChange }, ref) => (
    <div className="sign-in__field">
      <input
        ref={ref}
        className="sign-in__input"
        required
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      <label className="sign-in__label visually-hidden" htmlFor={id}>
        {label}
      </label>
    </div>
  )
);

FormFieldComponent.displayName = 'FormField';

const FormField = memo(FormFieldComponent);

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(
    (state) => state[ReducerName.Authorzation].authorizationStatus
  );
  const error = useAppSelector((state) => state[ReducerName.Main].error);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!emailPattern.test(email)) {
        return errorHandle('Please enter a valid email address');
      }

      if (/[a-z]/i.test(password) && /[0-9]/.test(password)) {
        dispatch(login({ email: email, password: password }));
      } else {
        errorHandle('Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character');
      }
    },
    [dispatch, email, password]
  );


  const handleEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);
  const handlePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const pageTitle = useMemo(() => <h1 className="page-title user-page__title">Sign in</h1>, []);

  if (authStatus === AuthorizationStatus.Authorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head" isLoginPage>
        {pageTitle}
      </Header>

      <div className="sign-in user-page__content">
        <form onSubmit={handleSubmit} className="sign-in__form">
          {error && (
            <div className="sign-in__message">
              <p data-testid="error">{error}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <FormField
              type="email"
              name="user-email"
              id="user-email"
              placeholder="Email address"
              label="Email address"
              value={emailRef?.current?.value}
              onChange={handleEmail}
              ref={emailRef}
            />
            <FormField
              type="password"
              name="user-password"
              id="user-password"
              placeholder="Password"
              label="Password"
              value={passwordRef?.current?.value}
              ref={passwordRef}
              onChange={handlePassword}
            />
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" data-testid="signin-button" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export const SignIn = memo(SignInPage);
