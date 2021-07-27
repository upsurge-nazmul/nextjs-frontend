import React, { useState } from "react";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
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
      setmode("email");
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
      localStorage.setItem("accesstoken", response.data.data.token);
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
    <div className="parent">
      <div
        className="google"
        onClick={() => {
          setemail("randomgoogleid@gmail.com");
          setsignupmethod("google");
          handleParentSignUp("randomgoogleid@gmail.com", "google");
        }}
      >
        <img src={google} alt="" />
        <p>Continue with Google</p>
      </div>
      <div
        className="apple"
        onClick={() => {
          setemail("randomappleid@apple.com");
          setsignupmethod("apple");
          handleParentSignUp("randomappleid@apple.com", "apple");
        }}
      >
        <img src={apple} alt="" />
        <p>Continue with Apple</p>
      </div>
      <div className="or">OR</div>
      <input
        type="text"
        placeholder="Username/Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div
        className="button"
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
