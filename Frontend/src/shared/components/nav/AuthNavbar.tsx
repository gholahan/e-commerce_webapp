import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

const AuthNavbar = () => {
  return (
    <header className="bg-white text-black border-b border-gray-200">
      <div className="mx-auto py-5 flex items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        
        {/* Left → Logo */}
        <Link to="/" className="text-2xl font-bold">
          Exclusive
        </Link>

        {/* Right → Search only */}
        <div className="w-1/2 text-end">
          <SearchBar />
        </div>

      </div>
    </header>
  );
};

export default AuthNavbar;