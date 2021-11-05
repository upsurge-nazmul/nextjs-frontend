import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styles from "../styles/GeneralComponents/waitinglistcta.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import Jasper from "./SVGcomponents/Jasper";
export default function WaitingListCta() {
  const router = useRouter();
  const [show, setshow] = useState(false);
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
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
  return (
    <div className={styles.waitinglist}>
      {show && (
        <div className={styles.popup}>
          <div
            className={styles.background}
            onClick={() => setshow(false)}
          ></div>
          <div className={styles.main}>
            <Jasper className={styles.jasper} />

            <div className={styles.data}>
              {error && <p className={styles.error}>{error}</p>}
              <p className={styles.heading}>Join the Waiting List</p>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
                placeholder="Enter your email"
              />
              <div className={styles.buttons}>
                <div className={styles.skip} onClick={() => setshow(false)}>
                  Skip
                </div>
                <div className={styles.join} onClick={handleSignup}>
                  Join
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.left}>
        <img
          src="https://i.ibb.co/rstCXKx/rupixen-com-5lw6-CLBZl-Cg-unsplash.png"
          alt=""
        />
      </div>

      <div className={styles.midflex}>
        <p>Want your kids to be financially independent?</p>
        <p>Join the Upsurge platform today.</p>
      </div>
      <div className={styles.right}>
        <img
          className={styles.background}
          src="https://i.ibb.co/94m1jJg/unsplash-ROQz-KIAd-Y78.png"
          alt=""
        ></img>
        <div className={styles.text}>
          <p>
            <span style={{ cursor: "pointer" }} onClick={() => setshow(true)}>
              Click here
            </span>{" "}
            to join the
          </p>
          <p>Upsurge waiting list.</p>
        </div>
      </div>
    </div>
  );
}
