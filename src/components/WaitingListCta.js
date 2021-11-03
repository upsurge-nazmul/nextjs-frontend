import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../styles/GeneralComponents/waitinglistcta.module.scss";

export default function WaitingListCta() {
  const router = useRouter();
  return (
    <div className={styles.waitinglist}>
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
            <span
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
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
