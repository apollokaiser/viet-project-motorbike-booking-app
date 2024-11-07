import GoogleAuthButton from "@comps/GoogleAuthButton";

function Navbar() {
    return (
        <>
            <nav className="navigation-bar">
                <ul className="navbar">
                    <li className="nav-item">
                        <a href="./index.html">Trang chủ</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Giới thiệu</a>{" "}
                    </li>
                    <li className="nav-item collapse">
                        <a href="">Danh sách cho thuê xe</a>
                        <ul className="dropdown-menu">
                            {/*TODO: a bao bên ngoài li*/}
                            <li className="nav-item">
                                <a href="#">Danh sách xe mới</a>
                            </li>
                            <li className="nav-item">
                                <a href="#">Danh sách xe bán chạy</a>
                            </li>
                            <li className="nav-item">
                                <a href="#">Danh sách xe đang thuê</a>
                            </li>
                            <li className="nav-item">
                                <a href="#">Danh sách xe đã bán</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="">Chi nhánh</a>
                    </li>
                    <li className="nav-item">
                        <a href="">Tuyển dụng</a>
                    </li>
                    <li className="nav-item">
                        <a href="">Tin tức</a>
                    </li>
                    <li className="nav-item">
                        <a href="">Liên hệ</a>
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
