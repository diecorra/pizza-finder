import { Review } from '../../model/review';
import { pb } from '../pocketbase';

export function getReview() {
  return pb.collection('reviews').getList<Review>();
}

export function removeReview(id: string) {
  return pb.collection('reviews').delete(id);
}

export function addReview(review: Partial<Review>) {
  return pb.collection('reviews').create<Review>(review);
}

export function editReview(review: Partial<Review>) {
  return pb.collection('reviews').update<Review>(review.id!, review);
}
