import React from 'react';
import './main.css';
import AppRouter from '../components/routers';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { checkAuthAction, fetchFilmsAction, fetchPromoAction } from '../store/api-action';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoAction());

const App: React.FC = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
