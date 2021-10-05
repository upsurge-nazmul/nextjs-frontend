import React, { useState } from "react";
import styles from "../../styles/Home/join.module.scss";

function JoinUs() {
  const [showinput, setshowinput] = useState(false);
  return (
    <section className={styles.joinSection}>
      <div className={`${styles.doodle} ${styles.dl1}`}>
        <img src="https://i.ibb.co/yRsxh0y/Untitled-design-4.png" alt="" />
      </div>
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.doodle} ${styles.dl3}`} />
      <div className={`${styles.doodle} ${styles.dl4}`}>
        <img src="https://i.ibb.co/GtLBxMY/Untitled-design-7.png" alt="" />
      </div>
      <div className={`${styles.doodle} ${styles.dl5}`} />

      <div className={`${styles.doodle} ${styles.dr1}`}>
        <img src="https://i.ibb.co/92nwnTL/Untitled-design-6.png" alt="" />
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
          <input className={styles.email} type="email" placeholder="Email" />

          <div className={styles.button}>Subscribe</div>
        </div>
      </div>
    </section>
  );
}

export default JoinUs;
