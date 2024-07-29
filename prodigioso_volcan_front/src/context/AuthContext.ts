import { createContext } from 'react';
import { UserInterface } from '../interface/user.interface';
import { AuthReducerState } from './authReducer';

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (userData: UserInterface) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { isLooged: false, user: null },
  onLogin: () => {},
  onLogout: () => {},
});
