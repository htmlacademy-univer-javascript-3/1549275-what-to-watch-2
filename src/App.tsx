import React, { useEffect } from 'react';
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components/scroll-to-top';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from './hooks/store';
import { ReducerName } from './types/reducer-name';


const App: React.FC = () => {
  const error = useAppSelector((state) => state[ReducerName.Main].error);

  useEffect(() => {
    toast(error);
  }, [error]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
};

export default App;
