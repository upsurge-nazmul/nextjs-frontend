import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import AppleSvg from "../SVGcomponents/AppleSvg";
import { MainContext } from "../../context/Main";
import GoogleLogin from "react-google-login";
import { apple_client_id, GClientId } from "../../../config";
import AppleLogin from "react-apple-login";
function AuthLogin({ settoastdata, error, seterror }) {
  const { setuserdata, setuser } = useContext(MainContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const history = useRouter();
  // login Function
  async function handleSignin() {
    if (password === "" || !validator.isEmail(email)) {
      seterror("Enter password and email");
      return;
    }
    seterror("");
    let response = await LoginApis.login({ email, password });
    if (response && response.data && response.data.success) {
      setCookie("accesstoken", response.data.data.token);
      setuserdata(response.data.data.userProfile);
      setuser(response.data.data.userProfile.id);
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      if (response.data.data.userProfile.user_type === "parent")
        history.push("/dashboard");
      else history.push("/kiddashboard");
    } else {
      seterror(response.data.message || "Cannot reach server");
    }
  }
  async function handlegoogleLogin(data) {
    if (data.tokenId) {
      let response = await LoginApis.googlelogin({
        tokenId: data.tokenId,
      });
      if (response && response.data && response.data.success) {
        setCookie("accesstoken", response.data.data.token);
        setuserdata(response.data.data.userProfile);
        setuser(response.data.data.userProfile.id);
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        if (response.data.data.userProfile.user_type === "parent")
          history.push("/dashboard");
        else history.push("/kiddashboard");
      } else {
        seterror(response.data.message || "Cannot reach server");
      }
    } else {
      seterror("");
    }
  }

  useEffect(() => {
    seterror("");
  }, [email, password]);
  return (
    <div className={styles.logindetails}>
      <input
        type="text"
        placeholder="Username/Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div className={styles.passwordBox}>
        <input
          type={passhidden ? "password" : "text"}
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className={styles.show} onClick={() => setpasshidden(!passhidden)}>
          {passhidden ? "Show" : "Hide"}
        </p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.button} onClick={handleSignin}>
        Sign In
      </div>
      <div className={styles.or}>OR</div>
      <GoogleLogin
        clientId={GClientId}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={styles.google}
            // onClick={() => {
            //   setemail("randomgoogleid@gmail.com");
            //   setsignupmethod("google");
            //   handleParentSignUp("randomgoogleid@gmail.com", "google");
            // }}
          >
            <GoogleSvg />
            <p style={{ pointerEvents: "none" }}>Continue with Google</p>
          </div>
        )}
        onSuccess={handlegoogleLogin}
        onFailure={handlegoogleLogin}
        cookiePolicy={"single_host_origin"}
      />
      <AppleLogin
        clientId={apple_client_id}
        redirectURI="https://redirectUrl.com"
        usePopup
        scope="name email"
        callback={(response) => {
          console.log(response);
        }}
        render={(r) => {
          console.log(r);
          return (
            <div className={styles.apple} onClick={r.onClick}>
              <AppleSvg />
              <p>Continue with Apple</p>
            </div>
          );
        }}
      />

      <div className={styles.reset}>
        Forgot your <span>Username</span> or <span>Password</span>?
      </div>
    </div>
  );
}

export default AuthLogin;
