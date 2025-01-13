import { NavLink } from "react-router-dom";
function Link({ to, params, className, children, notActive, activeClass }) {
  let url = params ? `${to}?${new URLSearchParams(params).toString()}` : to;
  return (
    <>
      {to.startsWith("http") ? (
        <a className={className} href={url}>
          {children}
        </a>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive && activeClass && !notActive ? `${className} ${activeClass}` : className
          }
          to={url}
        >
          {children}
        </NavLink>
      )}
    </>
  );
}
export default Link;
