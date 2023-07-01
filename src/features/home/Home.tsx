import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CitiesProps } from '../../model/CitiesProps';
import { fetchCities } from '../../services/fetchCities';
import Error from '../../shared/components/Error';
import Spinner from '../../shared/components/Spinner';
import { SearchBox } from './SearchBox';

const Home = () => {
  const { isLoading, error, data } = useQuery<
    boolean,
    AxiosError<any, any>,
    CitiesProps
  >(['cities'], () =>
    fetchCities('d8bb63d3a1f7498e9d40f207eea57619', 'Sommacampagna')
  );

  console.log('ciao');

  return (
    <div className="container mx-auto px-12 min-h-screen flex flex-col">
      <div className="flex flex-col justify-around items-center">
        <h1 className="text-4xl font-bold text-primary md:text-7xl z-10">
          PIZZA FINDER
        </h1>
        <div className="flex items-center justify-center">
          <SearchBox />
        </div>
        <div>
          {!error ? (
            <div className="flex flex-col">
              {data?.results.map((result) => (
                <li key={result.formatted}>{result.formatted}</li>
              ))}
            </div>
          ) : (
            <Error message={error.message} />
          )}
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default Home;
