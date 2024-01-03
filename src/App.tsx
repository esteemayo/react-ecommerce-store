import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from './components/SharedLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        path: '',
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
