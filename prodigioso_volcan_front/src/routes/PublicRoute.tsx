import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type PublicRouteType = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteType) => {
  const { authState } = useAuth();
  return authState.isLooged ? <Navigate to="/user-profile" /> : children;
};
