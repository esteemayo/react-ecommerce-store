import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
