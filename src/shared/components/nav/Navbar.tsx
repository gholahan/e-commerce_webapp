import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { UserPen, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useFavoritesStore } from "../../../feautures/favorites/favourite.store";
import SearchBar from "../SearchBar";
import { useCartStore } from "../../../feautures/cart/cart.store";
import { useAuthStore } from "../../../feautures/auth/auth.store";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const favorites = useFavoritesStore((s) => s.favorites);
  const cart = useCartStore((s) => s.cart);
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const navClass = ({ isActive }: any) =>
    `text-sm transition ${isActive ? "underline font-medium" : "hover:underline"}`;

  return (
    <header className="bg-white text-black border-b border-gray-200 relative w-auto">
      <div className="mx-auto h-14 md:h-16 flex items-center justify-between px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw]">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold shrink-0 pr-2">
          Exclusive
        </Link>

        {/* Nav links — desktop only (>=960px) */}
        <ul className="hidden min-[960px]:flex gap-9 items-center text-gray-800">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/profile" className={navClass}>My profile</NavLink>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <SearchBar />

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <CiHeart size={24} />
            <span className=" text-xs absolute -right-1 -top-1 bg-red-700 text-white text-[10px] w-3 aspect-square rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative font-thin">
            <BsCart3 size={22} />
            <span className="absolute text-xs -right-1 -top-1 bg-red-700 text-white text-[10px] w-3 aspect-square rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </Link>

          {/* Profile dropdown — desktop only */}
          <div className="relative group hidden min-[960px]:block">
            <button className="rounded-full p-2">
              <UserPen size={24} />
            </button>
            <div className="absolute right-0 top-full -mt-0.5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition duration-200 ease-out z-50">
              <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg w-36 p-4 text-xs text-gray-800 flex flex-col gap-1">
                <Link to="/profile" className="hover:underline rounded px-2 py-1">Profile</Link>
                <Link to="/orders" className="hover:underline rounded px-2 py-1">Orders</Link>
                <button onClick={handleLogout} className="hover:underline rounded px-2 py-1 text-left">Logout</button>
              </div>
            </div>
          </div>

          {/* Hamburger — mobile only (<960px) */}
          <button
            className="min-[960px]:hidden p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     {/* Mobile menu — <960px */}
      {menuOpen && (
        <div className="min-[960px]:hidden absolute top-18.25 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-3 text-gray-800 z-50 shadow-lg">
          <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>About</NavLink>

          <hr className="border-gray-300" />

          <Link to="/profile" className="hover:underline text-sm" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/orders" className="hover:underline text-sm" onClick={() => setMenuOpen(false)}>Orders</Link>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left hover:underline text-sm">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;