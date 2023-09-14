import PocketBase, { RecordFullListQueryParams } from 'pocketbase';
import { Pizzeria } from '../model/pizzeria';
import { Review } from '../model/review';

export const pb = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);

export const getFullListOrWithFilterPocketBase = (
  collection: string,
  filter: RecordFullListQueryParams
) => {
  return pb.collection(collection).getFullList<Review>(filter);
};

export const getFullListOrWithFilterPizzerias = (
  collection: string,
  filter: RecordFullListQueryParams
) => {
  return pb.collection(collection).getFullList<Pizzeria>(filter);
};
