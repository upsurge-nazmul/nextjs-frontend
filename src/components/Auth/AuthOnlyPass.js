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
import AppleLogin from "react-apple-login";
import AppleSvg from "../SVGcomponents/AppleSvg";
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
  prefilled,
}) {
  const { setSavedUsers, setuserdata, setuser, userdata } =
    useContext(MainContext);
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  console.log("@@@@@@@@@", prefilled);

  // login Function
  async function handleSignin() {
    if (userdata.user_id === prefilled.id) {
      return;
    }
    let response = await LoginApis.checktoken({
      token: prefilled.token,
    });
    if (response && !response?.data?.success) {
      settoastdata({
        show: true,
        msg: "Token expired",
        type: "error",
      });
      let savedUsersData = localStorage.getItem("savedUsers");
      if (savedUsersData) {
        savedUsersData = JSON.parse(savedUsersData);
        const index = savedUsersData.findIndex(
          (item) => item.id === prefilled.id
        );
        if (index !== -1) {
          savedUsersData.splice(index, 1);
        }
        localStorage.setItem("savedUsers", JSON.stringify(savedUsersData));
        setSavedUsers(savedUsersData);
      }
    } else {
      settoastdata({
        show: true,
        msg: "Account switched",
        type: "success",
      });
      setCookie("accesstoken", prefilled.token);
      setuserdata(response.data.data);
      setuser(response.data.data.id);
      console.log(router.pathname);
      router.reload();
    }
  }

  useEffect(() => {
    seterror("");
  }, [prefilled, password]);

  return (
    <div
      className={styles.logindetails}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSignin();
        }
      }}
    >
      <div className={styles.onlyPassHeading}>
        Please provide password for this account
      </div>
      <div className={styles.prefilledEmail}>{prefilled.email}</div>
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
    </div>
  );
}

export default AuthLogin;
