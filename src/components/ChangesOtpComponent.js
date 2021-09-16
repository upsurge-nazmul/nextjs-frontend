import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import LoginApis from "../actions/apis/LoginApis";
import styles from "../styles/GeneralComponents/changesotpcomponent.module.scss";
import BackButtonSvg from "./SVGcomponents/BackButtonSvg";

export default function ChangesOtpComponent({
  phone,
  password,
  settoastdata,
  onBack,
  handleSave,
}) {
  const [OTP, setOTP] = useState("");

  async function verifyOtp() {
    let response = await LoginApis.verifyotp({ otp: OTP, phone });
    if (response.data.success) {
      settoastdata({ show: true, msg: "Saved Successfully", type: "success" });
      onBack();
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
    <div className={styles.changesotpcomponent}>
      <div className={styles.background} onClick={onBack} />
      <div className={styles.otp}>
        <div className={styles.heading}>
          <BackButtonSvg onClick={onBack} />
          Change Phone Number
        </div>
        <div className={styles.otpHeadWrapper}>
          <p className={styles.text}>Enter the 6-digit code sent to you at</p>
          <p className={styles.phone}>{"+91 " + phone}</p>
        </div>
        <div className={styles.otpWrapper} id="otpWrapper">
          <OtpInput
            value={OTP}
            inputStyle={{ margin: "5px", width: "50px" }}
            onChange={(otp) => setOTP(otp)}
            numInputs={6}
            containerStyle={{
              "justify-content": "center",
              "margin-top": "20px",
            }}
          />
        </div>
        <div className={styles.resendButton} onClick={resendOtp}>
          Resend OTP
        </div>
        <div className={styles.button} onClick={() => verifyOtp()}>
          Continue
        </div>
      </div>
    </div>
  );
}
