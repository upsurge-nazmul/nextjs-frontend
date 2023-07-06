import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Auth/authLogin.module.scss";
import { setCookie, eraseCookie, getCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import ModernInputBox from "../ModernInputBox";
import Spinner from "../Spinner";
import GoogleLogin from "react-google-login";
import { GClientId } from "../../../config";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import { getfullname } from "../../helpers/generalfunctions";
import { setUserInLocalStorage } from "../../helpers/localStorage";
import { vaildateEmail } from "../../helpers/validationHelpers";

const TABS = [
  { id: "child", name: "Child" },
  { id: "parent", name: "Parent" },
];

function AuthLogin({
  settoastdata,
  error,
  seterror,
  onlyLogin,
  setshowauth,
  type,
}) {
  const { setSavedUsers, setuserdata, setuser } = useContext(MainContext);

  const [currentTab, setCurrentTab] = useState(TABS[0].id);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  async function handleSignin() {
    setloading(true);
    if (!password) {
      seterror("Please enter your password");
      setloading(false);
      return;
    }
    let userInput;
    if (currentTab === TABS[1].id) {
      if (!email) {
        seterror(`Please enter your email`);
        setloading(false);
        return;
      } else if (!vaildateEmail(email)) {
        seterror(`Please enter a valid email`);
        setloading(false);
        return;
      } else userInput = email;
    }
    if (currentTab === TABS[0].id) {
      if (!username) {
        seterror(`Please enter your username`);
        setloading(false);
        return;
      } else userInput = username;
    }

    seterror("");
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"accesstoken"}=`);
    let token;
    if (parts.length === 2) token = parts.pop().split(";").shift();
    let response = await LoginApis.login(
      { email: userInput, password, type },
      token
    );
    if (response && response.data && response.data.success) {
      mixpanel.track("Login", { event: `${userInput} logged in` });
      mixpanel.identify(`${userInput}`);
      mixpanel.people.set({
        $name: getfullname(
          response.data.data.userProfile.first_name,
          response.data.data.userProfile.last_name
        ),
        $email: userInput,
        "$user-id": response.data.data.userProfile.id,
      });
      setSavedUsers(
        setUserInLocalStorage({
          token: response.data.data.token,
          email: response.data.data.userProfile.email,
          phone: response.data.data.userProfile.phone,
          parent_email: response.data.data.userProfile.parent_email,
          parent_phone: response.data.data.userProfile.parent_phone,
          parent_first_login: response.data.data.userProfile.parent_first_login,
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
    } else if (getCookie("accesstoken")) {
      eraseCookie("accesstoken");
      handleSignin();
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
  }, [email, username, password]);

  return (
    <div
      className={styles.logindetails}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSignin();
        }
      }}
    >
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${
              tab.id === currentTab ? styles.tab__active : ""
            }`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className={styles.inputs}>
        {currentTab === TABS[1].id ? (
          <ModernInputBox
            placeholder="Email"
            value={email}
            setvalue={setemail}
            emailonFocus={true}
          />
        ) : (
          <ModernInputBox
            placeholder="Username"
            value={username}
            setvalue={setusername}
            emailonFocus={true}
          />
        )}
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
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!loading ? (
        <div className={`${styles.button}`} onClick={handleSignin}>
          Log In
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
      {currentTab === TABS[1].id && (
        <>
          <div className={styles.loginOption}>
            <div className={styles.dash} />
            <div className={styles.or}>OR</div>
            <div className={styles.dash} />
          </div>
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
        </>
      )}
    </div>
  );
}

export default AuthLogin;
