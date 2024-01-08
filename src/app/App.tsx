import React from 'react';
import './main.css';
import AppRouter from '../components/routers';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { checkAuthAction, fetchFilmsAction, fetchPromoAction } from '../store/api-action';
import HistoryRouter from '../components/routers/history-router';
import browserHistory from '../utils/browser-history';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoAction());

const App: React.FC = () => (
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <AppRouter />
    </HistoryRouter>
  </Provider>
);

export default App;
