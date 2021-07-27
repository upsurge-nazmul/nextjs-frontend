import React from "react";
import styles from "../../styles/Home/join.module.scss";

function JoinUs() {
  return (
    <section className={styles.joinSection}>
      <div className={`${styles.doodle} ${styles.dl1}`}>
        <img
          src="https://images.unsplash.com/photo-1595366266798-9752bd56c375?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.doodle} ${styles.dl3}`} />
      <div className={`${styles.doodle} ${styles.dl4}`}>
        <img
          src="https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl5}`} />

      <div className={`${styles.doodle} ${styles.dr1}`}>
        <img
          src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dr2}`} />
      <div className={`${styles.doodle} ${styles.dr3}`} />
      <div className={`${styles.doodle} ${styles.dr4}`} />
      <div className={styles.textContent}>
        <div className={styles.heading}>
          Join the{" "}
          <span className={styles.highlight}>
            club <div className={styles.underline}></div>
          </span>
        </div>
        <p className={styles.subheading}>
          Upsurge is free to use for families of any size. We also offer paid
          plans with additional features, live classes and priorirty support.
        </p>
        <div className={styles.button}>Enroll your kid for free</div>
      </div>
    </section>
  );
}

export default JoinUs;
