import { ToastContainer } from 'react-toastify';

import { useDarkMode } from '../hooks/useDarkMode';

import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => {
  const mode = useDarkMode((state) => state.mode);

  return (
    <ToastContainer
      theme={mode ? 'dark' : 'light'}
      position='bottom-right'
      autoClose={3000}
      closeButton
      hideProgressBar
    />
  );
};

export default ToastProvider;
