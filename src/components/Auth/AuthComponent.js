import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import AuthHeader from "./AuthHeader";
import AuthLogin from "./AuthLogin";
import AuthPrivacy from "./AuthPrivacy";
import AuthSelection from "./AuthSelection";
import AuthLearner from "./AuthLearner";
import AuthParent from "./AuthParent";
import AuthFullData from "./AuthFullData";
import AuthPhone from "./AuthPhone";
import AuthOtpComponent from "./AuthOtpComponent";
import styles from "../../styles/Auth/auth.module.scss";
import Spinner from "../Spinner";
import { MainContext } from "../../context/Main";
import AuthResetPass from "./AuthResetPass";
import AuthOnlyPass from "./AuthOnlyPass";
import ChangePhoneNo from "./ChangePhoneNo";
import AuthRefer from "./AuthRefer";
import Onboarding from "../Onboarding";
import ParentChildAuth from "./ParentChildAuth";
import ChosePremiumPopUp from "../ChosePremiumPopUp";
import AuthSchool from "./AuthSchool";

function AuthComponent({
  showauth,
  setshowauth,
  authmode,
  mailfromhome,
  setshowpopup,
  onlyLogin,
  prefilled = null,
  refId = null,
  type,
  premiumPrice,
  gameOpened,
  kqOpened,
  school
}) {
  //there will be 4 modes -> login, selection, parent,learner,email,phone,otp
  const { setfirstName, setlastName, theme } = useContext(MainContext);
  const [userdata, setuserdata] = useState(null);
  const [mode, setmode] = useState("login");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [childAge, setChildAge] = useState();
  const [usertype, setusertype] = useState("parent");
  const [signupmethod, setsignupmethod] = useState("email");
  const [premium_price, setPremium_price] = useState(null);
  const [error, seterror] = useState(null);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  
  const router = useRouter();
  
  useEffect(() => {
  setPremium_price(premiumPrice);
}, [premiumPrice]);
  useEffect(() => {
    if (prefilled) setmode("");
  }, [prefilled]);
  
  useEffect(() => {
    if (!showauth) {
      setmode(authmode || "login");
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
    <div className={`${mode !== "school" ? styles.auth : styles.schoolAuth} ${theme === "dark" && styles.darkauth}`}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showauth ? (
          <div className={mode !== "school" ? styles.authContentWrapper : styles.schoolAuthContainer}>
            <div
              className={mode !== "school" ? styles.background : ""}
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
              {mode !== "privacy" && mode !== "" && mode !== "school" ? (
                <AuthHeader
                  setmode={setmode}
                  handleBack={handleBack}
                  mode={mode}
                  setshowpopup={setshowpopup}
                  setshowauth={setshowauth}
                  onlyLogin={onlyLogin}
                />
              ) : null}

              {mode === "login" ? (
                <AuthLogin
                  settoastdata={settoastdata}
                  error={error}
                  setshowauth={setshowauth}
                  seterror={seterror}
                  setmode={setmode}
                  onlyLogin={onlyLogin}
                  addAccount={mailfromhome === false ? true : false}
                  mode={mode}
                  type={type}
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
              ) : mode === "parentChild" ? (
                <ParentChildAuth
                  setemail={setemail}
                  email={email}
                  settoastdata={settoastdata}
                  setmode={setmode}
                  phone={phone}
                  setphone={setphone}
                  error={error}
                  password={password}
                  seterror={seterror}
                  setusername={setusername}
                  username={username}
                  setpassword={setpassword}
                  signupmethod={signupmethod}
                  usertype={usertype}
                  premiumprice={premium_price}
                  setpremiumrice={setPremium_price}
                  setChildAge={setChildAge}
                  childAge={childAge}
                  gameOpened={gameOpened}
                  kqOpened={kqOpened}
                  school={school}
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
                  setusername={setusername}
                  username={username}
                  setpassword={setpassword}
                  signupmethod={signupmethod}
                  usertype={usertype}
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
                />
              ) : mode === "privacy" ? (
                <AuthPrivacy setmode={setmode} />
              ) : mode === "reset" ? (
                <AuthResetPass
                  error={error}
                  seterror={seterror}
                  settoastdata={settoastdata}
                  setemail={setemail}
                  email={email}
                />
              ) : mode === "changePhone" ? (
                <ChangePhoneNo
                  phone={phone}
                  setphone={setphone}
                  email={email}
                  error={error}
                  seterror={seterror}
                  settoastdata={settoastdata}
                  setmode={setmode}
                />
              ) : mode === "refer" ? (
                <AuthRefer
                  email={email}
                  setemail={setemail}
                  settoastdata={settoastdata}
                  setmode={setmode}
                  phone={phone}
                  setphone={setphone}
                  error={error}
                  password={password}
                  seterror={seterror}
                  setusername={setusername}
                  username={username}
                  setpassword={setpassword}
                  signupmethod={signupmethod}
                  usertype={usertype}
                  refId={refId}
                />
              ) 
              : mode === "premiumSub" ? (
                <ChosePremiumPopUp setmode={setmode} />
              ) 
              : mode === "school" ? (
                <AuthSchool
                setemail={setemail}
                  email={email}
                  settoastdata={settoastdata}
                  setmode={setmode}
                  phone={phone}
                  setphone={setphone}
                  error={error}
                  password={password}
                  seterror={seterror}
                  setusername={setusername}
                  username={username}
                  setpassword={setpassword}
                  signupmethod={signupmethod}
                  usertype={usertype}
                  premiumprice={premium_price}
                  setpremiumrice={setPremium_price}
                  setChildAge={setChildAge}
                  childAge={childAge}
                  gameOpened={gameOpened}
                  kqOpened={kqOpened} />
              ) 
              : mode === "onboarding" ? (
                <Onboarding
                  actionHandler={() => {
                    router.push("/dashboard/k");
                  }}
                />
              ) 
              : mode === "" && prefilled ? (
                <AuthOnlyPass
                  prefilled={prefilled}
                  settoastdata={settoastdata}
                  error={error}
                  setshowauth={setshowauth}
                  seterror={seterror}
                  setmode={setmode}
                  onlyLogin={onlyLogin}
                />
              ) : null}
              <div className={styles.authFooter}>
                {mode !== "school" &&
                mode !== "reset" &&
                  (mode === "login" ? (
                    !onlyLogin && (
                      <>
                        <p className={styles.changemode}>
                          Don&apos;t have an Account? <br />
                        </p>
                        <div
                          className={styles.button}
                          onClick={() => {
                            setmode("parentChild");
                          }}
                        >
                          Sign up
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <p className={styles.changemode}>
                        Already have an account? <br />
                      </p>
                      <div
                        className={styles.button}
                        onClick={() => setmode("login")}
                      >
                        Sign in
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default AuthComponent;
