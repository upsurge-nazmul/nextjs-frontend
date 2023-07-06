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
        <div
          className={`${styles.button}`}
          // onClick={handleSignin}
        >
          Log In
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
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
        // onSuccess={handlegoogleLogin}
        // onFailure={handlegoogleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default AuthLogin;
