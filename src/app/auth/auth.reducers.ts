import { AuthActions, SET_USER, UNSET_USER } from './auth.actions';
import { User } from './user.model';


export interface AuthState {
  user: User
}

const initState: AuthState = {
  user: null
}

export function authReducers(state = initState, action: AuthActions): AuthState {

  switch (action.type) {
    case SET_USER:
      return { user: { ...action.user } };
    
    case UNSET_USER:
      return {
        user: null
      }

    default:
      return state;
  }

}