import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

import { useDarkMode } from '../hooks/useDarkMode';

import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => {
  const mode = useDarkMode((state) => state.mode);

  const activeMode = useMemo(() => {
    return mode ? 'dark' : 'light';
  }, [mode]);

  return (
    <ToastContainer
      theme={activeMode}
      position='bottom-right'
      autoClose={3000}
      closeButton
      hideProgressBar
    />
  );
};

export default ToastProvider;
