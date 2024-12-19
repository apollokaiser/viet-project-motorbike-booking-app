import GoogleImage from "@/assets/img/google-image.png";
import UpdateUserButton from "./UpdateUserButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import { logoutUser } from "@/redux/auth/authSlice";

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
          <div className="card-header bg-transparent text-center">
            <img
              className={"profile_img " + (!user?.CMND ? "not-allow" : "")}
              src={GoogleImage}
              alt="student dp"
            />
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
