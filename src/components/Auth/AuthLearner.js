import React from "react";
import Mascot from "../../assets/mascot.svg";
import styles from "../../styles/Auth/auth.module.scss";

function AuthLearner() {
  return (
    <div className={styles.learner}>
      <div className={styles.top}>
        <div className={styles.left}>
          <p>Howdy</p>
          <h1>learner</h1>
        </div>
        <img src={Mascot.src} className={styles.mascot} alt="" />
      </div>
      <div className={styles.bottom}>
        <p>We currently only allow parents to sign up and add their kids.</p>
        <h1>Please ask your parent to create an account for you.</h1>
      </div>
    </div>
  );
}

export default AuthLearner;
