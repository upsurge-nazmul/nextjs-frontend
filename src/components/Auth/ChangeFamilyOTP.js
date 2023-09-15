import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/emailOtp.module.scss";
import OtpInput from "./OtpInput";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";

export default function ChangeFamilyOTP({
  userPhone = null,
  userEmail = null,
  setShowOTP = () => {},
  setEmail = () => {},
  setPhone = () => {},
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
    let data = userEmail
      ? { parent_email: userEmail, otp: OTP.toString() }
      : { parent_phone: userPhone, otp: OTP.toString() };
    let response = await DashboardApis.changeChildFamily(data);
    console.log("response", response);
    if (response && response.data && response.data.success) {
      let responseMessage = userEmail
        ? "Email OTP verified"
        : "Phone OTP verified";
      if (response.data.message === responseMessage) {
        mixpanel.track("ChangePhoneno", { event: responseMessage });
        fbq("trackCustom", "OTP", { event: "OTP-verified" });
        dataLayer.push({ event: "otp-verified" });
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        if (userEmail) setEmail(response.data.data.parent_email);
        if (userPhone) setPhone(response.data.data.parent_phone);
        setshowmodal(false);
      } else {
        seterror(response.data.message || "Cannot connect to server");
      }
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
                onClick={() => setShowOTP(false)}
              ></div>
              <div className={styles.authcontainer}>
                <p className={styles.notverifiedtext}>
                  {`We have sent OTP to your parent's email`}
                </p>
                <div className={styles.otpHeadWrapper}>
                  <p className={styles.text}>
                    {`Please enter the OTP sent to`}
                  </p>
                  <p className={styles.phone}>{userPhone || userEmail}</p>
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
