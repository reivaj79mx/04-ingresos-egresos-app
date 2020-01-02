import { Actions } from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initState: UIState = {
  isLoading: false
}

export function uiReducers(state = initState, action: Actions): UIState {
  switch (action.type) {

    case '[UI] Activar loading':
      return {
        isLoading: true
      }

    case '[UI] Desactivar loading':
      return {
        isLoading: false
      }

    default:
      return state;
  }
}