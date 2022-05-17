import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowdRoles }) => {
  const location = useLocation();
  let { userInfo, accessToken } = useSelector((state) => state.auth);

  if (
    !accessToken &&
    sessionStorage.getItem("disecto__token") !== "undefined"
  ) {
    accessToken = JSON.parse(sessionStorage.getItem("disecto__token"));
  }

  return accessToken &&
    userInfo?.roles?.find((role) => allowdRoles?.includes(role)) ? (
    <Outlet />
  ) : userInfo?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { PrivateRoute };
