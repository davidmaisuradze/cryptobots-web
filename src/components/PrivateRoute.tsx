import { Outlet, Navigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/index";
import { cookieAuthService } from "../services";

export const PrivateRoute = ({ children }: any) => {
  const accessToken = cookieAuthService.getAccessToken();

  if (!accessToken) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
};
