import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import styles from "../../styles/genpass/genpass.module.scss";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import Toast from "../../components/Toast";
import CircleTick from "../../components/SVGcomponents/CircleTick";
import validator from "validator";
import CircleWarning from "../../components/SVGcomponents/CircleWarning";
export default function GenPass() {
  const router = useRouter();
  const { id, reset } = router.query;
  const [firstName, setfirstName] = useState("");
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [confirmpasshidden, setconfirmpasshidden] = useState(true);
  const [stickyheader, setstickyheader] = useState(false);
  const [success, setsuccess] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [passisweak, setpassisweak] = useState(false);
  const [err, seterr] = useState("");
  const [password, setpassword] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  useEffect(() => {
    seterr("");
  }, [password, confirmpassword, firstName]);

  useEffect(() => {
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);
  async function checkrefer() {
    if (!password) {
      seterr("Password is required");
      return;
    }
    if (passisweak) {
      seterr(
        "Password must be of length 8 and also must contain minimum 1 number,1 symbol,1 uppercase,1 lowercase"
      );
      return;
    }
    if (password !== confirmpassword) {
      seterr("Passwords do not match");
      return;
    }
    const res = await LoginApis.generatepass({
      id: router.query.id,
      password: password,
      reset: reset ? true : false,
    });
    if (res && res.data && res.data.success) {
      setsuccess(true);
    } else {
      setsuccess(false);
      settoastdata({
        show: true,
        msg: res?.data?.message || "Error connecting to server",
        type: "error",
      });
    }
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
    <div className={styles.genpass}>
      <Header
        stickyheader={stickyheader}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <Toast data={toastdata} />

      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div>
        <p className={styles.heading3}>
          {success
            ? "Thank You!"
            : reset
            ? "Reset password"
            : "Welcome to upsurge!"}
        </p>
        <div className={styles.line}></div>
        {(!reset || success) && (
          <p className={styles.heading2}>
            {success
              ? "Your login credentials have been updated, please login."
              : "We require some details"}
          </p>
        )}

        {!success && (
          <div className={styles.name}>
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
                autoComplete="asdaasdasdwqe"
                placeholder="Password*"
                value={password}
                className={password !== "" && passisweak ? styles.weakpass : ""}
                onChange={validatePassword}
              />
              <p
                className={styles.show}
                onClick={() => setpasshidden(!passhidden)}
              >
                {passhidden ? "Show" : "Hide"}
              </p>
            </div>
            <div className={styles.passwordBox}>
              <input
                type={confirmpasshidden ? "password" : "text"}
                placeholder="Confirm Password*"
                value={confirmpassword}
                className={password !== confirmpassword ? styles.weakpass : ""}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
              <p
                className={styles.show}
                onClick={() => setconfirmpasshidden(!confirmpasshidden)}
              >
                {confirmpasshidden ? "Show" : "Hide"}
              </p>
            </div>
          </div>
        )}
        {err && <p className={styles.err}>{err}</p>}

        {!success && (
          <div className={styles.join} onClick={checkrefer}>
            {reset ? "Reset" : "Join"}
          </div>
        )}
        <p className={styles.subheading}>
          To stay up to date at all times, follow us on.
        </p>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          <a
            href="https://www.instagram.com/upsurge.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          <a
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.socialyt} />
          </a>
          {/* <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
          <YtSvg className={styles.socialyt} />
          <LinkedIN className={styles.socialyt} /> */}
        </div>
        <div className={styles.goback} onClick={() => router.push("/")}>
          Go Back
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let id = params.id;
  let linkvalid = await LoginApis.checkpasslink({ id: id });
  if (linkvalid && linkvalid.data.success) {
    return {
      props: { linkvalid: true },
    };
  } else {
    return {
      props: { linkvalid: false },
      redirect: {
        permanent: false,
        destination: "/?err=invalid-pass-link",
      },
    };
  }
}
