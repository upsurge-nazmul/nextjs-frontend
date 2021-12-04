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
      <div className={styles.subheading}>Waitlist Number</div>
    </div>
  );
};

export default WaitlistComponent;
