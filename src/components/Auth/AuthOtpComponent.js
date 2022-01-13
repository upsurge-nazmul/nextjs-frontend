import React, { useContext, useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Auth/auth.module.scss";
import { useRouter } from "next/dist/client/router";
import validator from "validator";
import OTPCustomComponent from "../OTPCustomComponent";
import Spinner from "../Spinner";
function AuthOtpComponent({
  phone,
  email,
  password,
  setuserdata,
  settoastdata,
  mode,
  setmode,
  error,
  seterror,
  username,
}) {
  const [OTP, setOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [resetotp, setresetotp] = useState(0);

  const { firstName, setfirstName, lastName, setlastName } =
    useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    seterror("");
  }, [password, firstName, phone, mode, OTP]);
  async function handleUpdateData() {
    setloading(true);
    let response = await LoginApis.saveemail({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      otp: OTP,
      user_name: username,
    });

    if (response && !response.data.success) {
      seterror(response.data.message || "Error connecting to server");
      setloading(false);
    } else {
      router.push("/waitlist/" + email);
    }
  }

  async function genotp() {
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
      settoastdata({ type: "success", msg: "OTP sent", show: true });
    }
    setloading(false);
  }
  // async function verifyOtp() {
  //   let response = await LoginApis.verifyotp({ otp: OTP });
  //   if (response.data.success) {
  //     setuserdata(response.data.data.user);
  //     settoastdata({ show: true, msg: response.data.message, type: "success" });
  //     localStorage.setItem("islogged", true);
  //     setmode("privacy");
  //   } else {
  //     seterror(response.data.message || "Cannot reach server");
  //   }
  // }
  // async function resendOtp() {
  //   let response = await LoginApis.genotp({ phone: phone });
  //   if (response.data.success) {
  //     settoastdata({ show: true, msg: response.data.message, type: "success" });
  //   } else {
  //     seterror(response.data.message || "Cannot reach server");
  //   }
  // }
  return (
    <div
      className={styles.otp}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleUpdateData();
        }
      }}
    >
      <div className={styles.otpHeadWrapper}>
        <p className={styles.text}>Enter the 6-digit code sent to you at</p>
        <p className={styles.phone}>{"+91 " + phone}</p>
      </div>
      <OTPCustomComponent resetotp={resetotp} setotp={setOTP} size={6} />
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
        <div className={`${styles.button}`} onClick={handleUpdateData}>
          Continue
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default AuthOtpComponent;
