import { useAuth } from '../hooks/useAuth';
import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useAuth((state) => state.user);

  return currentUser ? children : <LoadingToRedirect />;
};

export default AuthRoute;
