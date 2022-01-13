import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import AppleSvg from "../SVGcomponents/AppleSvg";
import GoogleLogin from "react-google-login";
import { MainContext } from "../../context/Main";
import { apple_client_id, GClientId } from "../../../config";
import AppleLogin from "react-apple-login";
import { useRouter } from "next/dist/client/router";
import ModernInputBox from "../ModernInputBox";

export default function AuthResetPass({
  setsignupmethod,
  settoastdata,
  usertype,
  setmode,
  setemail,
  email,
  error,
  seterror,
}) {
  const { firstName, setfirstName, lastName, setlastName } =
    useContext(MainContext);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  async function ResetPass(e) {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      let response = await LoginApis.resetpass({ email: email });
      if (response) {
        if (response.data.success) {
          settoastdata({
            show: true,
            msg: response.data.message,
            type: "success",
          });
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }

  useEffect(() => {
    seterror("");
  }, [email]);
  return (
    <div
      className={styles.parent}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          ResetPass(e);
        }
      }}
    >
      <ModernInputBox
        placeholder="Email address"
        value={email}
        setvalue={setemail}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div
        className={styles.button}
        onClick={(e) => {
          ResetPass(e);
        }}
      >
        Reset password
      </div>
    </div>
  );
}
