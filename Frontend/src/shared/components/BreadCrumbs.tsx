import { Link, useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string> = {
  cart: "Cart",
  checkout: "Checkout",
  account: "Account",
};

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  const segments: string[] = pathname
    .split("/")
    .filter((segment): segment is string => Boolean(segment));

  return (
    <div className=" text-xs flex items-center gap-1 sm:my-8 my-10">
      <Link to="/" className="hover:underline">
        Home
      </Link>

      {segments.map((segment, index) => {
        const to = "/" + segments.slice(0, index + 1).join("/");
        const label = breadcrumbMap[segment] ?? segment;

        return (
          <span key={to} className="flex items-center gap-1 text-gray-600">
            <span>/</span>
            <Link to={to} className="hover:underline capitalize ">
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
