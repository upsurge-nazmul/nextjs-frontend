import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/WaitlistDashboard/authparentlogin.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import ModernInputBox from "../ModernInputBox";
import Spinner from "../Spinner";
import GoogleLogin from "react-google-login";
import { GClientId } from "../../../config";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import { getfullname } from "../../helpers/generalfunctions";
import { setUserInLocalStorage } from "../../helpers/localStorage";
function AuthLoginParent({
  settoastdata,
  error,
  seterror,
  parentEmail,
  token,
}) {
  const { setSavedUsers, setuserdata, setuser, userdata } =
    useContext(MainContext);
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  // login Function
  async function handleSignin() {
    let response = await LoginApis.checktoken({
      token: token,
    });
    console.log(response);
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
      let response = await LoginApis.login({
        email: parentEmail,
        password,
      });
      if (response && response.data && response.data.success) {
        setSavedUsers(
            setUserInLocalStorage({
              token: response.data.data.token,
              email: parentEmail,
              phone: response.data.data.userProfile.phone,
              parent_email:response.data.data.userProfile.parent_email,
              parent_phone:response.data.data.userProfile.parent_phone,
              parent_first_login:response.data.data.userProfile.parent_first_login,
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
        } else {
          seterror(response?.data.message || "Cannot reach server");
          setloading(false);
        }
    }}
  useEffect(() => {
    seterror("");
  }, [parentEmail, password]);

  return (
    <div className={styles.loginContainer}>
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
      <div className={styles.prefilledEmail}>{parentEmail}</div>
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
    </div>
  );
}

export default AuthLoginParent;
