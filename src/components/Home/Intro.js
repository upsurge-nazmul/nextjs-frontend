import React, { useState } from "react";
import HomeSvg from "../../assets/home.svg";
import validator from "validator";
import Toast from "../Toast";
import Image from "next/image";
import styles from "../../styles/Home/intro.module.scss";

function Intro({ setshowauth, setauthmode, setmailfromhome }) {
  const [email, setemail] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  function handleSignup() {
    if (!validator.isEmail(email)) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid email address",
      });
    } else {
      setshowauth(true);
      setauthmode("parent");
      setmailfromhome(email);
    }
  }
  return (
    <section className={styles.intro}>
      <Toast data={toastdata} />
      <div className={styles.textContent}>
        <div className={styles.heading}>
          Learning finance can be{" "}
          <span className={styles.fun}>
            fun. <div className={styles.underline}></div>
          </span>
        </div>
        <div className={styles.subheading}>
          Upsurge is a finance learning platform for 9-16 years old kids. <br />
          Start your kid’s <span className={styles.ed}>
            finance education
          </span>{" "}
          journey today.
        </div>
        <div className={styles.signupBox}>
          <input
            type="text"
            placeholder="parent@gmail.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div className={styles.button} onClick={handleSignup}>
            Sign Up for free
          </div>
        </div>
      </div>
      <img src={HomeSvg.src} className={styles.homesvg} />
      <div className={styles.ballsvg}>
        <svg
          width="365"
          viewBox="0 0 365 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="320" cy="138" r="45" fill="#4166EB" />
          <circle cx="20.5" cy="162.5" r="20.5" fill="#FF6263" />
          <circle cx="308.5" cy="73.5" r="20.5" fill="#FDCC03" />
          <path
            d="M254.744 152.744C298.087 111.729 299.974 43.343 258.959 -0.000106646L102 148.529C143.015 191.872 211.401 193.759 254.744 152.744Z"
            fill="#17D1BC"
          />
        </svg>
      </div>
      {/* 
      <div className="red"></div>
      <div className="yellow"></div>
      <div className="blue"></div> */}
    </section>
  );
}

export default Intro;
