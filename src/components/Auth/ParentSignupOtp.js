import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/parentSignupOtp.module.scss";
import OtpInput from "react-otp-input";
import LoginApis from "../../actions/apis/LoginApis";
import ChangePhoneNo from "./ChangePhoneNo";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
import { setUserInLocalStorage } from "../../helpers/localStorage";
import { getfullname } from "../../helpers/generalfunctions";
import { setCookie } from "../../actions/cookieUtils";

export default function ParentSignupOtp({ parentData }) {
  const { setSavedUsers, setuserdata, setuser, userdata } =
    useContext(MainContext);
  const [phone, setphone] = useState();
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
    if (parentData && parentData.userProfile) {
      setphone(parentData.userProfile.phone);
    }
  }, [parentData]);

  useEffect(() => {
    seterror("");
  }, [OTP]);
  async function verifyOtp() {
    let response = await LoginApis.verifyotp({
      otp: OTP.toString(),
      phone: parentData.userProfile.phone,
      userId: parentData.userProfile.id,
    });
    if (response.data.success) {
      mixpanel.track("ChangePhoneno", { event: "OTP verified" });
      fbq("trackCustom", "OTP", { event: "OTP-verified" });
      dataLayer.push({ event: "otp-verified" });

      setSavedUsers(
        setUserInLocalStorage({
          token: parentData.token,
          email: parentData.userProfile.email,
          phone: parentData.userProfile.phone,
          parent_email: parentData.userProfile.parent_email,
          parent_phone: parentData.userProfile.parent_phone,
          parent_first_login: parentData.userProfile.parent_first_login,
          username: parentData.userProfile.user_name,
          image: parentData.userProfile.user_img_url,
          name: getfullname(
            parentData.userProfile.first_name,
            parentData.userProfile.last_name
          ),
          timestamp: new Date().getTime(),
          type: parentData.userProfile.user_type,
          id: parentData.userProfile.id,
        })
      );
      setCookie("accesstoken", parentData.token);
      setuserdata(parentData.userProfile);
      setuser(parentData.userProfile.id);
      settoastdata({ show: true, msg: response.data.message, type: "success" });
      if (router.query.next) {
        router.push(router.query.next);
      } else if (parentData.userProfile.is_waiting_active) {
        router.push("/dashboard/w");
      } else if (parentData.userProfile.user_type === "parent")
        router.push("/dashboard/p");
      else router.push("/dashboard/k");
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
              <div className={styles.authcontainer}>
                <p className={styles.notverifiedtext}>
                  You have to verify your phone again to set your password.
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
