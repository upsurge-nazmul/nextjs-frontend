import React, { useState } from "react";
import styles from "../../styles/Home/join.module.scss";

function JoinUs() {
  const [showinput, setshowinput] = useState(false);
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
        <div className={styles.heading}>Subscribe to upsurge Newsletter.</div>
        <p className={styles.subheading}>
          Get all the information related to Financial Literacy
        </p>
        <div className={styles.emailwrapper}>
          {showinput && (
            <input className={styles.email} type="email" placeholder="Email" />
          )}
          <div
            onClick={() => setshowinput(true)}
            className={`${styles.button} ${
              !showinput ? styles.normalbutton : null
            }`}
          >
            Subscribe
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinUs;
