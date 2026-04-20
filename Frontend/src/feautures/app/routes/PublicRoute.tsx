import { Navigate, Outlet} from "react-router-dom"
import { useAuthStore } from "../../auth/auth.store";

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
    if(accessToken){
        return <Navigate to= "/" replace/> 
    }

  return <Outlet/>
}

export default PublicRoute
