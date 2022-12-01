import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/otpnotverified.module.scss";
import OtpInput from "react-otp-input";
import LoginApis from "../../actions/apis/LoginApis";
import ChangePhoneNo from "./ChangePhoneNo";
import { useRouter } from "next/dist/client/router";

export default function OtpNotVerfied({
  userphone,
  setphoneverified,
  setChangePhoneView,
  email,
}) {
  const [phone, setphone] = useState(userphone || "");
  const [OTP, setOTP] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [error, seterror] = useState(null);
  const [changePhone, setChangePhone] = useState("otp");
  const [showmodal, setshowmodal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    seterror("");
  }, [OTP]);
  async function verifyOtp() {
    let response = await LoginApis.verifyotp({ otp: OTP.toString() });
    if (response.data.success) {
      mixpanel.track("ChangePhoneno", { event: "OTP verified" });
      fbq("trackCustom", "OTP", { event: "OTP-verified" });
      dataLayer.push({ event: "otp-verified" });
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
        {showmodal ? (
          <>
            <div className={styles.authContentWrapper}>
              <div className={styles.background}></div>
              {changePhone === "otp" ? (
                <div className={styles.authcontainer}>
                  <p className={styles.notverifiedtext}>
                    Your phone is not yet verified, please enter the otp to
                    continue.
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

                  <div
                    className={styles.resendButton}
                    onClick={() => resendOtp()}
                  >
                    Resend OTP
                  </div>
                  <div
                    className={styles.resendButton}
                    onClick={() => setChangePhone()}
                  >
                    Change Phone Number
                  </div>

                  <div className={styles.button} onClick={() => verifyOtp()}>
                    Continue
                  </div>
                  <div className={styles.agreement}>
                    <div className={styles.agreementText}>
                      By continuing you agree to our{" "}
                      <button
                        className={styles.agreementLinks}
                        onClick={() => {
                          router.push("/privacy-policy");
                        }}
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        className={styles.agreementLinks}
                        onClick={() => {
                          router.push("/privacy-policy");
                        }}
                      >
                        Privacy Policy
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.authcontainer}>
                  <ChangePhoneNo
                    phone={phone}
                    setphone={setphone}
                    email={email}
                    error={error}
                    seterror={seterror}
                    settoastdata={settoastdata}
                    setmode={setChangePhone}
                    setshowmodal={setshowmodal}
                  />
                </div>
              )}
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
