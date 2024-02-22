import Error from './Error';
import Spinner from './Spinner';
import { ReactNode } from 'react';

export const HOCData = ({
  children,
  infoQuery,
  skeleton = <Spinner />,
}: {
  children: ReactNode;
  skeleton?: ReactNode;
  infoQuery: { isLoading: boolean; isError: boolean };
}) => {
  const { isLoading, isError } = infoQuery;
  if (isLoading) {
    return skeleton;
  }

  if (isError) {
    return <Error message="Error: not found" />;
  }

  return <>{children}</>;
};
