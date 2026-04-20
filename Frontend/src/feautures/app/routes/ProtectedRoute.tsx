import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../auth/useUser";
import Authloader from "../../auth/component/Authloader";
// import type { User } from "../../auth/type";
import { useAuthStore } from "../../auth/auth.store";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { data: user, isLoading,} = useUser();
  console.log(user)
   if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) return <Authloader/>;

  return <Outlet /> ;
};

export default ProtectedRoute;
