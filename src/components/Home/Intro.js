import React, { useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/intro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import IntroSvg from "../SVGcomponents/IntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";

function Intro({ setshowauth, setauthmode, setmailfromhome }) {
  const [email, setemail] = useState("");
  const [showinput, setshowinput] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  async function handleSignup() {
    if (!validator.isEmail(email)) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid email address",
      });
    } else {
      let response = await LoginApis.saveemail({ email: email });
      if (response) {
        if (response.data.success) {
          settoastdata({
            show: true,
            type: "success",
            msg: response.data.message,
          });
        } else {
          settoastdata({
            show: true,
            type: "error",
            msg: response.data.message,
          });
        }
      } else {
        settoastdata({
          show: true,
          type: "error",
          msg: "Error connecting to server",
        });
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
        <div className={styles.signupBox}>
          {showinput && (
            <input
              type="text"
              placeholder="parent@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          )}
          <div
            className={showinput ? styles.button : styles.joinButton}
            onClick={!showinput ? () => setshowinput(true) : handleSignup}
          >
            Join the Waitlist
          </div>
        </div>
      </div>
      <IntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default Intro;
