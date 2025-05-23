import React, { useContext, useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/jodoIntro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import JodoIntroSvg from "../SVGcomponents/JodoIntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";
import { useRouter } from "next/dist/client/router";
import Curve2 from "../SVGcomponents/Curve2";
import { MainContext } from "../../context/Main";

function JodoIntro({
  setshowauth,
  setauthmode,
  setmailfromhome,
  setshowpopup,
}) {
  const { userdata, setuserdata, theme } = useContext(MainContext);
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
        // setshowpopup(true);
        setshowauth(true);
        setauthmode("");
        setauthmode("email");
        setmailfromhome(email);
      } else {
        seterror(checkemail?.data.message || "Error connecting to server");
      }
      setloading(false);
    }
  }

  const handleAction = () => {
    if (router.query.pushTo) {
      router.push(router.query.pushTo);
      return;
    }
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
    setshowauth(true);
    setauthmode("parent");
  };

  return (
    <section
      className={`${styles.intro} ${theme === "dark" && styles.intro_dark}`}
    >
      <Curve2 className={styles.curve} />
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>
          <div className={styles.bannerTitle}>partners with</div>
          <img
            className={styles.banner}
            src={require(`../../assets/partners/jodo.svg`).default.src}
            alt={"jodo"}
            loading="lazy"
          />
        </div>
        <p className={styles.subheading}>
          {`upsurge is India’s most loved platform to enable financial literacy for kids & make them MONEY-smart`}
        </p>
        <p className={styles.error}>{error}</p>
        <button className={styles.tryButton} onClick={handleAction}>
          {userdata ? "Go to Dashboard" : "Try for free"}
        </button>
      </div>

      <JodoIntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default JodoIntro;
