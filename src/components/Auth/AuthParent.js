import React, { useState } from "react";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";

function AuthParent({
  setsignupmethod,
  settoastdata,
  usertype,
  setmode,
  setemail,
  email,
}) {
  async function handleParentSignUp(email, method) {
    if (!validator.isEmail(email)) {
      settoastdata({
        show: true,
        msg: "Enter valid email address",
        type: "error",
      });
      return;
    }

    if (method === "email") {
      let emailcheckresponse = await LoginApis.checkemail({ email: email });
      if (
        emailcheckresponse &&
        emailcheckresponse.data &&
        !emailcheckresponse.data.success
      )
        setmode("email");
      else
        settoastdata({
          show: true,
          msg: emailcheckresponse.data.message,
          type: "error",
        });
      return;
    }
    // temp changes
    let response = await LoginApis.signup({
      email: email,
      signup_method: method,
      user_type: usertype,
    });

    if (!response.data.success) {
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "error",
      });
    } else {
      setCookie("accesstoken", response.data.data.token);
      setmode("email");
    }
    // axios
    //   .post(SIGNUP_URL, {
    //     email: email,
    //     signup_method: method,
    //     user_type: usertype,
    //   })
    //   .then((result) => {
    //
    //   });
  }
  return (
    <div className={styles.parent}>
      <div
        className={styles.google}
        onClick={() => {
          setemail("randomgoogleid@gmail.com");
          setsignupmethod("google");
          handleParentSignUp("randomgoogleid@gmail.com", "google");
        }}
      >
        <img src={google.src} alt="" />
        <p>Continue with Google</p>
      </div>
      <div
        className={styles.apple}
        onClick={() => {
          setemail("randomappleid@apple.com");
          setsignupmethod("apple");
          handleParentSignUp("randomappleid@apple.com", "apple");
        }}
      >
        <img src={apple.src} alt="" />
        <p>Continue with Apple</p>
      </div>
      <div className={styles.or}>OR</div>
      <input
        type="text"
        placeholder="Username/Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div
        className={styles.button}
        onClick={() => {
          setsignupmethod("email");
          handleParentSignUp(email, "email");
        }}
      >
        Continue
      </div>
    </div>
  );
}

export default AuthParent;
