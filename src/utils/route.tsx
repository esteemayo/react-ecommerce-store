import { createBrowserRouter } from 'react-router-dom';

import Forgot from '../pages/Forgot';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import WishLists from '../pages/Wishlists';
import Orders from '../pages/Orders';
import Success from '../pages/Success';
import Order from '../pages/Order';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import SingleProduct from '../pages/product/Product';
import ResetPassword from '../pages/ResetPassword';
import ProductCategory from '../pages/ProductCategory';
import Account from '../pages/account/Account';
import NewProduct from '../pages/admin/NewProduct';

import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

import SharedLayout from '../components/SharedLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        path: '/',
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
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'admin/products/new',
        element: <NewProduct />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'cart',
        element: (
          <AuthRoute>
            <Cart />
          </AuthRoute>
        ),
      },
      {
        path: 'wishlists',
        element: <WishLists />,
      },
      {
        path: 'success',
        element: (
          <AuthRoute>
            <Success />
          </AuthRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <AuthRoute>
            <Orders />
          </AuthRoute>
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <AuthRoute>
            <Order />
          </AuthRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot',
        element: (
          <ProtectedRoute>
            <Forgot />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset/:token',
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'account',
        element: (
          <AuthRoute>
            <Account />
          </AuthRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
