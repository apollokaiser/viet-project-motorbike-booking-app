import { NavLink } from "react-router-dom";
function Link({to,params, className, children}) {
  let url = params ? `${to}?${new URLSearchParams(params).toString()}` : to;
    return (<>
        {
           to.startsWith("http") ? 
           <a className={className} href={url}>{children}</a>
           :<NavLink className={className} to={url}>{children}</NavLink>
        }
        
    </>  );
}
export default Link;