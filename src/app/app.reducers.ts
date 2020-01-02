import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducers,
  auth: fromAuth.authReducers
}