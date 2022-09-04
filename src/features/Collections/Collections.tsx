import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from '../../components/UI';
import { profileDropdownRoutes } from '../../constants';

export const Collections:FC = () => {
  return (
    <>
      <div className="">
        {profileDropdownRoutes.map(route => (
          <NavLink
            key={route.title}
            activeClassName="border-indigo-500 br-color-blue text-blue-800"
            inactiveClassName="text-gray-500 hover:text-blue-800 hover:border-blue-800"
            className="inline-flex mr-2 items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
            to={route.to}
            exact={true}
          >
            {route.title}
          </NavLink>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Collections;