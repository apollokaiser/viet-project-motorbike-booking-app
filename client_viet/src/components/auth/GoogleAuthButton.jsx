import { useSelector, useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "@/redux/auth/authSlice";
import decode from "@/configs/jwtDecoder";
import axios from "@/configs/axios";
import { useEffect } from "react";

import GoogleLoginButton from "./GoogleLoginButton";
import AccountInfoButton from "./AccountInfoButton";
import Swal from "sweetalert2";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await axios.post(`/auth/login/google`, {
          code: response.code,
        });
        if(result.status == 200) {
          const { user, jwt, refreshToken } = result.data.data;
          localStorage.setItem("jwt", JSON.stringify(jwt));
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          dispatch(login(user));
        }
      } catch (error) {
        Swal.fire({
          title: "Khách hàng chưa đăng nhập",
          icon: "info",
          confirmButtonText: "Quay lại",
        })
        console.error("Login failed:", error);
      }
    },
    flow: "auth-code",
  });

  useEffect(() => {
    const jwtData = decode(localStorage.getItem("jwt"));
    if (jwtData == 999) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      //xử lý với refreshToken
    } else if (jwtData) {
      dispatch(
        login({
          google_id: jwtData.google_id,
          ho_ten: jwtData.ho_ten,
          email: jwtData.email,
        })
      );
    }
  }, []);
  return (
    <div className="google-login-container">
      {userInfo ? (
        <AccountInfoButton name={userInfo.ho_ten} id={userInfo.google_id}/>
      ) : (
        <GoogleLoginButton onClick={() => loginGoogle()} />
      )}
    </div>
  );
};
export default GoogleAuthButton;
