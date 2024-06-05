import { Navigate, Outlet } from "react-router-dom";

interface IRouter {
  isAuth: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({ isAuth, redirectPath = "/login" }: IRouter) =>
  !isAuth ? <Navigate to={redirectPath} /> : <Outlet />;
