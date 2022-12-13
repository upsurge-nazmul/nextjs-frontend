import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../styles/GeneralComponents/waitinglistcta.module.scss";

export default function WaitingListCta() {
  const router = useRouter();

  return (
    <div className={styles.waitinglist}>
      <div className={styles.left}>
        <img
          src="https://imgcdn.upsurge.in/images/rupixen-com-5lw6-CLBZl-Cg-unsplash.png"
          alt=""
        />
      </div>

      <div className={styles.midflex}>
        <p>Want your kids to be financially independent?</p>
        <p>Join the upsurge platform today.</p>
      </div>
      <div className={styles.right} onClick={() => router.push("/pricing")}>
        <img
          className={styles.background}
          src="https://imgcdn.upsurge.in/images/unsplash-ROQz-KIAd-Y78.png"
          alt=""
        ></img>
        <div className={styles.text}>
          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/pricing")}
            >
              Click here
            </span>{" "}
            to get
          </p>
          <p> access.</p>
        </div>
      </div>
    </div>
  );
}
