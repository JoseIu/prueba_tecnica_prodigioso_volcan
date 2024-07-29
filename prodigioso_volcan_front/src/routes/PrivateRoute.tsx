import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type PrivateRouteType = {
  children: React.ReactNode;
};
export const PrivateRoute = ({ children }: PrivateRouteType) => {
  const { authState } = useAuth();
  return authState.isLooged ? children : <Navigate to="/" />;
};
