import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/waitlistpopup.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import OTPCustomComponent from "./OTPCustomComponent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Spinner from "./Spinner";

export default function WaitlistPopUp({
  email,
  setemail,
  setshowpopup,
  subscribe,
  settoastdata,
}) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [phone, setphone] = useState("");
  const [mode, setmode] = useState("data"); // data and otp
  const [resetotp, setresetotp] = useState(0);
  const router = useRouter();
  useEffect(() => {
    seterror("");
  }, [firstName, lastName, phone, mode, username, OTP]);

  async function handleUpdateData() {
    setloading(true);
    if (subscribe) {
      let response = await LoginApis.addtonewslettersubs({
        email: email,
        first_name: firstName,
        phone: phone,
        last_name: lastName,
        otp: OTP,
      });
      if (response) {
        if (response.data.success) {
          if (response.data.message === "Exists") {
            seterror("Email already subscribed, please use another email");
            setmode("data");
          } else {
            router.push("/subscribed");
          }
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
    } else {
      let response = await LoginApis.saveemail({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        otp: OTP,
        user_name: username,
      });

      if (!response || !response.data.success) {
        seterror(response.data.message || "Error connecting to server");
      } else {
        router.push("/waitlist/" + email);
      }
    }
    setloading(false);
  }

  async function genotp() {
    setOTP("");
    setloading(true);
    if (!validator.isEmail(email)) {
      seterror("Invalid Email");
      setloading(false);
      return;
    }
    if (!username) {
      seterror("Username is required");
      setloading(false);
      return;
    }
    if (username.length > 8) {
      seterror("Username cannot contain more than 8 characters");
      setloading(false);
      return;
    }
    if (username.length < 4) {
      seterror("Username cannot contain less than 4 characters");
      setloading(false);
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
      setloading(false);
      return;
    }
    let checkemail = await LoginApis.checkemail({ email, waitlist: true });
    if (checkemail && checkemail.data && !checkemail.data.success) {
      console.log("email ok");
    } else {
      seterror(checkemail?.data.message || "Error connecting to server");
      setloading(false);
      return;
    }
    let checkphone = await LoginApis.checkphone({ phone });
    if (checkphone && checkphone.data && checkphone.data.success) {
      console.log("phone ok");
    } else {
      seterror(checkphone?.data.message || "Error connecting to server");
      setloading(false);
      return;
    }
    if (!firstName) {
      seterror("First name is required");
      setloading(false);
      return;
    }
    let response = await LoginApis.getearlyaccess({
      email: email,
      first_name: firstName,
      phone: phone,
      last_name: lastName,
      user_name: username,
    });
    if (!response || !response.data.success) {
      seterror(response.data.message || "Error connecting to server");
    } else {
      if (mode === "otp") {
        settoastdata({ type: "success", msg: "OTP sent", show: true });
      } else setmode("otp");
    }
    setloading(false);
  }

  return (
    <div
      className={styles.waitlistpopup}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          if (mode !== "otp") genotp();
          else handleUpdateData();
        }
      }}
    >
      <div
        className={styles.background}
        onClick={() => setshowpopup(false)}
      ></div>

      {mode !== "otp" ? (
        <div className={styles.block}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <p className={styles.heading}>We need some more information</p>
          <input
            type="text"
            placeholder="Email address*"
            value={email}
            setvalue={setemail}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Username*"
            value={username}
            maxLength={8}
            setvalue={setusername}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <div className={styles.phoneWrapper}>
            <p>+91</p>{" "}
            <input
              type="text"
              placeholder="Phone*"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                if (!isNaN(e.target.value)) setphone(e.target.value);
              }}
            />
          </div>
          <div className={styles.nameWrapper}>
            <input
              type="text"
              placeholder="First Name*"
              maxLength={10}
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <input
              maxLength={10}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {!loading ? (
            <div className={styles.button} onClick={() => genotp()}>
              Join
            </div>
          ) : (
            <div className={`${styles.button} ${styles.loadin_btn}`}>
              <Spinner />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.otpblock}>
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.otpHeadWrapper}>
            <p className={styles.text}>Enter the 6-digit code sent to you at</p>
            <p className={styles.phone}>{"+91 " + phone}</p>
          </div>
          <div className={styles.otpWrapper} id="otpWrapper">
            <OTPCustomComponent resetotp={resetotp} setotp={setOTP} size={6} />
          </div>
          {error && <p className={styles.error}>{error}</p>}

          <div
            className={styles.resendButton}
            onClick={() => {
              setresetotp((prev) => prev + 1);
              genotp();
            }}
          >
            Resend OTP
          </div>
          {!loading ? (
            <div className={styles.button} onClick={() => handleUpdateData()}>
              Continue
            </div>
          ) : (
            <div className={`${styles.button} ${styles.loadin_btn}`}>
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
