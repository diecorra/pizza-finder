import InfoIcon from '@mui/icons-material/Info';
import { Button, TextField, Tooltip } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { selectAuthError, useAuth } from 'services/auth';
import Error from 'shared/Error';
import Spinner from 'shared/Spinner';
import { buttonStyle, textFieldStyle } from 'utils/style';

const UserNotLogged = ({ formData, changeHandler, isValid, isLogged }: any) => {
  const [loading, setLoading] = useState(false);
  const error = useAuth(selectAuthError);
  const login = useAuth((state) => state.login);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    login(formData.username, formData.password);
  };

  useEffect(() => {
    if ((isLogged || error) && loading) {
      setLoading(false);
    }
  }, [isLogged, error]);

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
        onSubmit={handleSubmit}
      >
        <TextField
          name="username"
          type="text"
          value={formData.username}
          onChange={changeHandler}
          placeholder="username"
          sx={textFieldStyle}
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={changeHandler}
          sx={textFieldStyle}
        />
        {loading ? (
          <Spinner />
        ) : (
          <Button disabled={!isValid} type="submit" sx={buttonStyle}>
            SIGN IN
          </Button>
        )}
      </form>
      {error && <Error message="Incorrect username or password." />}
    </div>
  );
};

export default UserNotLogged;
