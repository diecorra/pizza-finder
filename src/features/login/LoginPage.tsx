import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  selectAuthError,
  selectAuthIsLogged,
  useAuth,
} from '../../services/auth';
import Error from '../../shared/components/Error';
import { useLogin } from './useLogin';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { formData, isValid, changeHandler } = useLogin();
  const login = useAuth((state) => state.login);
  const error = useAuth(selectAuthError);
  const isLogged = useAuth(selectAuthIsLogged);
  const logout = useAuth((state) => state.logout);

  const doLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    login(formData.username, formData.password);
  };

  function handleLogout() {
    logout();
    navigate('/login');
  }

  if (!isLogged) {
    return (
      <div className="flex flex-col justify-around items-center">
        <div className="flex justify-center items-center mb-24 gap-2">
          <h1>ADMIN LOGIN</h1>
          <Tooltip title="Login if you want to add pizzerias!">
            <InfoIcon />
          </Tooltip>
        </div>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={doLogin}
        >
          <input
            name="username"
            type="text"
            placeholder="username"
            className="px-3 h-9"
            value={formData.username}
            onChange={changeHandler}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            className="px-3 h-9"
            value={formData.password}
            onChange={changeHandler}
          />
          <button disabled={!isValid} className="button" type="submit">
            SIGN IN
          </button>
        </form>
        {error && <Error message="Incorrect username or password." />}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-3 h-full">
        <div className="flex items-center justify-center gap-10">
          <Tooltip title="Logout">
            <LogoutIcon className="cursor-pointer" onClick={handleLogout} />
          </Tooltip>
          <h2>YOU'RE LOGGED!</h2>
        </div>
        <div className="flex items-center justify-center">
          <p>Now you can add new pizzerias in the database</p>
          <button className="button" onClick={() => navigate('/newpizzeria')}>
            Click here to add
          </button>
        </div>
      </div>
    );
  }
};

export default LoginPage;
