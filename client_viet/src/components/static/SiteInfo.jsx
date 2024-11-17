import logo_header from "@assets/img/logo-head-chuan-2005.png";
import title_header from "@assets/img/titlechothuexemaysaigon-1062.png";
import Search from "@comps/Search";
import CartIcon from "@comps/cart/CartIcon";
function SiteInfo() {
  return (
    <>
      <div className="site-block">
        <div className="site-header">
          <div className="logo">
            <img src={logo_header} alt="Logo" />
          </div>
          <div className="site-name-header">
            <img src={title_header} alt="" />
          </div>
          <div className="site-action">
            <CartIcon />
          </div>
        </div>
        <Search />
      </div>
    </>
  );
}

export default SiteInfo;
