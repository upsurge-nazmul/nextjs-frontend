import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/otpnotverified/changePasswordOtp.module.scss";
import OtpInput from "./OtpInput";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";
import ReactTooltip from "react-tooltip";
import CircleTick from "../SVGcomponents/CircleTick";
import CircleWarning from "../SVGcomponents/CircleWarning";
import validator from "validator";

export default function ChangePasswordOTP({
  userPhone = null,
  userEmail = null,
  handleOutsideClick = () => {},
}) {
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [error, seterror] = useState(null);
  const [showmodal, setshowmodal] = useState(true);
  const [passisweak, setpassisweak] = useState(false);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });

  const router = useRouter();

  useEffect(() => {
    seterror("");
  }, [OTP]);

  useEffect(() => {
    seterror("");
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);

  async function updatePassword() {
    if (!passisweak) {
      const response = await DashboardApis.updatechildprofile({
        password: password,
        otp: OTP,
      });
      console.log("response", response);
      if (response && response.data && response.data.success) {
        mixpanel.track("ChangePhoneno", { event: response.data.message });
        fbq("trackCustom", "OTP", { event: "OTP-verified" });
        dataLayer.push({ event: "otp-verified" });
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        setshowmodal(false);
      } else {
        seterror(response.data.message || "Cannot connect to server");
      }
    } else {
      seterror("Please use a strong password");
    }
  }

  function checkLength(pass) {
    return pass.length >= 8;
  }
  function checkLower(pass) {
    return !(pass.search(/[a-z]/) < 0);
  }
  function checkUpper(pass) {
    // password.search(/.*[A-Z].*/) > 0)
    return !(pass.search(/[A-Z]/) < 0);
  }
  function checkNumber(pass) {
    return !(pass.search(/[0-9]/) < 0);
  }
  function checkSpecial(pass) {
    return !(pass.search(/[!@#$%^&*]/) < 0);
  }

  function validatePassword(e) {
    let pass = e.target.value.trim();
    setPassword(pass);
    let res = {
      length: checkLength(pass),
      lower: checkLower(pass),
      upper: checkUpper(pass),
      special: checkSpecial(pass),
      number: checkNumber(pass),
    };
    setpasserror(res);
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
                onClick={handleOutsideClick}
              ></div>
              <div className={styles.authcontainer}>
                <p className={styles.notverifiedtext}>
                  {`We have sent OTP to your parent's phone`}
                </p>
                <div className={styles.otpHeadWrapper}>
                  <p className={styles.text}>
                    {`Please enter the OTP sent to`}
                  </p>
                  <p className={styles.phone}>
                    {userPhone ? "+91" + userPhone : userEmail}
                  </p>
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

                <div className={styles.passArea}>
                  {password !== "" && passisweak && (
                    <>
                      <p
                        data-tip
                        data-for="weak-pass"
                        className={styles.weakpasstext}
                      >
                        Weak password
                      </p>
                      <ReactTooltip id="weak-pass" type="dark" effect="solid">
                        <p>A strong pass is :</p>
                        <p>- At least 8 characters</p>
                        <p>- A mixture of letters and numbers</p>
                        <p>
                          - A mixture of both uppercase and lowercase letters
                        </p>
                        <p>- Inclusion of at least one special character</p>
                      </ReactTooltip>
                    </>
                  )}
                  <div className={styles.passwordBox}>
                    {showdetailpass && (
                      <div className={styles.detailPass}>
                        <div className={styles.arrow}></div>
                        <div className={styles.tab}>
                          {passerror.length ? (
                            <CircleTick />
                          ) : (
                            <CircleWarning />
                          )}
                          <p className={styles.text}>8 Characters long</p>
                        </div>
                        <div className={styles.tab}>
                          {passerror.upper ? <CircleTick /> : <CircleWarning />}
                          <p className={styles.text}>Uppercase letter</p>
                        </div>
                        <div className={styles.tab}>
                          {passerror.lower ? <CircleTick /> : <CircleWarning />}
                          <p className={styles.text}>Lowercase letter</p>
                        </div>
                        <div className={styles.tab}>
                          {passerror.special ? (
                            <CircleTick />
                          ) : (
                            <CircleWarning />
                          )}
                          <p className={styles.text}>Special Character </p>
                        </div>
                        <div className={styles.tab}>
                          {passerror.number ? (
                            <CircleTick />
                          ) : (
                            <CircleWarning />
                          )}
                          <p className={styles.text}>Number</p>
                        </div>
                      </div>
                    )}
                    <input
                      type={passhidden ? "password" : "text"}
                      onFocus={() => setshowdetailpass(true)}
                      onBlur={() => setshowdetailpass(false)}
                      placeholder="New Password"
                      value={password}
                      className={
                        password !== "" && passisweak ? styles.weakpass : ""
                      }
                      onChange={validatePassword}
                      required
                    />
                    <p
                      className={styles.show}
                      onClick={() => setpasshidden(!passhidden)}
                    >
                      {passhidden ? "Show" : "Hide"}
                    </p>
                  </div>
                </div>

                <div className={styles.button} onClick={updatePassword}>
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
