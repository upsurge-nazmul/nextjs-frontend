import React, { useContext, useState } from "react";
import validator from "validator";
import Toast from "../Toast";
import styles from "../../styles/Home/referIntro.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import JodoIntroSvg from "../SVGcomponents/JodoIntroSvg";
import BallsSvg from "../SVGcomponents/BallsSvg";
import { useRouter } from "next/dist/client/router";
import Curve2 from "../SVGcomponents/Curve2";
import { MainContext } from "../../context/Main";
import dynamic from "next/dynamic";
import { useEffect } from "react";

function ReferIntro({
  setshowauth,
  setauthmode,
  setmailfromhome,
  setshowpopup,
  setRefId,
}) {
  const CopyContent = dynamic(
    () => import("../Dashboard/CopyClipboard").then((mod) => mod.CopyClipboard),
    { ssr: false }
  );
  const { userdata, setuserdata, theme } = useContext(MainContext);
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [classState, setClassState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router) setRefId(router.query.id);
  }, [router.query]);

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
    setauthmode("refer");
  };

  return (
    <section
      className={`${styles.intro} ${theme === "dark" && styles.intro_dark}`}
    >
      <Curve2 className={styles.curve} />
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>
          <div className={styles.refId}>
            <span className={styles.refLabel}>Referal ID:</span>{" "}
            <span className={styles.refValue}>{router.query.id}</span>
          </div>
          <div
            className={styles.textToCopy}
            onClick={() => {
              setClassState(true);
            }}
          >
            <span className={styles.textToCopyToolTip}>Click to Copy</span>
            <span
              className={classState ? styles.textToCopyToolTip : styles.none}
            >
              Copied
            </span>
            <CopyContent content={router.query.id} />
          </div>
        </div>
        <p className={styles.subheading}>
          {`More than just a financial literacy course or a school. upsurge is India's 1st gaming platform to enable financial literacy for kids & make them MONEY-smart`}
        </p>
        <p className={styles.error}>{error}</p>
        <button className={styles.tryButton} onClick={handleAction}>
          {userdata ? "Go to Dashboard" : "Sign up"}
        </button>
      </div>

      <JodoIntroSvg className={styles.homesvg} />
      <BallsSvg className={styles.ballsvg} />
    </section>
  );
}

export default ReferIntro;
