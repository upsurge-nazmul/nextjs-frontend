import React, { useContext, useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/intro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import IntroSvg from "../SVGcomponents/IntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";
import { useRouter } from "next/dist/client/router";
import Curve2 from "../SVGcomponents/Curve2";
import WaitlistPopUp from "../WaitlistPopUp";
import Spinner from "../Spinner";
import { MainContext } from "../../context/Main";

function Intro({ setshowauth, setauthmode, setmailfromhome, setshowpopup }) {
  const { userdata, setuserdata } = useContext(MainContext);
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const router = useRouter();
  async function check(e) {
    e?.preventDefault();
    setloading(true);
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
      setloading(false);
    } else {
      let checkemail = await LoginApis.checkemail({ email, waitlist: true });
      if (checkemail && checkemail.data && !checkemail.data.success) {
        setshowpopup(true);
        // setauthmode("email");
        setmailfromhome(email);
      } else {
        seterror(checkemail?.data.message || "Error connecting to server");
      }
      setloading(false);
    }
  }
  return (
    <section className={styles.intro}>
      <Curve2 className={styles.curve} />
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>Money, made easy.</div>

        <div className={styles.subheading}>
          {`upsurge is India’s first gaming platform for children, focused on promoting entrepreneurship, financial literacy & modern skills using games, immersive knowledge quests & real rewards!`}
        </div>
        <p className={styles.error}>{error}</p>
        {userdata ? (
          <div
            className={styles.gotobutton}
            onClick={() => {
              if (userdata) {
                if (userdata.waitlist_active) {
                  router.push("/dashboard/w");
                } else if (userdata.user_type === "parent") {
                  router.push("/dashboard/p");
                } else {
                  router.push("/dashboard/k");
                }
                return;
              }
            }}
          >
            Go to dashboard
          </div>
        ) : (
          <div className={`${styles.signupBox} ${error && styles.errsignbox}`}>
            <form onSubmit={(e) => check(e)}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  seterror("");
                  setemail(e.target.value.trim());
                }}
              />
            </form>
            {!loading ? (
              <div className={`${styles.button}`} onClick={check}>
                Join early access
              </div>
            ) : (
              <div className={`${styles.button} ${styles.spinner_btn}`}>
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
      <IntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default Intro;
