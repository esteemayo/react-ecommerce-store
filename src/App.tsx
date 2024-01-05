import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/login/Login';
import Home from './pages/Home';
import Register from './pages/register/Register';
import Forgot from './pages/Forgot';
import SingleProduct from './pages/product/Product';
import Products from './pages/Products';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import ProductCategory from './pages/ProductCategory';

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
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/category/:slug',
        element: <ProductCategory />,
      },
      {
        path: '/products/:id',
        element: <SingleProduct />,
      },
      {
        path: '/cart',
        element: <Cart />,
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
      {
        path: 'reset/:token',
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
