import React, { useState, useEffect } from "react";
import validator from "validator";
import ModernInputBox from "../ModernInputBox";
import Spinner from "../Spinner";
import CircleTick from "../SVGcomponents/CircleTick";
import CircleWarning from "../SVGcomponents/CircleWarning";
import ParentSignupOtp from "./ParentSignupOtp";
import styles from "../../styles/WaitlistDashboard/parentlogin.module.scss";
import DashboardApis from "../../actions/apis/DashboardApis";
import OnboardingParent from "../OnboardingParent";

function AuthAddParent({ parentEmail, childId, settoastdata }) {
  const [passisweak, setpassisweak] = useState(false);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [error, seterror] = useState(null);
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  const [confirmPasserror, setConfirmPasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  const [showConfirmDetailPass, setShowConfirmDetailPass] = useState(false);
  const [confirmPassHidden, setConfirmPassHidden] = useState(true);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [userName, setuserName] = useState("");
  const [lastName, setlastName] = useState("");
  const [newParentData, setNewParentData] = useState();

  useEffect(() => {
    setemail(parentEmail);
  }, []);
  useEffect(() => {
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);
  function validatePassword(e, type = "normal") {
    if (type === "confirm") {
      let pass = e.target.value.trim();
      setconfirmpassword(pass);
      let res = {
        length: checkLength(pass),
        lower: checkLower(pass),
        upper: checkUpper(pass),
        special: checkSpecial(pass),
        number: checkNumber(pass),
      };
      console.log(res);
      setConfirmPasserror(res);
    } else {
      let pass = e.target.value.trim();
      setpassword(pass);
      let res = {
        length: checkLength(pass),
        lower: checkLower(pass),
        upper: checkUpper(pass),
        special: checkSpecial(pass),
        number: checkNumber(pass),
      };
      console.log(res);
      setpasserror(res);
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

  async function addParent() {
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    if (!userName) {
      seterror("User name is required");
      return;
    }
    if (firstName.length < 2) {
      seterror("First name should be more than 1 character");
      return;
    }
    if (userName.length < 2) {
      seterror("Username should be more than 1 character");
      return;
    }
    if (email && !validator.isEmail(email)) {
      seterror("Please enter valid email");
      return;
    }
    if (!password) {
      seterror("Password is required");
      return;
    }
    if (passisweak) {
      seterror("Weak password");
      return;
    }
    if (!confirmpassword) {
      seterror("Password re-enter password");
      return;
    }
    if (password !== confirmpassword) {
      seterror("Passwords do not match.");
      return;
    }
    let data = {
      firstName,
      lastName,
      username: userName,
      email: email,
      password,
      child_id: childId,
    };
    let response = await DashboardApis.updateparent(data);
    if (response && response.data && response.data.success) {
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      setOtpSent(true);
      setNewParentData(response.data.data);
    } else {
      seterror(response?.data.message || "Cannot reach server");
      setloading(false);
    }
  }
  const [showOnboarding, setShowOnboarding] = useState(true);
  return (
    <>
      {otpSent ? (
        <div>
          {showOnboarding ? (
            <OnboardingParent
              setOpen={setShowOnboarding}
              actionHandler={() => {
                setShowOnboarding(false)
              }}
            />
            ) :("")
          }
          <ParentSignupOtp parentData={newParentData} />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.heading}>
            <div className={styles.title}>Parent Account Setup</div>
            <div className={styles.subtitle}>
              Please provide your basic info and set a password for your parent account
            </div>
          </div>
          <div
            className={styles.logindetails}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addParent();
              }
            }}
          >
            <div className={styles.nameWrapper}>
              <ModernInputBox
                value={firstName}
                maxLength={100}
                setvalue={setfirstName}
                textOnly={true}
                placeholder="Parent's First name *"
                extraclass={styles.margin}
              />
              <ModernInputBox
                value={lastName}
                textOnly={true}
                maxLength={100}
                setvalue={setlastName}
                placeholder="Parent's Last name"
              />
            </div>
            <ModernInputBox
              value={userName}
              maxLength={100}
              setvalue={setuserName}
              placeholder="Parent's Username *"
              extraclass={styles.margin}
            />
            <div className={styles.passwordBoxes}>
              <div className={styles.passwordBox}>
                {showdetailpass && (
                  <div className={styles.detailPass}>
                    <div className={styles.arrow}></div>
                    <div className={styles.tab}>
                      {passerror.length ? <CircleTick /> : <CircleWarning />}
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
                      {passerror.special ? <CircleTick /> : <CircleWarning />}
                      <p className={styles.text}>Special Character </p>
                    </div>
                    <div className={styles.tab}>
                      {passerror.number ? <CircleTick /> : <CircleWarning />}
                      <p className={styles.text}>Number</p>
                    </div>
                  </div>
                )}
                <ModernInputBox
                  value={password}
                  onBlur={() => setshowdetailpass(false)}
                  onChange={(e) => validatePassword(e)}
                  onFocus={() => {
                    setShowConfirmDetailPass(false);
                    setshowdetailpass(true);
                  }}
                  placeholder="Password *"
                  secure={passhidden}
                  extrastyle={{ marginBottom: "0px" }}
                  extraclass={
                    password !== "" && passisweak ? styles.weakpass : ""
                  }
                />
                <p
                  className={styles.show}
                  onClick={() => setpasshidden(!passhidden)}
                >
                  {passhidden ? "Show" : "Hide"}
                </p>
              </div>
              <div className={styles.passwordBox}>
                {showConfirmDetailPass && (
                  <div className={styles.detailPass}>
                    <div className={styles.arrow}></div>
                    <div className={styles.tab}>
                      {confirmPasserror.length ? (
                        <CircleTick />
                      ) : (
                        <CircleWarning />
                      )}
                      <p className={styles.text}>8 Characters long</p>
                    </div>
                    <div className={styles.tab}>
                      {confirmPasserror.upper ? (
                        <CircleTick />
                      ) : (
                        <CircleWarning />
                      )}
                      <p className={styles.text}>Uppercase letter</p>
                    </div>
                    <div className={styles.tab}>
                      {confirmPasserror.lower ? (
                        <CircleTick />
                      ) : (
                        <CircleWarning />
                      )}
                      <p className={styles.text}>Lowercase letter</p>
                    </div>
                    <div className={styles.tab}>
                      {confirmPasserror.special ? (
                        <CircleTick />
                      ) : (
                        <CircleWarning />
                      )}
                      <p className={styles.text}>Special Character </p>
                    </div>
                    <div className={styles.tab}>
                      {confirmPasserror.number ? (
                        <CircleTick />
                      ) : (
                        <CircleWarning />
                      )}
                      <p className={styles.text}>Number</p>
                    </div>
                  </div>
                )}
                <ModernInputBox
                  value={confirmpassword}
                  onBlur={() => setShowConfirmDetailPass(false)}
                  onChange={(e) => validatePassword(e, "confirm")}
                  onFocus={() => {
                    setshowdetailpass(false);
                    setShowConfirmDetailPass(true);
                  }}
                  placeholder="Confirm Password *"
                  secure={confirmPassHidden}
                  extrastyle={{ marginBottom: "0px" }}
                  extraclass={
                    confirmpassword !== "" && passisweak ? styles.weakpass : ""
                  }
                />
                <p
                  className={styles.show}
                  onClick={() => setConfirmPassHidden(!confirmPassHidden)}
                >
                  {confirmPassHidden ? "Show" : "Hide"}
                </p>
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {!loading ? (
              <div className={`${styles.button}`} onClick={addParent}>
                Confirm
              </div>
            ) : (
              <div className={`${styles.button} ${styles.spinner_btn}`}>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default AuthAddParent;
