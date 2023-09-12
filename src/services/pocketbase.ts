import PocketBase, { RecordFullListQueryParams } from 'pocketbase';
import { Review } from '../model/review';

export const pb = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);

export const getFullListPocketBase = (
  collection: string,
  filter: RecordFullListQueryParams
) => {
  return pb.collection(collection).getFullList<Review>(filter);
};
