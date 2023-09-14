import { Review } from '../../model/review';

export type ReviewsGetSuccess = {
  type: 'reviewsGetSuccess';
  payload: Review[];
};

export type ReviewDeleteSuccess = {
  type: 'reviewDeleteSuccess';
  payload: string;
};

export type ReviewAddSuccess = {
  type: 'reviewAddSuccess';
  payload: Review;
};

export type ReviewEditSuccess = {
  type: 'reviewEditSuccess';
  payload: Review;
};

export type Error = {
  type: 'error';
  payload: string;
};

export type Pending = {
  type: 'pending';
  payload: boolean;
};

export type ReviewsActions =
  | Pending
  | ReviewsGetSuccess
  | ReviewDeleteSuccess
  | ReviewAddSuccess
  | ReviewEditSuccess
  | Error;
