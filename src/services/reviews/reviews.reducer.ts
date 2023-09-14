import { Review } from '../../model/review';
import { ReviewsActions } from './review.actions';

export interface ReviewsState {
  reviews: Review[];
  pending: boolean;
  error: string | null;
  activeItem: Partial<Review> | null;
}

export const initialState: ReviewsState = {
  reviews: [],
  pending: false,
  error: null,
  activeItem: null,
};

export function reviewsReducer(state: ReviewsState, action: ReviewsActions) {
  const { type, payload } = action;

  switch (type) {
    case 'pending':
      return { ...state, pending: payload, error: null };
    case 'reviewsGetSuccess':
      return { ...state, pending: false, error: null, reviews: payload };
    case 'reviewDeleteSuccess':
      return {
        ...state,
        reviews: state.reviews.filter((item) => item.id !== payload),
        error: null,
        pending: false,
        activeItem: state.activeItem?.id === payload ? null : state.activeItem,
      };
    case 'reviewAddSuccess':
      return {
        ...state,
        products: [...state.reviews, payload],
        activeItem: null,
        error: null,
        pending: false,
      };
    case 'reviewEditSuccess':
      return {
        ...state,
        products: [
          ...state.reviews.map((item) =>
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
