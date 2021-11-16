import React, { useContext, useEffect } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import AppleSvg from "../SVGcomponents/AppleSvg";
import GoogleLogin from "react-google-login";
import { MainContext } from "../../context/Main";
import { apple_client_id, GClientId } from "../../../config";
import AppleLogin from "react-apple-login";

function AuthParent({
  setsignupmethod,
  settoastdata,
  usertype,
  setmode,
  setemail,
  email,
  error,
  seterror,
}) {
  const { firstName, setfirstName, lastName, setlastName } =
    useContext(MainContext);
  async function handleParentSignUp(email, method) {
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
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
      else seterror(emailcheckresponse.data.message || "Cannot reach server");

      return;
    }
    // temp changes
    let response = await LoginApis.signup({
      email: email,
      signup_method: method,
      user_type: usertype,
    });

    if (!response.data.success) {
      seterror(response.data.message || "Cannot reach server");
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

  async function responsegoogle(data) {
    if (data.profileObj) {
      let emailcheckresponse = await LoginApis.checkemail({
        email: data.profileObj.email,
      });
      if (
        emailcheckresponse &&
        emailcheckresponse.data &&
        !emailcheckresponse.data.success
      ) {
        setfirstName(data.profileObj.givenName);
        setlastName(data.profileObj.familyName);
        setemail(data.profileObj.email);
        setsignupmethod("google");
        setmode("email");
      } else seterror(emailcheckresponse.data.message || "Cannot reach server");
      return;
    }
  }

  async function handleAppleAuth(data) {}

  useEffect(() => {
    seterror("");
  }, [email]);
  return (
    <div className={styles.parent}>
      <GoogleLogin
        clientId={GClientId}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={styles.google}
            // onClick={() => {
            //   setemail("randomgoogleid@gmail.com");
            //   setsignupmethod("google");
            //   handleParentSignUp("randomgoogleid@gmail.com", "google");
            // }}
          >
            <GoogleSvg />
            <p>Continue with Google</p>
          </div>
        )}
        buttonText="Login"
        onSuccess={responsegoogle}
        onFailure={responsegoogle}
        cookiePolicy={"single_host_origin"}
      />
      <AppleLogin
        clientId={apple_client_id || ""}
        redirectURI="https://redirectUrl.com"
        usePopup
        scope="name email"
        callback={handleAppleAuth}
        render={(r) => {
          console.log(r);
          return (
            <div className={styles.apple} onClick={r.onClick}>
              <AppleSvg />
              <p>Continue with Apple</p>
            </div>
          );
        }}
      />
      <div className={styles.or}>OR</div>
      <input
        type="text"
        placeholder="Username/Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}

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
