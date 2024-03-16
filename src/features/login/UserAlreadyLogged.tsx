import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'services/auth';

const UserAlreadyLogged = () => {
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);
  function handleLogout() {
    logout();
    navigate('/login');
  }
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-full">
      <div className="flex items-center justify-center gap-10">
        <Tooltip title="Logout">
          <LogoutIcon className="cursor-pointer" onClick={handleLogout} />
        </Tooltip>
        <h2>YOU'RE LOGGED!</h2>
      </div>
      <div className="flex items-center justify-center gap-3">
        <p>Now you can add new pizzerias in the database</p>
        <Button
          className="button"
          size="small"
          onClick={() => navigate('/newpizzeria')}
        >
          Click here to add
        </Button>
      </div>
    </div>
  );
};

export default UserAlreadyLogged;
