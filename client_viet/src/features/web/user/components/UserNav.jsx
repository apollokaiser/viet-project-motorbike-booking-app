import GoogleImage from "@/assets/img/google-image.png";
import UpdateUserButton from "./UpdateUserButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import { logoutUser } from "@/features/web/auth/redux/authSlice";
import Link from "@comps/Link";

function UserNav() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <>
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="pb-5">
            {/* Account Sidebar*/}
            <div className="author-card pb-3">
              <div className="author-card-profile">
                <div className="author-card-avatar">
                  <img src={GoogleImage} alt="Daniel Adams" />
                </div>
                <div className="author-card-details">
                  <h5 className="author-card-name text-lg">{user?.ho_ten}</h5>
                </div>
              </div>
            </div>
            <div className="wizard">
              <nav className="list-group list-group-flush">
                <Link
                  to={"/khach-hang/thong-tin"}
                  params={{ id: user?.google_id }}
                  className="list-group-item"
                  activeClass={"link-active"}
                >
                  <i className="fa fa-user text-muted" />
                  Thông tin cá nhân
                </Link>
                <Link
                  to={"/khach-hang/lich-su-thue-xe"}
                  params={{ id: user?.google_id }}
                  activeClass={"link-active"}
                  className="list-group-item"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <i className="fa fa-shopping-bag mr-1 text-muted" />
                      <div className="d-inline-block font-weight-medium text-uppercase">
                        Lịch sử thuê xe
                      </div>
                    </div>
                  </div>
                </Link>
              </nav>
            </div>
          </div>
          <div className="card-body">
            <div className="update-button">
              <UpdateUserButton />
            </div>
            <div className="update-button">
              <a
                onClick={logout}
                style={{
                  textDecoration: "underline",
                  padding: "10px",
                  display: "block",
                  cursor: "pointer",
                }}
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNav;
