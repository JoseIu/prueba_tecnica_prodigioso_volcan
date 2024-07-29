import { UserInterface } from '../interface/user.interface';

export type AuthReducerState = {
  isLooged: boolean;
  user: UserInterface | null;
};
export type AuthReducerAction = { type: 'signIn'; payload: unknown } | { type: 'signOut' };

export const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'signIn':
      return { isLooged: true, user: action.payload } as AuthReducerState;

    case 'signOut':
      return { isLooged: false, user: null } as AuthReducerState;
    default:
      return state;
  }
};
