import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchFavoriteFilms, fetchFilms, fetchPromo } from './store/api-actions';
import './styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());
store.dispatch(checkAuth());
store.dispatch(fetchFavoriteFilms());
store.dispatch(fetchPromo());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
