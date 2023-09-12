import { Pizzeria } from '../../model/pizzeria';
import { PizzeriasActions } from './pizzerias.actions';

export interface PizzeriasState {
  pizzerias: Pizzeria[];
  pending: boolean;
  error: string | null;
  activeItem: Partial<Pizzeria> | null;
}

export const initialState: PizzeriasState = {
  pizzerias: [],
  pending: false,
  error: null,
  activeItem: null,
};

export function pizzeriasReducer(
  state: PizzeriasState,
  action: PizzeriasActions
) {
  const { type, payload } = action;

  switch (type) {
    case 'pending':
      return { ...state, pending: payload, error: null };
    case 'pizzeriasGetSuccess':
      return { ...state, pending: false, error: null, products: payload };
    case 'pizzeriaDeleteSuccess':
      return {
        ...state,
        products: state.pizzerias.filter((item) => item.id !== payload),
        error: null,
        pending: false,
        activeItem: state.activeItem?.id === payload ? null : state.activeItem,
      };
    case 'pizzeriaAddSuccess':
      return {
        ...state,
        products: [...state.pizzerias, payload],
        activeItem: null,
        error: null,
        pending: false,
      };
    case 'pizzeriaEditSuccess':
      return {
        ...state,
        products: [
          ...state.pizzerias.map((item) =>
            item.id === payload.id ? payload : item
          ),
        ],
        activeItem: null,
        error: null,
        pending: false,
      };
    case 'error':
      return { ...state, pending: false, error: payload };
  }

  return state;
}
