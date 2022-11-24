import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import ModernInputBox from "../ModernInputBox";
import Spinner from "../Spinner";
import GoogleLogin from "react-google-login";
import { apple_client_id, GClientId } from "../../../config";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import { getfullname } from "../../helpers/generalfunctions";
import { setUserInLocalStorage } from "../../helpers/localStorage";
function AuthLogin({
  settoastdata,
  error,
  seterror,
  setmode,
  onlyLogin,
  setshowauth,
  addAccount,
  mode,
}) {
  const { setSavedUsers, setuserdata, setuser } = useContext(MainContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  // login Function
  async function handleSignin() {
    setloading(true);
    if (!password) {
      seterror("Please enter your password");
      setloading(false);
      return;
    }
    if (!email) {
      seterror("Please enter your email address or username");
      setloading(false);
      return;
    }
    seterror("");
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"accesstoken"}=`);
    let token;
    if (parts.length === 2) token = parts.pop().split(";").shift();
    let response = await LoginApis.login({ email, password }, token);
    if (response && response.data && response.data.success) {
      mixpanel.track("Login", { event: `${email} logged in` });
      mixpanel.identify(`${email}`);
      mixpanel.people.set({ "$name":getfullname( response.data.data.userProfile.first_name, response.data.data.userProfile.last_name ) , "$email": email, "$user-id": response.data.data.userProfile.id });
      setSavedUsers(
        setUserInLocalStorage({
          token: response.data.data.token,
          email: response.data.data.userProfile.email,
          username: response.data.data.userProfile.user_name,
          image: response.data.data.userProfile.user_img_url,
          name: getfullname(
            response.data.data.userProfile.first_name,
            response.data.data.userProfile.last_name
          ),
          timestamp: new Date().getTime(),
          type: response.data.data.userProfile.user_type,
          id: response.data.data.userProfile.id,
        })
      );
      setCookie("accesstoken", response.data.data.token);
      setuserdata(response.data.data.userProfile);
      setuser(response.data.data.userProfile.id);
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      if (router.query.next) {
        router.push(router.query.next);
      } else if (response.data.data.userProfile.is_waiting_active) {
        router.push("/dashboard/w");
      } else if (response.data.data.userProfile.user_type === "parent")
        router.push("/dashboard/p");
      else router.push("/dashboard/k");
      if (onlyLogin) {
        setshowauth(false);
        router.reload();
      }
    } else {
      seterror(response?.data.message || "Cannot reach server");
      setloading(false);
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
          router.push("/dashboard/p");
        else router.push("/dashboard/k");
      } else {
        seterror(response?.data.message || "Cannot reach server");
      }
    } else {
      seterror("");
    }
  }

  useEffect(() => {
    seterror("");
  }, [email, password]);
  return (
    <div
      className={styles.logindetails}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSignin();
        }
      }}
    >
      <ModernInputBox
        placeholder="Email address/username"
        value={email}
        setvalue={setemail}
        emailonFocus={true}
      />
      <div className={styles.passwordBox}>
        <ModernInputBox
          placeholder="Password"
          value={password}
          setvalue={setpassword}
          secure={passhidden}
          extrastyle={{ margin: 0 }}
        />
        <p className={styles.show} onClick={() => setpasshidden(!passhidden)}>
          {passhidden ? "Show" : "Hide"}
        </p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!loading ? (
        <div className={`${styles.button}`} onClick={handleSignin}>
          Sign In
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
      
      <GoogleLogin
        clientId={GClientId}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={styles.google}
          >
            <GoogleSvg />
            <p style={{ pointerEvents: "none" }}>Continue with Google</p>
          </div>
        )}
        onSuccess={handlegoogleLogin}
        onFailure={handlegoogleLogin}
        cookiePolicy={"single_host_origin"}
      />
      <div className={styles.or}>OR</div>
      {/* <AppleLogin
        clientId={apple_client_id || "asd"}
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
      /> */}
      {/* {!onlyLogin && (
        <div className={styles.reset} onClick={() => setmode("reset")}>
          <span> Forgot password?</span>
        </div>
      )} */}
    </div>
  );
}

export default AuthLogin;
