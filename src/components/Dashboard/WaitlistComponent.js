import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/WaitlistDashboard/waitlistComponent.module.scss";
import Fb from "..//SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";
import LinkedIN from "../SVGcomponents/LinkedInSvg";

const WaitlistComponent = ({ email, waitNum }) => {
  return (
    <div className={styles.cover}>
      <p className={styles.heading}>{`#${waitNum}`}</p>
      <div className={styles.restBlock}>
        <p className={styles.restName}>Your current waiting list number</p>
        <p className={styles.restNameSub}>
          To stay up to date at all times, follow us on.
        </p>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          <a
            href="https://www.instagram.com/upsurge.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          <a
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.socialyt} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WaitlistComponent;
