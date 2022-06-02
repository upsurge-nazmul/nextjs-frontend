import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/changepass.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import OTPCustomComponent from "./OTPCustomComponent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModernInputBox from "./ModernInputBox";
import DashboardApis from "../actions/apis/DashboardApis";
import { validatePassword } from "../helpers/validationHelpers";

export default function ChangePassPopUp({
  password,
  setpassword,
  confirmpassword,
  setconfirmpassword,
  setshowpopup,
  subscribe,
  settoastdata,
  handleSave,
  phone,
  showpassotp,
  setshowpassotp,
  saveprofile,
  email,
  isEmailOtp,
}) {
  const [OTP, setOTP] = useState("");
  const [mode, setmode] = useState("data");
  const [error, seterror] = useState("");
  const [showotp, setshowotp] = useState(false);
  useEffect(() => {
    seterror("");
  }, [password, mode, confirmpassword]);
  useEffect(() => {
    setmode("data");
  }, []);
  async function genotp() {
    if (password !== confirmpassword) {
      seterror("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      seterror(
        "Password must be of length 8 and also must contain minimum 1 number,1 symbol,1 uppercase,1 lowercase"
      );
      return;
    }
    if (isEmailOtp) {
      LoginApis.genemailotp({ email: email, type: "Password" }).then(
        (response) => {
          if (response && response.data && response.data.success) {
            setshowotp(true);
            settoastdata({
              msg: "Otp sent",
              show: true,
              type: "success",
            });
          } else {
            settoastdata({
              msg: response?.data.message || "Error",
              show: true,
              type: "error",
            });
          }
        }
      );
    } else {
      DashboardApis.createVerificationOtp().then((response) => {
        if (response && response.data && response.data.success) {
          settoastdata({
            msg: "Otp sent",
            show: true,
            type: "success",
          });
          setshowotp(true);
        } else {
          settoastdata({
            msg: response?.data.message || "Error",
            show: true,
            type: "error",
          });
        }
      });
    }
  }

  return (
    <div className={styles.changepass}>
      <div
        className={styles.background}
        onClick={() => {
          setpassword("");
          setconfirmpassword("");
          setshowpopup(false);
        }}
      ></div>

      {!showotp ? (
        <div className={styles.block}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <p className={styles.heading}>Change Password</p>
          <ModernInputBox
            value={password}
            setvalue={setpassword}
            placeholder="Password"
            secure={true}
          />
          <ModernInputBox
            value={confirmpassword}
            setvalue={setconfirmpassword}
            placeholder="Confirm Password"
            secure={true}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.button} onClick={() => genotp()}>
            Change
          </div>
        </div>
      ) : (
        <div className={styles.otpblock}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.otpHeadWrapper}>
            <p className={styles.text}>Enter the 6-digit code sent to you at</p>
            <p className={styles.phone}>
              {isEmailOtp ? email : +"91 " + phone}
            </p>
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
