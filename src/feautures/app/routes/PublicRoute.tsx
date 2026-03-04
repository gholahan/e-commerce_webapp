import { Navigate, Outlet} from "react-router-dom"
import { useUser } from "../../auth/useUser";

const ProtectedRoute = () => {
  const{data:user} = useUser();
    if(user){
        return <Navigate to= "/" replace/> 
    }

  return <Outlet/>
}

export default ProtectedRoute
