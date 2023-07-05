import PizzeriaCard from './PizzeriaCard';

const City = () => {
  return (
    <div className="flex items-center flex-col gap-8 content-center">
      <h2>12 REVIEWS FOR VERONA</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 content-stretch">
        <PizzeriaCard />
        <PizzeriaCard />
      </div>
    </div>
  );
};

export default City;
