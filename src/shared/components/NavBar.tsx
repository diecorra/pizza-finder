import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
      <div className="bg-slate-900 flex justify-between items-center h-14 text-white">
        <ul className="flex justify-center w-full list-none gap-10 text-xs sm:text-base">
          <NavLink to="home">HOME</NavLink>
          <NavLink to="myreviews">MY REVIEWS</NavLink>
          <NavLink to="newreview">NEW REVIEW</NavLink>
          <NavLink to="settings">SETTINGS</NavLink>
        </ul>
      </div>
    </div>
  );
}
