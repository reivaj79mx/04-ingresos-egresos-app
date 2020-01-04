import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: fromUI.UIState,
  auth: fromAuth.AuthState,
  ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducers,
  auth: fromAuth.authReducers,
  ingresoEgreso: fromIngresoEgreso.IngresoEgresoReducer
}