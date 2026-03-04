import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../auth/useUser";
import Authloader from "../../../shared/components/loaders/Authloader";

const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Authloader/>;

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
