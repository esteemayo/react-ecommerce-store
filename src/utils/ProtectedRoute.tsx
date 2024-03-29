import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useAuth((state) => state.user);

  return !currentUser ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
