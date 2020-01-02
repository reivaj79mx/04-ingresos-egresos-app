import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI] Activar loading';
export const DESACTIVAR_LOADING = '[UI] Desactivar loading';

export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
}

export type Actions = ActivarLoadingAction | DesactivarLoadingAction;