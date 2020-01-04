import { IngresoEgreso } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';


export const SET_ITEMS = '[IE] Set items';
export const UNSET_ITEMS = '[IE] Unset itemos';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: IngresoEgreso[]) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type IngresoEgresoActions = SetItemsAction | UnsetItemsAction;