import ReviewCard from '../../shared/components/ReviewCard';

const City = () => {
  const data = {
    user: 'Diego',
    pizzeriaName: 'Gugliemo Vuolosss',
    reviewDate: 'September 14, 2016',
    reviewTitle: 'Titolo recensione',
    reviewStarts: 6,
    reviewDescription:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    imgReview: '/src/assets/favicon-pizza.webp',
  };

  return (
    <div className="flex items-center flex-col gap-8 content-center">
      <h2>12 REVIEWS FOR VERONA</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 content-center">
        <ReviewCard dataReview={data} />
        <ReviewCard dataReview={data} />
      </div>
    </div>
  );
};

export default City;
