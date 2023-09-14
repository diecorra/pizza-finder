import { useReducer } from 'react';
import { Review } from '../../model/review';
import { initialState, reviewsReducer } from '../reviews/reviews.reducer';
import * as ReviewsService from './reviews.api';

export function useReviewService() {
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  async function getReviews() {
    dispatch({ type: 'pending', payload: true });

    try {
      const res = await ReviewsService.get();
      dispatch({ type: 'reviewsGetSuccess', payload: res.items });
    } catch (e) {
      dispatch({ type: 'error', payload: 'Reviews not loaded' });
    }
  }

  async function deleteReview(id: string) {
    dispatch({ type: 'pending', payload: true });

    try {
      await ReviewsService.remove(id);
      dispatch({ type: 'reviewDeleteSuccess', payload: id });
    } catch (e) {
      dispatch({ type: 'error', payload: 'Review not deleted' });
    }
  }

  async function addReview(review: Review) {
    dispatch({ type: 'pending', payload: true });

    try {
      await ReviewsService.add(review);
    } catch (e) {
      dispatch({ type: 'error', payload: 'Review not added' });
      return e;
    }
  }

  return {
    getReviews,
    deleteReview,
    addReview,
    state,
  };
}
