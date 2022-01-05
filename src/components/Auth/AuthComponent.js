import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import AuthHeader from "./AuthHeader";
import AuthLogin from "./AuthLogin";
import AuthPrivacy from "./AuthPrivacy";
import AuthSelection from "./AuthSelection";
import AuthLearner from "./AuthLearner";
import AuthParent from "./AuthParent";
import AuthFullData from "./AuthFullData";
import AuthResetPass from "./AuthResetPass";
import AuthPhone from "./AuthPhone";
import AuthOtpComponent from "./AuthOtpComponent";
import styles from "../../styles/Auth/auth.module.scss";
import { MainContext } from "../../context/Main";

function AuthComponent({ showauth, setshowauth, authmode, mailfromhome }) {
  //there will be 4 modes -> login, selection, parent,learner,email,phone,otp
  const { setfirstName, setlastName } = useContext(MainContext);
  const [userdata, setuserdata] = useState(null);
  const [mode, setmode] = useState("login");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [usertype, setusertype] = useState("parent");
  const [username, setusername] = useState("");
  const [signupmethod, setsignupmethod] = useState("email");
  const [error, seterror] = useState(null);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    if (!showauth) {
      setmode("login");
      setemail("");
      setpassword("");
      setphone("");
      setfirstName("");
      setlastName("");
      setsignupmethod("email");
    }
  }, [showauth]);

  useEffect(() => {
    if (!authmode) return;
    setmode(authmode);
    if (mailfromhome) {
      setemail(mailfromhome);
    }
  }, [authmode, mailfromhome]);
  //for back button in auth
  function handleBack() {
    if (mode === "learner" || mode === "parent") {
      setmode("login");
    } else if (mode === "phone" || mode === "email" || mode === "otp") {
      setmode("parent");
    } else {
      setmode("login");
    }
  }

  return (
    <div className={styles.auth}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showauth ? (
          <div className={styles.authContentWrapper}>
            <div
              className={styles.background}
              onClick={() => {
                if (mode !== "privacy") setshowauth(false);
              }}
            ></div>
            <div
              className={`${styles.authcontainer} ${
                mode === "login" ? styles.loginAuth : ""
              } ${mode === "selection" ? styles.signupAuth : ""} ${
                mode === "learner" ? styles.learnerAuth : ""
              } ${mode === "privacy" ? styles.privacyAuth : ""} ${
                mode === "parent" ? styles.parentAuth : ""
              }`}
            >
              {mode !== "privacy" ? (
                <AuthHeader
                  setmode={setmode}
                  handleBack={handleBack}
                  mode={mode}
                />
              ) : null}

              {mode === "login" ? (
                <AuthLogin
                  settoastdata={settoastdata}
                  setmode={setmode}
                  error={error}
                  seterror={seterror}
                />
              ) : mode === "selection" ? (
                <AuthSelection setmode={setmode} setusertype={setusertype} />
              ) : mode === "learner" ? (
                <AuthLearner />
              ) : mode === "parent" ? (
                <AuthParent
                  settoastdata={settoastdata}
                  usertype={usertype}
                  setmode={setmode}
                  error={error}
                  setemail={setemail}
                  seterror={seterror}
                  email={email}
                  setsignupmethod={setsignupmethod}
                />
              ) : mode === "email" ? (
                <AuthFullData
                  email={email}
                  settoastdata={settoastdata}
                  setmode={setmode}
                  phone={phone}
                  setphone={setphone}
                  error={error}
                  password={password}
                  seterror={seterror}
                  setpassword={setpassword}
                  signupmethod={signupmethod}
                  usertype={usertype}
                  username={username}
                  setusername={setusername}
                />
              ) : mode === "phone" ? (
                <AuthPhone
                  phone={phone}
                  setphone={setphone}
                  error={error}
                  setmode={setmode}
                  seterror={seterror}
                />
              ) : mode === "otp" ? (
                <AuthOtpComponent
                  phone={phone}
                  error={error}
                  email={email}
                  password={password}
                  seterror={seterror}
                  setuserdata={setuserdata}
                  settoastdata={settoastdata}
                  setmode={setmode}
                  username={username}
                  setusername={setusername}
                />
              ) : mode === "privacy" ? (
                <AuthPrivacy setmode={setmode} />
              ) : mode === "reset" ? (
                <AuthResetPass
                  settoastdata={settoastdata}
                  usertype={usertype}
                  setmode={setmode}
                  error={error}
                  setemail={setemail}
                  seterror={seterror}
                  email={email}
                  setsignupmethod={setsignupmethod}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default AuthComponent;
