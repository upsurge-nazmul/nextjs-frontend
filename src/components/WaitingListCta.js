import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styles from "../styles/GeneralComponents/waitinglistcta.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import Jasper from "./SVGcomponents/Jasper";
import WaitlistPopUp from "./WaitlistPopUp";
export default function WaitingListCta() {
  const router = useRouter();
  const [show, setshow] = useState(false);
  const [error, seterror] = useState("");
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className={styles.waitinglist}>
      <div className={styles.left}>
        <img
          src="https://i.ibb.co/rstCXKx/rupixen-com-5lw6-CLBZl-Cg-unsplash.png"
          alt=""
        />
      </div>
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setEmail}
          setshowpopup={setshowwaitlistblock}
        />
      )}
      <div className={styles.midflex}>
        <p>Want your kids to be financially independent?</p>
        <p>Join the upsurge platform today.</p>
      </div>
      <div className={styles.right}>
        <img
          className={styles.background}
          src="https://i.ibb.co/94m1jJg/unsplash-ROQz-KIAd-Y78.png"
          alt=""
        ></img>
        <div className={styles.text}>
          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setshowwaitlistblock(true)}
            >
              Click here
            </span>{" "}
            to get
          </p>
          <p>early access.</p>
        </div>
      </div>
    </div>
  );
}
