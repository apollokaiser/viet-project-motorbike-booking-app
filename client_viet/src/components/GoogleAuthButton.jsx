import { useGoogleLogin } from "@react-oauth/google";
import axios from "@/configs/axios";
import { useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AccountInfoButton from "./AccountInfoButton";
import decode from "@/configs/jwtDecoder";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/redux/auth/authSlice";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await axios.post(`/auth/login/google`, {
          code: response.code,
        });
        const { user, jwt, refreshToken } = result.data.data;
        localStorage.setItem("jwt", JSON.stringify(jwt));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        dispatch(login(user));
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    flow: "auth-code",
  });

  useEffect(() => {
    const jwtData = decode(localStorage.getItem("jwt"));
    if (jwtData == 999) {
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
        <AccountInfoButton name={userInfo.ho_ten} />
      ) : (
        <GoogleLoginButton onClick={() => loginGoogle()} />
      )}
    </div>
  );
};
export default GoogleAuthButton;
