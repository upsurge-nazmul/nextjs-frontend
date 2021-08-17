import React, { useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { setCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Auth/auth.module.scss";
import validator from "validator";
function AuthFullData({
  setphone,
  setpassword,
  phone,
  password,
  settoastdata,
  setmode,
  email,
  signupmethod,
  usertype,
}) {
  const [passhidden, setpasshidden] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  async function handleUpdateData() {
    if (!validator.isMobilePhone(phone, "en-IN")) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Invalid Phone",
      });
      return;
    }
    if (!firstName || !lastName || !password) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Enter Valid Details",
      });
      return;
    }
    if (signupmethod === "email") {
      let response = await LoginApis.signup({
        email: email,
        signup_method: signupmethod,
        user_type: usertype,
        phone,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      if (!response.data.success) {
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "error",
        });
      } else {
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        setCookie("accesstoken", response.data.data.token);
        setmode("otp");
      }
    } else {
      const data = {
        phone,
        password,
        first_name: firstName,
        last_name: lastName,
      };
      // temp changes
      let response = await LoginApis.setphone(data);
      if (response.data.success) {
        settoastdata({
          show: true,
          msg: response.data.message,
          type: "success",
        });
        setmode("otp");
      } else {
        settoastdata({
          show: true,
          msg: "Error while creating account",
          type: "error",
        });
      }
    }
  }
  return (
    <div className={styles.email}>
      <div className={styles.phoneWrapper}>
        <p>+91</p>{" "}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            if (!isNaN(e.target.value)) setphone(e.target.value);
          }}
        />
      </div>
      <div className={styles.nameWrapper}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Name"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <div className={styles.passwordBox}>
        <input
          type={passhidden ? "password" : "text"}
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className={styles.show} onClick={() => setpasshidden(!passhidden)}>
          {passhidden ? "Show" : "Hide"}
        </p>
      </div>
      <div className={styles.button} onClick={() => handleUpdateData()}>
        Continue
      </div>
    </div>
  );
}

export default AuthFullData;
