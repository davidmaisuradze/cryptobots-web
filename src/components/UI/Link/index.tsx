import { FC } from 'react';
import {
  Link,
  useLocation,
  matchRoutes,
  useResolvedPath,
} from 'react-router-dom';
import { ROUTES } from '../../../routes';

type Props = {
  to: string;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  children: React.ReactNode;
}

export const NavLink: FC<Props>  = ({ to, exact, className, inactiveClassName,activeClassName, ...rest }) => {
  const location = useLocation();
  const resolvedLocation = useResolvedPath(to);
  const routeMatches = matchRoutes(ROUTES, location);
      
  let isActive;
  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  } else {
    isActive = routeMatches?.some(
      (match) => match.pathname === resolvedLocation.pathname
    );
  }
      
  const allClassNames =
          className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
  return <Link className={allClassNames} to={to} {...rest} />;
};

export default NavLink;
