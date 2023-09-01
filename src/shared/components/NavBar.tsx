import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import { selectAuthIsLogged, useAuth } from '../../services/auth';

export function NavBar() {
  const isLogged = useAuth(selectAuthIsLogged);

  return (
    <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
      <div className="bg-slate-900 flex justify-between items-center h-14 text-white w-screen">
        <ul className="flex items-center justify-center w-screen list-none gap-10 text-xs sm:text-base">
          <NavLink to="login">
            <Tooltip title="Admin Login">
              <AccountCircleIcon className="hover:scale-125" />
            </Tooltip>
          </NavLink>
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? 'hover:scale-125 underline' : 'hover:scale-125'
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? 'hover:scale-125 underline' : 'hover:scale-125'
            }
          >
            REVIEWS
          </NavLink>

          <NavLink
            to="newpizzeria"
            className={({ isActive }) =>
              isLogged
                ? isActive
                  ? 'hover:scale-125 underline'
                  : "'hover:scale-125'"
                : 'text-gray-400'
            }
          >
            NEW PIZZERIA
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
