import { useRouter } from "next/dist/client/router";
import React from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import noKidSvg from "../../assets/nokid.png";
import styles from "../../styles/Dashboard/nokid.module.scss";

function NoKid({ setkids }) {
  const router = useRouter();
  return (
    <div className={styles.noKidComponent}>
      <div className={styles.noKidtextContent}>
        <p className={styles.noKidheading}>Ready to add your kid?</p>
        <p className={styles.noKidsubheading}>
          Click “Add a child” to create a new account for your child or connect
          to an existing account.
        </p>
        <p className={styles.noKidsubheading}>
          <span className={styles.link}>Learn more</span> about how to get your
          child set up
        </p>
        <div
          className={styles.noKidbutton}
          onClick={() => router.push("/addchild")}
        >
          Add a child
        </div>
      </div>
      <img src={noKidSvg.src} alt="" />
    </div>
  );
}

export default NoKid;
