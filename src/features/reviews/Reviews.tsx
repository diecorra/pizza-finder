import { Button, Skeleton } from '@mui/material';
import ReviewCard from 'features/reviews/reviewCard/ReviewCard';
import { Review } from 'model/review';
import { useNavigate, useParams } from 'react-router-dom';

import { HOCData } from 'shared/HOCData';
import useReview from './useReview';

const LastReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { infoQuery } = useReview({ id });
  const { data: reviews } = infoQuery;
  return (
    <div className="flex justify-center items-center flex-col gap-8 content-center h-full ">
      <h2>
        {id ? `REVIEWS FOR  "${id.replaceAll('_', ',')}"` : 'LAST REVIEWS'}
      </h2>
      <Button
        variant="contained"
        onClick={() => navigate('/newreview')}
        className="button"
      >
        NEW REVIEW
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-16">
        <HOCData
          infoQuery={infoQuery}
          skeleton={new Array(6).fill(0).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={'24rem'}
              height={'23rem'}
            />
          ))}
        >
          {reviews?.map((review: Review) => {
            return <ReviewCard key={review.id} dataReview={review} />;
          })}
        </HOCData>
      </div>
    </div>
  );
};

export default LastReviews;
