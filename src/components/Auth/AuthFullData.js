import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { setCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Auth/auth.module.scss";
import ReactTooltip from "react-tooltip";
import validator from "validator";
import { MainContext } from "../../context/Main";
import CircleTick from "../SVGcomponents/CircleTick";
import CircleWarning from "../SVGcomponents/CircleWarning";
import { useRouter } from "next/dist/client/router";
import Spinner from "../Spinner";
import { onlyText } from "../../helpers/validationHelpers";
function AuthFullData({
  setphone,
  setpassword,
  phone,
  password,
  settoastdata,
  mode,
  setmode,
  email,
  signupmethod,
  usertype,
  username,
  setusername,
  seterror,
  error,
}) {
  const { firstName, setfirstName, lastName, setlastName, setuserdata } =
    useContext(MainContext);
  const [passisweak, setpassisweak] = useState(false);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
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
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);

  useEffect(() => {
    seterror("");
  }, [password, username, firstName, phone, mode]);

  async function handleUpdateData() {
    setloading(true);

    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
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
    if (passisweak) {
      seterror(
        "Password must be of length 8 and also must contain minimum 1 number,1 symbol,1 uppercase,1 lowercase"
      );
      setloading(false);
      return;
    }
    if (!firstName || !password) {
      seterror("FirstName is required");
      setloading(false);
      return;
    }
    let response = await LoginApis.signup({
      email: email,
      signup_method: signupmethod,
      user_type: usertype,
      phone,
      password,
      username: username,
      first_name: firstName,
      last_name: lastName,
    });

    if (!response || !response.data.success) {
      setloading(false);
      seterror(response.data.message || "Error connecting to server");
    } else {
      if (signupmethod === "email") {
        LoginApis.sendverificationemail();
      }
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      setuserdata(response.data.data.profile);
      setCookie("accesstoken", response.data.data.token);
      setmode("otp");
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
    if (username.length > 20) {
      seterror("Username cannot contain more than 20 characters");
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
    if (!lastName) {
      seterror("Last name is required");
      setloading(false);
      return;
    }
    let response = await LoginApis.signup({
      email: email,
      signup_method: signupmethod,
      user_type: usertype,
      phone,
      password,
      username,
      first_name: firstName,
      last_name: lastName,
    });

    if (!response || !response.data.success) {
      seterror(response.data.message || "Error connecting to server");
    } else {
      if (mode === "otp") {
        settoastdata({ type: "success", msg: "OTP sent", show: true });
      }
      setCookie("accesstoken", response.data.data.token);
      setmode("otp");
    }
    setloading(false);
  }
  function validatePassword(e) {
    let pass = e.target.value.trim();
    setpassword(pass);
    let res = {
      length: checkLength(pass),
      lower: checkLower(pass),
      upper: checkUpper(pass),
      special: checkSpecial(pass),
      number: checkNumber(pass),
    };
    setpasserror(res);
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
  return (
    <div
      className={styles.email}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleUpdateData();
        }
      }}
    >
      <div className={styles.phoneWrapper}>
        <p>+91</p>{" "}
        <input
          type="text"
          placeholder="Phone"
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
          placeholder="First Name"
          maxLength={10}
          value={firstName}
          onChange={(e) => {
            setfirstName(onlyText(e.target.value));
          }}
        />
        <input
          maxLength={10}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setlastName(onlyText(e.target.value));
          }}
        />
      </div>
      <input
        type="text"
        placeholder="Username"
        // maxLength={8}
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      {password !== "" && passisweak && (
        <>
          <p data-tip data-for="weak-pass" className={styles.weakpasstext}>
            Weak password
          </p>
          <ReactTooltip id="weak-pass" type="dark" effect="solid">
            <p>A strong pass is :</p>
            <p>- At least 8 characters</p>
            <p>- A mixture of letters and numbers</p>
            <p>- A mixture of both uppercase and lowercase letters</p>
            <p>- Inclusion of at least one special character</p>
          </ReactTooltip>
        </>
      )}
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
        <input
          type={passhidden ? "password" : "text"}
          onFocus={() => setshowdetailpass(true)}
          onBlur={() => setshowdetailpass(false)}
          placeholder="Password"
          value={password}
          className={password !== "" && passisweak ? styles.weakpass : ""}
          onChange={validatePassword}
        />
        <p className={styles.show} onClick={() => setpasshidden(!passhidden)}>
          {passhidden ? "Show" : "Hide"}
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {!loading ? (
        <div className={`${styles.button}`} onClick={genotp}>
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

export default AuthFullData;
