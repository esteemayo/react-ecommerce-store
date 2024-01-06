import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Forgot from './pages/Forgot';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import WishLists from './pages/Wishlists';
import Success from './pages/Success';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import SingleProduct from './pages/product/Product';
import ResetPassword from './pages/ResetPassword';
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
        path: '/wishlists',
        element: <WishLists />,
      },
      {
        path: '/success',
        element: <Success />,
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
