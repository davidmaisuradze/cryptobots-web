import { Outlet, Navigate } from 'react-router-dom';
import { routes } from '../constants/index';
import { cookieAuthService } from '../services';

export const PrivateRoute = ({ children }: any) => {
  const accessToken = cookieAuthService.getAccessToken();

  if (!accessToken) {
    return <Navigate to={routes.login} replace />;
  }

  return children ? children : <Outlet />;
};
