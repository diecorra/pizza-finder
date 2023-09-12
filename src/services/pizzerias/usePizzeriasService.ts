import { useReducer } from 'react';
import { Pizzeria } from '../../model/pizzeria';
import { initialState, pizzeriasReducer } from '../pizzerias/pizzerias.reducer';
import * as PizzeriasService from './pizzerias.api';

export function usePizzeriaService() {
  const [state, dispatch] = useReducer(pizzeriasReducer, initialState);

  async function getPizzerias() {
    dispatch({ type: 'pending', payload: true });

    try {
      const res = await PizzeriasService.get();
      dispatch({ type: 'pizzeriasGetSuccess', payload: res.items });
    } catch (e) {
      dispatch({ type: 'error', payload: 'Pizzerias not loaded' });
    }
  }

  async function deletePizzeria(id: string) {
    dispatch({ type: 'pending', payload: true });

    try {
      await PizzeriasService.remove(id);
      dispatch({ type: 'pizzeriaDeleteSuccess', payload: id });
    } catch (e) {
      dispatch({ type: 'error', payload: 'Pizzeria not deleted' });
    }
  }

  async function addPizzeria(pizzeria: Pizzeria) {
    dispatch({ type: 'pending', payload: true });

    try {
      await PizzeriasService.add(pizzeria);
    } catch (e) {
      dispatch({ type: 'error', payload: 'Pizzeria not added' });
      return e;
    }
  }

  return {
    getPizzerias,
    deletePizzeria,
    addPizzeria,
    state,
  };
}
