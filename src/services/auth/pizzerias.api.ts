import { Pizzeria } from '../../model/pizzeria';
import { pb } from '../pocketbase';

export function getPizzeria() {
  return pb.collection('pizzerias').getList<Pizzeria>();
}

export function removePizzeria(id: string) {
  return pb.collection('pizzerias').delete(id);
}

export function addPizzeria(pizzeria: Partial<Pizzeria>) {
  return pb.collection('pizzerias').create<Pizzeria>(pizzeria);
}

export function editPizzeria(pizzeria: Partial<Pizzeria>) {
  return pb.collection('pizzerias').update<Pizzeria>(pizzeria.id!, pizzeria);
}
