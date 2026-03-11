import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const SideBar = () => {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white border rounded-lg shadow hover:bg-gray-50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:sticky top-0 left-0
        h-screen w-60
        bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out
        z-40

        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <nav className="p-5 flex flex-col h-full">
          <h2 className="text-lg font-extrabold mb-4">Categories</h2>

          <ul className="flex flex-col gap-2 overflow-y-auto">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/category/${cat}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;