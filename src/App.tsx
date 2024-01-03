import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/login/Login';
import Home from './pages/Home';
import Register from './pages/register/Register';
import Forgot from './pages/Forgot';

import SharedLayout from './components/SharedLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot',
        element: <Forgot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
