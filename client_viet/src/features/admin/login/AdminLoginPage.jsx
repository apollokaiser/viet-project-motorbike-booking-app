import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/features/web/auth/redux/authSlice";
import { useDispatch } from "react-redux";
import AuthService from "@/services/AuthService";
import Alert from "@utils/Alert";

function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const login = async (e) => {
    e.preventDefault();
    const admin = await AuthService.loginWithAdminAccount(auth);
    if (!admin) {
      Alert.showToast("Thông tin đăng nhập không chính xác", "error");
      return;
    }
    dispatch(loginAdmin(admin));
    navigate("/admin");
    // call api login
  };
  const handleInput = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="wrapper">
        <div className="container-login">
          <div className="col-left">
            <div className="login-text">
              <h2>Welcome Back</h2>
              <p>
                Uy tín !
                <br />
                Làm nên thương hiệu
              </p>
              {/* <a className="btn" href="">
                Sign Up
              </a> */}
            </div>
          </div>
          <div className="col-right">
            <div className="login-form">
              <h2>Đăng nhập</h2>
              <form>
                <p>
                  <label>
                    Email<span>*</span>
                  </label>
                  <input
                    name="email"
                    value={auth.email}
                    onChange={handleInput}
                    type="text"
                    placeholder="Username or Email"
                    required
                  />
                </p>
                <p>
                  <label>
                    Mật khẩu<span>*</span>
                  </label>
                  <input
                    name="password"
                    value={auth.password}
                    onChange={handleInput}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </p>
                <p>
                  <input type="submit" onClick={login} value="Đăng nhập" />
                </p>
                <p>
                  <a href="">Forget Password?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
