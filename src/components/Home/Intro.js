import React, { useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/intro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import IntroSvg from "../SVGcomponents/IntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";
import { useRouter } from "next/dist/client/router";
import Curve2 from "../SVGcomponents/Curve2";
import WaitlistPopUp from "../WaitlistPopUp";

function Intro({ setshowauth, setauthmode, setmailfromhome }) {
  const [email, setemail] = useState("");
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const router = useRouter();
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  async function handleSignup(e) {
    e.preventDefault();
    setshowwaitlistblock(true);
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
      <Curve2 className={styles.curve} />
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setemail}
          setshowpopup={setshowwaitlistblock}
          showpopup={showwaitlistblock}
          settoastdata={settoastdata}
        />
      )}
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>Money, made easy.</div>

        <div className={styles.subheading}>
          upsurge is a movement to kickstart a financial literacy &
          entrepreneurship revolution amongst the Gen-Z, by making learning fun
          and rewarding.
        </div>
        <div className={styles.button} onClick={handleSignup}>
          {"Get early access"}
        </div>
        {/* <p className={styles.checkwaiting} onClick={check}>
          Check your waitlist number
        </p> */}
      </div>
      <IntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default Intro;
