import React, { useContext, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/Home/intro.module.scss";
import IntroSvg from "../SVGcomponents/IntroSvg";
import { useRouter } from "next/dist/client/router";
import Spinner from "../Spinner";
import { MainContext } from "../../context/Main";
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
    setshowauth(true);
    setauthmode("parent");
  }
  return (
    <section
      className={`${styles.intro} ${theme === "dark" && styles.intro_dark}`}
    >
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <h1 className={styles.heading}>
          Games that<br /> make you
          <br />
          <div className={styles.slidingVertical}>
            <span className={styles.funBrandCol1}>money-smart.</span>
            <span className={styles.funBrandCol2}>entrepreneurial.</span>
            <span className={styles.funBrandCol3}>future-ready.</span>
          </div>
        </h1>
        <h1 className={styles.subheading}>
          {`upsurge is the ultimate GenZ gaming hub where you play and win in life!`}
        </h1>
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
                  Sign up for FREE
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
      {/* <BallsSvg className={styles.ballsvg} /> */}
    </section>
  );
}

export default Intro;
