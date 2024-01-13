import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useAuth((state) => state.user);

  return currentUser.role === 'admin' ? children : <Navigate to='/' />;
};

export default PrivateRoute;
