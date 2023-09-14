import { Review } from '../../model/review';
import { pb } from '../pocketbase';

export function get() {
  return pb.collection('reviews').getList<Review>();
}

export function remove(id: string) {
  return pb.collection('reviews').delete(id);
}

export function add(review: Partial<Review>) {
  return pb.collection('reviews').create<Review>(review);
}

export function edit(review: Partial<Review>) {
  return pb.collection('reviews').update<Review>(review.id!, review);
}
