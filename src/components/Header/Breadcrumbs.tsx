import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { RAW_COLOR_DICTIONARY } from "../../assets/dictionaries";

export default function BreadCrumbs() {
  const breadcrumbs = useReactRouterBreadcrumbs();

  return (
    <div className="flex space-x-2 pl-10 pt-5">
      {breadcrumbs.map(({ breadcrumb, key }, index) => (
        <section key={index}>
          <Link
            to={`${key}`}
            style={{ color: `${RAW_COLOR_DICTIONARY["primary"]}` }}
          >
            {breadcrumb}
          </Link>
          {index !== breadcrumbs.length - 1 && (
            <span className="text-black font-bold ml-2">{">"}</span>
          )}
        </section>
      ))}
    </div>
  );
}
