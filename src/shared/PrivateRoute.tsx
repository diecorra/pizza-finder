import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { selectAuthIsLogged, useAuth } from 'services/auth';

export function PrivateRoute({ children }: PropsWithChildren) {
  const isLogged = useAuth(selectAuthIsLogged);

  return <>{isLogged ? children : <Navigate to="/login" />}</>;
}
