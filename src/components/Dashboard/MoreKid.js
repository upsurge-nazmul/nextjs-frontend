import { useRouter } from "next/dist/client/router";
import React from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import noKidSvg from "../../assets/nokid.png";
import styles from "../../styles/Dashboard/nokid.module.scss";

export default function MoreKid({ kids }) {
  const router = useRouter();
  return (
    <div className={styles.morekid}>
      <div className={styles.morekidtextContent}>
        <p className={styles.morekidheading}>Add a Child to explore upsurge.</p>
        <p className={styles.morekidsubheading}>
          Click “Add a child” to create a new account for your child or connect
          to an existing account.
        </p>
        <div
          className={styles.morekidbutton}
          onClick={() => router.push("/dashboard/p/child/add")}
        >
          You can add {5 - kids} more kids.
        </div>
      </div>
      <img src={noKidSvg.src} alt="" />
    </div>
  );
}
