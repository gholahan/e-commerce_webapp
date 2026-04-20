import { Outlet } from "react-router-dom";
import AuthNavbar from "../shared/components/nav/AuthNavbar";
import Footer from "../shared/components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <AuthNavbar />
      <main className="min-h-screen md:pr-[1vw] lg:pr-[9vw]">
        <Outlet />
      </main>
    <Footer/>
    </div>
  );
};

export default AuthLayout;
