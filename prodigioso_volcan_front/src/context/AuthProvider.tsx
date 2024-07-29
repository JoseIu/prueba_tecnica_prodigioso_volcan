import { googleLogout } from '@react-oauth/google';
import { useReducer } from 'react';
import { UserInterface } from '../interface/user.interface';
import { AuthContext } from './AuthContext';
import { authReducer, AuthReducerState } from './authReducer';

type AuthProviderProps = {
  children: React.ReactNode;
};

const initialState: AuthReducerState = {
  isLooged: false,
  user: null,
};
const init = (): AuthReducerState => {
  const userString = localStorage.getItem('userData');
  const userData = userString ? JSON.parse(userString) : null;

  return {
    isLooged: !!userData,
    user: userData,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const onLogin = (userData: UserInterface) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch({
      type: 'signIn',
      payload: userData,
    });
  };
  const onLogout = () => {
    googleLogout();
    localStorage.removeItem('userData');

    dispatch({
      type: 'signOut',
    });
  };

  return <AuthContext.Provider value={{ onLogin, onLogout, authState }}>{children}</AuthContext.Provider>;
};
