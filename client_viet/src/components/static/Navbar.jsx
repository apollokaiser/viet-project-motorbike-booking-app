import GoogleAuthButton from "@/features/web/auth/GoogleAuthButton";
import Link from "@comps/Link";
function Navbar() {
    return (
        <>
            <nav className="navigation-bar">
                <ul className="navbar">
                    <li className="nav-item">
                        <Link to={"/"}>Trang chủ</Link>
                    </li>
                    <li className="nav-item">
                        <Link  to={"/gioi-thieu"}>Giới thiệu</Link>{" "}
                    </li>
                    <li className="nav-item collapse show">
                        <Link to={"/danh-sach-xe"} params={{list:'all'}}>Danh sách cho thuê xe</Link>
                        <ul className="dropdown-menu">
                            {/*TODO: a bao bên ngoài li*/}
                            <li className="nav-item">
                                <Link to={"/danh-sach-xe"} params={{list:'newest'}}>Danh sách xe mới</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/danh-sach-xe"} params={{list:'best-rent'}} >Danh sách xe bán chạy</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to={'/chi-nhanh'}>Chi nhánh</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/tuyen-dung'} >Tuyển dụng</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/tin-tuc'}>Tin tức</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/lien-he'}>Liên hệ</Link>
                    </li>
                    <li className="nav-item">
                        <GoogleAuthButton/>
                    </li>
                   
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
