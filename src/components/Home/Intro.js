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
import InfoIcon from "@mui/icons-material/Info";
function Intro({ setshowauth, setauthmode, setmailfromhome, setshowpopup }) {
  const { userdata, setuserdata, theme } = useContext(MainContext);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const router = useRouter();
  async function signup(e) {
    e?.preventDefault();
    setloading(true);
    // setshowpopup(true);
    setshowauth(true);
    setauthmode("parent");
    setloading(false);
  }
  return (
    <section
      className={`${styles.intro} ${theme === "dark" && styles.intro_dark}`}
    >
      <Curve2 className={styles.curve} />
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <h1 className={styles.heading}>Make your child money-smart.</h1>
        <p className={styles.subheading}>
          {`More than just a financial literacy course or a school. upsurge is India’s 1st gaming platform to enable financial literacy for kids & make them MONEY-smart.
`}
        </p>
        {userdata ? (
          <div
            className={styles.gotobutton}
            onClick={() => {
              if (userdata) {
                if (userdata.is_waiting_active) {
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
          <>
            <p className={styles.error}>{error}</p>
            <div
              className={`${styles.signupBox} ${error && styles.errsignbox}`}
            >
              {!loading ? (
                <div className={`${styles.button}`} onClick={signup}>
                  {/* Join our early access by signing up */}
                  Sign Up for free
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          </>
        )}
        {/* <div
          className={`${styles.knowmore}`}
          onClick={() => router.push("/earlyaccess")}
        >
          <InfoIcon className={styles.infoicon} />
          Know more about early access
        </div> */}
      </div>

      <IntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default Intro;
