import { Pizzeria } from '../../model/pizzeria';
import { pb } from '../pocketbase';

export function get() {
  return pb.collection('pizzerias').getList<Pizzeria>();
}

export function remove(id: string) {
  return pb.collection('pizzerias').delete(id);
}

export function add(pizzeria: Partial<Pizzeria>) {
  return pb.collection('pizzerias').create<Pizzeria>(pizzeria);
}

export function edit(pizzeria: Partial<Pizzeria>) {
  return pb.collection('pizzerias').update<Pizzeria>(pizzeria.id!, pizzeria);
}
