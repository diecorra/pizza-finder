import { Pizzeria } from '../../model/pizzeria';

export type PizzeriasGetSuccess = {
  type: 'pizzeriasGetSuccess';
  payload: Pizzeria[];
};

export type PizzeriaDeleteSuccess = {
  type: 'pizzeriaDeleteSuccess';
  payload: string;
};

export type PizzeriaAddSuccess = {
  type: 'pizzeriaAddSuccess';
  payload: Pizzeria;
};

export type PizzeriaEditSuccess = {
  type: 'pizzeriaEditSuccess';
  payload: Pizzeria;
};

export type Error = {
  type: 'error';
  payload: string;
};

export type Pending = {
  type: 'pending';
  payload: boolean;
};

export type PizzeriasActions =
  | Pending
  | PizzeriasGetSuccess
  | PizzeriaDeleteSuccess
  | PizzeriaAddSuccess
  | PizzeriaEditSuccess
  | Error;
