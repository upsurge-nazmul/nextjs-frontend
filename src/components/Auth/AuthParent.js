import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import styles from "../../styles/Auth/auth.module.scss";
import { setCookie } from "../../actions/cookieUtils";
import GoogleSvg from "../SVGcomponents/GoogleSvg";
import GoogleLogin from "react-google-login";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/dist/client/router";
import Spinner from "../Spinner";

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
  const router = useRouter();
  const [loading, setloading] = useState(false);

  async function handleSignup(e) {
    e?.preventDefault();
    setloading(true);
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      mixpanel.add_group("user_group", "early_access");
      mixpanel.track("Email entered for Signup", {
        event: `${email} Email entered`,
        email: `${email}`,
      });
      mixpanel.identify(`${email}`);
      mixpanel.people.set({ $email: email });
      dataLayer.push({ event: "Email-entered" });
      setmode("parentChild");

      // let checkemail = await LoginApis.checkemail({ email, waitlist: true });
      // if (checkemail && checkemail.data && !checkemail.data.success) {
      // } else {
      //   seterror(checkemail?.data.message || "Error connecting to server");
      // }

      // let response = await LoginApis.saveemail({ email: email });
      // if (response) {
      //   if (response.data.success) {
      //     router.push("/waitlist/" + email);
      //   } else {
      //     seterror(response.data.message);
      //   }
      // } else {
      //   seterror("Error connecting to server");
      // }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
    setloading(false);
  }

  async function handleParentSignUp(email, method) {
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
      return;
    }

    if (method === "email") {
      let emailcheckresponse = await LoginApis.checkemail({
        email: email,
        waitlist: true,
      });
      if (
        emailcheckresponse &&
        emailcheckresponse.data &&
        !emailcheckresponse.data.success
      )
        setmode("parentChild");
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
      setmode("parentChild");
    }
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
        setmode("parentChild");
      } else seterror(emailcheckresponse.data.message || "Cannot reach server");
      return;
    }
  }

  async function handleAppleAuth(data) {}

  useEffect(() => {
    seterror("");
  }, [email]);
  return (
    <div
      className={styles.parent}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSignup();
        }
      }}
    >
      {/* <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GC_CLIENT_ID}
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
        clientId={NEXT_PUBLIC_APPLE_CLIENT_ID || "asd"}
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
      <div className={styles.or}>OR</div> */}
      <input
        type="text"
        placeholder="Parent's email address"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}

      {!loading ? (
        <div className={`${styles.button}`} onClick={handleSignup}>
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

export default AuthParent;
