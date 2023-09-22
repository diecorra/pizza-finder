import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Review } from 'model/review';
import { useNavigate, useParams } from 'react-router-dom';
import { getFullListOrWithFilterPocketBase } from 'services/pocketbase';
import { HOCData } from 'shared/HOCData';
import ReviewCard from 'shared/ReviewCard';
import { buttonStyle } from 'utils/style';

const LastReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const infoUseQuery = useQuery([id], () =>
    getFullListOrWithFilterPocketBase('reviews', {
      filter: id ? `city = "${id}"` : '',
    })
  );
  const { data: reviews } = infoUseQuery;
  return (
    <div className="flex justify-center items-center flex-col gap-8 content-center h-full">
      <h2>
        {id ? `REVIEWS FOR  "${id.replaceAll('_', ',')}"` : 'LAST REVIEWS'}
      </h2>
      <Button
        variant="contained"
        onClick={() => navigate('/newreview')}
        style={buttonStyle}
      >
        NEW REVIEW
      </Button>
      <HOCData<Review[] | undefined> infoUseQuery={infoUseQuery}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 content-center mb-4">
          {reviews?.map((review: Review) => {
            return <ReviewCard key={review.id} dataReview={review} />;
          })}
        </div>
      </HOCData>
    </div>
  );
};

export default LastReviews;
