import React, { useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/intro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import IntroSvg from "../SVGcomponents/IntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";
import { useRouter } from "next/dist/client/router";

function Intro({ setshowauth, setauthmode, setmailfromhome }) {
  const [email, setemail] = useState("");
  const router = useRouter();
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  async function handleSignup() {
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      let response = await LoginApis.saveemail({ email: email });
      if (response) {
        if (response.data.success) {
          router.push("/waitlist/" + email);
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  async function check() {
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      let response = await LoginApis.getwaitlistdetails({ email: email });
      if (response) {
        if (response.data.success) {
          router.push("/waitlist/" + email);
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  return (
    <section className={styles.intro}>
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>Money, made simple.</div>

        <div className={styles.subheading}>
          Upsurge is a movement to kickstart a financial literacy and
          entrepreneurship revolution amongst Gen-Z, by making learning fun and
          rewarding.
        </div>
        <p className={styles.error} onClick={handleSignup}>
          {error}
        </p>
        <div className={`${styles.signupBox} ${error && styles.errsignbox}`}>
          <input
            type="text"
            placeholder="parent@gmail.com"
            value={email}
            onChange={(e) => {
              seterror("");
              setemail(e.target.value);
            }}
          />

          <div className={styles.button} onClick={handleSignup}>
            {"Join the Waitlist"}
          </div>
        </div>
        <p className={styles.checkwaiting} onClick={check}>
          Check your waitlist number
        </p>
      </div>
      <IntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default Intro;
