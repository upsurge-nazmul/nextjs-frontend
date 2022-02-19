import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/changepass.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import OTPCustomComponent from "./OTPCustomComponent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModernInputBox from "./ModernInputBox";

export default function ChangePassPopUp({
  setchangephone,
  changephone,
  setconfirmphone,
  confirmphone,
  setshowpopup,
  settoastdata,
  handleSave,
  error,
  seterror,
  setshowphoneotp,
  showphoneotp,
  saveprofile,
}) {
  const [OTP, setOTP] = useState("");
  const [mode, setmode] = useState("data"); // data and otp
  useEffect(() => {
    seterror("");
  }, [mode, changephone, confirmphone, OTP]);

  async function genotp() {
    LoginApis.genotp({ phone: changephone }).then((response) => {
      if (response && response.data && response.data.success) {
        settoastdata({
          msg: "Otp sent",
          show: true,
          type: "success",
        });
        setmode("otp");
      } else {
        settoastdata({
          msg: response?.data.message || "Error",
          show: true,
          type: "error",
        });
      }
    });
  }
  return (
    <div className={styles.changepass}>
      <div
        className={styles.background}
        onClick={() => {
          setchangephone("");
          setconfirmphone("");
          setshowpopup(false);
        }}
      ></div>

      {!showphoneotp ? (
        <div className={styles.block}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <p className={styles.heading}>Change Phone</p>
          <ModernInputBox
            value={changephone}
            setvalue={setchangephone}
            placeholder="New phone number"
            numOnly
            maxLength={10}
          />
          <ModernInputBox
            value={confirmphone}
            setvalue={setconfirmphone}
            placeholder="Confirm phone number"
            numOnly
            maxLength={10}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.button} onClick={() => saveprofile()}>
            Send OTP
          </div>
        </div>
      ) : (
        <div className={styles.otpblock}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.otpHeadWrapper}>
            <p className={styles.text}>Enter the 6-digit code sent to you at</p>
            <p className={styles.phone}>{"+91 " + changephone}</p>
          </div>
          <div className={styles.otpWrapper} id="otpWrapper">
            <OTPCustomComponent setotp={setOTP} size={6} />
          </div>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.resendButton} onClick={genotp}>
            Resend OTP
          </div>
          <div className={styles.button} onClick={() => handleSave(OTP)}>
            Continue
          </div>
        </div>
      )}
    </div>
  );
}
