import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/otpnotverified.module.scss";
import OtpInput from "react-otp-input";
import LoginApis from "../../actions/apis/LoginApis";
export default function OtpNotVerfied({ userphone, setphoneverified }) {
  const [phone, setphone] = useState(userphone || "");
  const [OTP, setOTP] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [error, seterror] = useState(null);

  useEffect(() => {
    seterror("");
  }, [OTP]);
  async function verifyOtp() {
    let response = await LoginApis.verifyotp({ otp: OTP.toString() });
    if (response.data.success) {
      settoastdata({ show: true, msg: response.data.message, type: "success" });
      setphoneverified(true);
    } else {
      seterror(response.data.message || "Cannot connect to server");
    }
  }

  async function resendOtp() {
    let response = await LoginApis.genotp({ phone: phone });
    if (response.data.success) {
      settoastdata({ show: true, msg: response.data.message, type: "success" });
    } else {
      seterror(response.data.message || "Cannot connect to server");
    }
  }
  return (
    <div className={styles.otpnotverified}>
      <Toast data={toastdata} />
      <AnimatePresence>
        <div className={styles.authContentWrapper}>
          <div className={styles.background}></div>
          <div className={styles.authcontainer}>
            <p className={styles.notverifiedtext}>
              Your phone is not yet verified, please enter the otp to continue.
            </p>
            <div className={styles.otpHeadWrapper}>
              <p className={styles.text}>
                Enter the 6-digit code sent to you at
              </p>
              <p className={styles.phone}>{"+91 " + phone}</p>
            </div>
            {error && <p className={styles.error}>{error}</p>}

            <OtpInput
              value={OTP}
              inputStyle={{ margin: "5px", width: "50px" }}
              onChange={(otp) => {
                setOTP(otp);
              }}
              numInputs={6}
            />

            <div className={styles.resendButton} onClick={() => resendOtp()}>
              Resend OTP
            </div>

            <div className={styles.button} onClick={() => verifyOtp()}>
              Continue
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
