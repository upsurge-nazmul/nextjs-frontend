import React from "react";
import UniCoinSvg from "./SVGcomponents/UniCoinSvg";
import styles from "../../src/styles/editprofilepending/editprofilepending.module.scss";
import { useRouter } from "next/router";

function EditProfilePending() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.unicoins}>
          <div className={styles.coin}>
            <UniCoinSvg />
          </div>
          Earn 2500
        </div>
      <p className={styles.text}>Tell us more about you and earn bonus Unicoins!</p>
      <div
        className={styles.button}
        onClick={() => router.push("/dashboard/k/editprofile")}
      >
        Complete my Profile
      </div>
    </div>
  );
}

export default EditProfilePending;
