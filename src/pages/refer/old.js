import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import styles from "../../styles/refer/refer.module.scss";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import Toast from "../../components/Toast";
import validator from "validator";
import { onlyNum } from "../../helpers/validationHelpers";

export default function ReferPage() {
  const router = useRouter();
  const { id } = router.query;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
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
  async function checkrefer() {
    if (!username) {
      seterror("Username is required");
      return;
    }
    if (username.length > 20) {
      seterror("Username cannot contain more than 20 characters");
      return;
    }
    if (username.length < 4) {
      seterror("Username cannot contain less than 4 characters");
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      settoastdata({
        show: true,
        msg: "Please enter valid phone number",
        type: "error",
      });
      return;
    }

    const res = await LoginApis.refersignup({
      refid: id,
      firstName,
      lastName,
      phone,
      username,
    });

    if (res && res.data && res.data.success) {
      router.push("/generatepass/" + res.data.data);
    } else {
      settoastdata({
        show: true,
        msg: res.data.message || "Error connecting to server",
        type: "error",
      });
    }
  }
  return (
    <div className={styles.referPage}>
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
          {success ? "Thank You!" : "Welcome to upsurge!"}
        </p>
        <div className={styles.line}></div>
        <p className={styles.heading2}>
          {success
            ? "Your login credentials have been sent to your email address."
            : "We require some details"}
        </p>

        {!success && (
          <div className={styles.name}>
            <input
              type="text"
              placeholder="First name*"
              onChange={(e) => setfirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        )}
        {!success && (
          <div className={styles.name}>
            <input
              type="text"
              placeholder="Username*"
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone*"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                if (onlyNum(e.target.value)) {
                  setphone(e.target.value);
                }
              }}
            />
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {!success && (
          <div className={styles.join} onClick={checkrefer}>
            Join
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
            href="https://www.instagram.com/upsurge.in/"
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
