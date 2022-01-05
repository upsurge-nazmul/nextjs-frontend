import React, { useContext, useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Auth/auth.module.scss";
import { useRouter } from "next/dist/client/router";
import validator from "validator";
import OTPCustomComponent from "../OTPCustomComponent";
function AuthOtpComponent({
  phone,
  email,
  password,
  setuserdata,
  settoastdata,
  setmode,
  error,
  seterror,
  username,
}) {
  const [OTP, setOTP] = useState("");
  const { firstName, setfirstName, lastName, setlastName } =
    useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    seterror("");
  }, [password, firstName, phone, mode]);
  async function handleUpdateData() {
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
      setmode("data");
    } else {
      router.push("/waitlist/" + email);
    }
  }

  async function genotp() {
    if (!validator.isEmail(email)) {
      seterror("Invalid Email");
      return;
    }
    if (!username) {
      seterror("Username is required");
      return;
    }
    if (username.length > 8) {
      seterror("Username cannot contain more than 8 characters");
      return;
    }
    if (username.length < 4) {
      seterror("Username cannot contain less than 4 characters");
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
      return;
    }

    let checkemail = await LoginApis.checkemail({ email, waitlist: true });
    if (checkemail && checkemail.data && !checkemail.data.success) {
      console.log("email ok");
    } else {
      seterror(checkemail?.data.message || "Error connecting to server");
      return;
    }
    let checkphone = await LoginApis.checkphone({ phone });
    if (checkphone && checkphone.data && checkphone.data.success) {
      console.log("phone ok");
    } else {
      seterror(checkphone?.data.message || "Error connecting to server");
      return;
    }
    if (!firstName) {
      seterror("First name is required");
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
    <div className={styles.otp}>
      <div className={styles.otpHeadWrapper}>
        <p className={styles.text}>Enter the 6-digit code sent to you at</p>
        <p className={styles.phone}>{"+91 " + phone}</p>
      </div>
      <OTPCustomComponent
        setotp={setOTP}
        size={6}
        inputstyle={{ padding: "20px !important" }}
      />
      <div className={styles.resendButton} onClick={genotp}>
        Resend OTP
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.button} onClick={() => handleUpdateData()}>
        Continue
      </div>
    </div>
  );
}

export default AuthOtpComponent;
