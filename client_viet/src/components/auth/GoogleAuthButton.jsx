import { useSelector, useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "@/redux/auth/authSlice";
import { useEffect } from "react";

import GoogleLoginButton from "./GoogleLoginButton";
import AccountInfoButton from "./AccountInfoButton";
import AuthService from "@/services/AuthService";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const user = await AuthService.loginWithGoogle(response.code);
      if (user) dispatch(login(user));
    },
    flow: "auth-code",
  });

  useEffect(() => {
    const user = AuthService.checkAuthentication(); // check localStorage JWT token
    if (user) {
      dispatch(login(user));
    }
  }, []);
  return (
    <div className="google-login-container">
      {userInfo ? (
        <AccountInfoButton name={userInfo.ho_ten} id={userInfo.google_id} />
      ) : (
        <GoogleLoginButton onClick={() => loginGoogle()} />
      )}
    </div>
  );
};
export default GoogleAuthButton;
