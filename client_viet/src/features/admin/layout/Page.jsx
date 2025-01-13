import "./admin.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginAdmin } from "@/features/web/auth/redux/authSlice";
import AuthService from "@/services/AuthService";

function Page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const admin = AuthService.checkAdminAuthorization();
    if (!admin) {
      navigate("/login/admin");
    } else {
      dispatch(loginAdmin(admin));
    }
  }, []);
  return (
    <>
      <SideMenu />
      <div className="container-admin">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Page;
