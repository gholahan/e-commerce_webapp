import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../feautures/auth/useUser";
import Breadcrumbs from "../shared/components/BreadCrumbs";

const ProfilePage = () => {
  const { data: user } = useUser();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumbs />
        <p className="text-sm text-gray-600">
          Welcome! 
          <span className="font-semibold text-red-600 ml-1">{user?.firstName}</span>
        </p>
      </div>

      <div className="flex max-w-7xl mx-auto gap-7 px-4 sm:p-0 md:px-6">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col gap-6 sticky top-6">
          <div>
            <h2 className="font-semibold mb-3">Manage My Account</h2>
            <div className="pl-7 text-xs flex flex-col gap-2 text-gray-600">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) => `hover:text-gray-900 cursor-pointer ${isActive ? "text-red-600 font-semibold" : ""}`}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/profile/address"
                className={({ isActive }) => `hover:text-gray-900 cursor-pointer ${isActive ? "text-red-600 font-semibold" : ""}`}
              >
                Address Book
              </NavLink>
              <NavLink
                to="/profile/payment"
                className={({ isActive }) => `hover:text-gray-900 cursor-pointer ${isActive ? "text-red-600 font-semibold" : ""}`}
              >
                My Payment Options
              </NavLink>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">My Orders</h2>
            <div className="pl-7 flex flex-col gap-2 text-gray-600 text-xs">
              <div className="hover:text-gray-900 cursor-pointer">My Returns</div>
              <div className="hover:text-gray-900 cursor-pointer">My Cancellations</div>
            </div>
          </div>

          <h2 className="font-bold text-gray-600">My Wishlist</h2>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="w-full max-w-7xl mx-auto bg-white rounded-lg sm:shadow-md shadow-none p-2 sm:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
