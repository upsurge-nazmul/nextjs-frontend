import React, { useContext, useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Auth/auth.module.scss";
import { useRouter } from "next/dist/client/router";
import validator from "validator";
import OTPCustomComponent from "../OTPCustomComponent";
import Spinner from "../Spinner";
function AuthOtpComponent({
  phone,
  email,
  password,
  setuserdata,
  settoastdata,
  mode,
  setmode,
  error,
  seterror,
  username,
}) {
  const [OTP, setOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [resetotp, setresetotp] = useState(0);

  const { firstName, setfirstName, lastName, setlastName } =
    useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    seterror("");
  }, [password, firstName, phone, mode, OTP]);

  async function verifyOtp() {
    setloading(true);
    let response = await LoginApis.verifyotp({ otp: OTP, phone });
    if (response.data.success) {
      setuserdata(response.data.data.user);
      settoastdata({ show: true, msg: response.data.message, type: "success" });
      localStorage.setItem("islogged", true);
      setmode("privacy");
    } else {
      seterror(response.data.message || "Cannot reach server");
      setloading(false);
    }
  }
  async function resendOtp() {
    setloading(true);

    let response = await LoginApis.genotp({ phone: phone });
    if (response.data.success) {
      settoastdata({ show: true, msg: response.data.message, type: "success" });
    } else {
      setloading(false);
      seterror(response.data.message || "Cannot reach server");
    }
  }

  // async function resendOtp() {
  //   let response = await LoginApis.genotp({ phone: phone });
  //   if (response.data.success) {
  //     settoastdata({ show: true, msg: response.data.message, type: "success" });
  //   } else {
  //     seterror(response.data.message || "Cannot reach server");
  //   }
  // }
  return (
    <div
      className={styles.otp}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          verifyOtp();
        }
      }}
    >
      <div className={styles.otpHeadWrapper}>
        <p className={styles.text}>Enter the 6-digit code sent to you at</p>
        <p className={styles.phone}>{"+91 " + phone}</p>
      </div>
      <OTPCustomComponent resetotp={resetotp} setotp={setOTP} size={6} />
      {error && <p className={styles.error}>{error}</p>}
      <div
        className={styles.resendButton}
        onClick={() => {
          setresetotp((prev) => prev + 1);
          resendOtp();
        }}
      >
        Resend OTP
      </div>
      {!loading ? (
        <div className={`${styles.button}`} onClick={verifyOtp}>
          Continue
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default AuthOtpComponent;
