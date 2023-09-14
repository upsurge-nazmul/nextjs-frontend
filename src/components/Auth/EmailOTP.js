import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/emailOtp.module.scss";
import OtpInput from "./OtpInput";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";

export default function EmailOTP({
  userphone,
  setshowOTP,
  setEmail = () => {},
}) {
  const [OTP, setOTP] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [error, seterror] = useState(null);
  const [showmodal, setshowmodal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    seterror("");
  }, [OTP]);

  async function verifyOtp() {
    let response = await DashboardApis.changeChildFamily({
      parent_email: userphone,
      otp: OTP.toString(),
    });
    console.log("response", response);
    if (response && response.data && response.data.success) {
      if (response.data.message === "Email OTP verified") {
        mixpanel.track("ChangePhoneno", { event: "Email OTP verified" });
        fbq("trackCustom", "OTP", { event: "OTP-verified" });
        dataLayer.push({ event: "otp-verified" });
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        setEmail(response.data.data.parent_email);
        setshowmodal(false);
      } else {
        seterror(response.data.message || "Cannot connect to server");
      }
    } else {
      seterror(response.data.message || "Cannot connect to server");
    }
  }

  async function resendOtp() {
    let response = await LoginApis.genotp({ phone: userphone });
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
              <div
                className={styles.background}
                onClick={() => {
                  setshowOTP(false);
                }}
              ></div>
              <div className={styles.authcontainer}>
                <p className={styles.notverifiedtext}>
                  {`We have sent OTP to your parent's email`}
                </p>
                <div className={styles.otpHeadWrapper}>
                  <p className={styles.text}>
                    {`Please enter the OTP sent to`}
                  </p>
                  <p className={styles.phone}>{userphone}</p>
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
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
