import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import LoginApis from "../../actions/apis/LoginApis";
import styles from "../../styles/Auth/auth.module.scss";

function AuthOtpComponent({
  phone,
  email,
  password,
  setuserdata,
  settoastdata,
  setmode,
}) {
  const [OTP, setOTP] = useState("");

  async function verifyOtp() {
    let response = await LoginApis.verifyotp({ OTP });
    if (response.data.success) {
      setuserdata(response.data.data.user);
      settoastdata({ show: true, msg: response.data.message, type: "success" });
      localStorage.setItem("islogged", true);
      setmode("privacy");
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  }
  async function resendOtp() {
    let response = await LoginApis.genotp({ phone: phone });
    if (response.data.success) {
      settoastdata({ show: true, msg: response.data.message, type: "success" });
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  }
  return (
    <div className={styles.otp}>
      <div className={styles.otpHeadWrapper}>
        <p className={styles.text}>Enter the 4-digit code sent to you at</p>
        <p className={styles.phone}>{"+91 " + phone}</p>
      </div>
      <OtpInput
        value={OTP}
        inputStyle={{ margin: "5px", width: "50px" }}
        onChange={(otp) => setOTP(otp)}
        numInputs={6}
        containerStyle={{ "justify-content": "center", "margin-top": "20px" }}
      />
      <div className={styles.resendButton} onClick={resendOtp}>
        Resend OTP
      </div>
      <div className={styles.button} onClick={() => verifyOtp()}>
        Continue
      </div>
    </div>
  );
}

export default AuthOtpComponent;
