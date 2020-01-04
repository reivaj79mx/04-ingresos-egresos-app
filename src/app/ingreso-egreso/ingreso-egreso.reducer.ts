import { IngresoEgresoActions, SET_ITEMS, UNSET_ITEMS } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgreso[]
}

const initState: IngresoEgresoState = {
  items: []
}

export function IngresoEgresoReducer(state = initState, action: IngresoEgresoActions): IngresoEgresoState {
  switch (action.type) {

    case SET_ITEMS:
      const x = {
        items: [...action.items]
        // ...action.items.map(i => {
        //   //console.log(i);
        //   return { ...i };
        // })
      }
      return x;

    case UNSET_ITEMS:
      return {
        items: []
      }

    default:
      return state;
  }
}