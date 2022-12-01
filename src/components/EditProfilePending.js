import React from "react";
import styles from "../../src/styles/editprofilepending/editprofilepending.module.scss";
import { useRouter } from "next/router";

function EditProfilePending() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <p className={styles.text}>Complete your profile and earn rewards</p>
      <div
        className={styles.button}
        onClick={() => router.push("/dashboard/k/editprofile")}
      >
        Edit Profile
      </div>
    </div>
  );
}

export default EditProfilePending;
