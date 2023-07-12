import { useEffect, useState } from 'react';
import { Review } from '../../model/Review';
import { pb } from '../../pocketbase';
import Error from '../../shared/components/Error';
import ReviewCard from '../../shared/components/ReviewCard';
import Spinner from '../../shared/components/Spinner';
import { useNavigate } from 'react-router-dom';

const LastReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function loadData() {
    setPending(true);
    setError(false);
    pb.collection('reviews')
      .getList<Review>()
      .then((res) => {
        setPending(false);
        setError(false);
        setReviews(res.items);
      })
      .catch((error) => {
        console.log(error);
        setPending(false);
        setError(true);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-8 content-center h-full">
      <h2>LAST REVIEWS</h2>
      <button
        className="bg-red-500 rounded p-2"
        onClick={() => navigate('/newreview')}
      >
        NEW REVIEW
      </button>
      {pending && <Spinner />}
      {error && <Error message={`Sorry, we couldn't find reviews!`} />}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 content-center">
        {reviews.map((r: Review) => {
          return <ReviewCard key={r.id} dataReview={r} />;
        })}
      </div>
    </div>
  );
};

export default LastReviews;
