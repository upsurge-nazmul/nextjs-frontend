import React, { useContext, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import AppleSvg from "../SVGcomponents/AppleSvg";
import { MainContext } from "../../context/Main";
import GoogleLogin from "react-google-login";

function AuthLogin({ settoastdata }) {
  const { setuserdata, setuser } = useContext(MainContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const history = useRouter();
  // login Function
  async function handleSignin() {
    if (password === "" || !validator.isEmail(email)) {
      settoastdata({
        show: true,
        msg: "Enter password and email",
        type: "error",
      });
      return;
    }

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
      settoastdata({
        show: true,
        msg: response?.data.message || "Cannot reach server",
        type: "error",
      });
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
        settoastdata({
          show: true,
          msg: response?.data.message || "Cannot reach server",
          type: "error",
        });
      }
    } else {
      settoastdata({ show: true, msg: "Error", type: "error" });
    }
  }
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
      <div className={styles.button} onClick={handleSignin}>
        Sign In
      </div>
      <div className={styles.or}>OR</div>
      <GoogleLogin
        clientId="375248822516-a08u6u16jk762tjdjcc1nodb13dor3qj.apps.googleusercontent.com"
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
            <p>Continue with Google</p>
          </div>
        )}
        onSuccess={handlegoogleLogin}
        onFailure={handlegoogleLogin}
        cookiePolicy={"single_host_origin"}
      />
      <div className={styles.apple}>
        <AppleSvg />
        <p>Continue with Apple</p>
      </div>
      <div className={styles.reset}>
        Forgot your <span>Username</span> or <span>Password</span>?
      </div>
    </div>
  );
}

export default AuthLogin;
