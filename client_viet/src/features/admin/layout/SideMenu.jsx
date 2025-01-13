import dasboard from "@assets/img/admin/dashboard_2.png"
import report  from "@assets/img/admin/teacher2.png"
import payment from "@assets/img/admin/payment.png"
import setting from "@assets/img/admin/settings.png"
import bike from "@assets/img/admin/reading-book_1.png"
import Link from "@comps/Link"

function SideMenu() {
  return (
    <>
      <div className="side-menu">
        <div className="brand-name">
        <Link to={"/admin"}><h1>Bikelodic</h1></Link>
        </div>
        <ul>
          <li>
           <Link to={"/admin"}><img src={dasboard} alt="" /> <span>Trang chính</span></Link> 
          </li>
          <li>
           <Link to={"/admin/product"} ><img src={bike} alt="" /><span>Quản lý xe</span></Link> 
          </li>
          <li>
            <Link to={"/admin/bao-cao"}><img src={report} alt="" /><span>Báo cáo</span></Link>
            
          </li>
          <li>
            <img src={payment} alt="" /><span>Quản lý đơn</span>
          </li>
          <li>
            <img src={setting} alt="" /><span>Settings</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
