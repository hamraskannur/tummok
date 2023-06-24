import React from "react";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleWithLogin } from "../../axios/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

function GoogleLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelGoogleSignIn = async (response) => {
    const decoded = jwtDecode(response.credential);
    const { email, family_name, given_name } = decoded;
    const data = await googleWithLogin({ email, family_name, given_name });
    if (!data.status) {
      toast.error(data.message);
    } else if (data.status) {
      toast.success(data.message);
      const token = data.token;
      dispatch(loginSuccess(token));
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <GoogleOAuthProvider clientId="502951516118-qta7aqug0ervhlepaour32a5bv7nmoqn.apps.googleusercontent.com">
      <GoogleLogin
        size="large"
        onSuccess={(response) => {
          handelGoogleSignIn(response);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginPage;
