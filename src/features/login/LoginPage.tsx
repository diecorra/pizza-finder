import { selectAuthIsLogged, useAuth } from 'services/auth';
import UserAlreadyLogged from './UserAlreadyLogged';
import UserNotLogged from './UserNotLogged';
import { useLogin } from './useLogin';

export const LoginPage = () => {
  const { formData, isValid, changeHandler } = useLogin();
  const isLogged = useAuth(selectAuthIsLogged);

  return (
    <>
      {!isLogged ? (
        <UserNotLogged
          isLogged={isLogged}
          formData={formData}
          changeHandler={changeHandler}
          isValid={isValid}
        />
      ) : (
        <UserAlreadyLogged />
      )}
    </>
  );
};

export default LoginPage;
