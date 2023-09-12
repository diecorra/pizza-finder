import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Review } from '../../model/review';
import { getFullListPocketBase } from '../../services/pocketbase';
import Error from '../../shared/components/Error';
import ReviewCard from '../../shared/components/ReviewCard';
import Spinner from '../../shared/components/Spinner';

const LastReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery([id], () =>
    getFullListPocketBase('reviews', {
      filter: id ? `city = "${id}"` : '',
    })
  );

  return (
    <div className="flex justify-center items-center flex-col gap-8 content-center h-full">
      <h2>
        {id ? `REVIEWS FOR  "${id.replaceAll('_', ',')}"` : 'LAST REVIEWS'}
      </h2>
      <Button
        variant="contained"
        onClick={() => navigate('/newreview')}
        style={{
          ...textFieldStyle,
          backgroundColor: 'whitesmoke',
          minWidth: '130px',
          color: '#0F172A',
        }}
      >
        NEW REVIEW
      </Button>
      {isLoading && <Spinner />}
      {isError && <Error message={`Sorry, we couldn't find reviews!`} />}
      {reviews && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 content-center mb-4">
          {reviews.map((r: Review) => {
            return <ReviewCard key={r.id} dataReview={r} />;
          })}
        </div>
      )}
    </div>
  );
};

export default LastReviews;

const textFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '1.125rem',
  backgroundColor: 'white',
};
