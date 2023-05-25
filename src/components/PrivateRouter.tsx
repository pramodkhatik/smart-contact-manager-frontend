import { Navigate, Outlet } from "react-router";
import { isLoggedIn } from "../auth";

const PrivateRouter = () => {
  console.log(isLoggedIn());
  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
