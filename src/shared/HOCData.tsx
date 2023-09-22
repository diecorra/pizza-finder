import { UseQueryResult } from '@tanstack/react-query';
import Error from './Error';
import Spinner from './Spinner';
import { ReactNode } from 'react';

export const HOCData = <T,>({
  children,
  infoUseQuery,
}: {
  children: ReactNode;
  infoUseQuery: UseQueryResult<T>;
}) => {
  const { isLoading, error, isFetching } = infoUseQuery;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message="Error: not found" />;
  }

  return <>{children}</>;
};
