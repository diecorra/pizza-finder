import Error from './components/Error';
import Spinner from './components/Spinner';

export const HOCData = ({ children, infoUseQuery }: any) => {
  const { isLoading, error, data } = infoUseQuery;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return <>{children}</>;
};
