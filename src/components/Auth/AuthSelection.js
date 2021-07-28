import React from "react";
import styles from "../../styles/Auth/auth.module.scss";

function AuthSelection({ setmode, setusertype }) {
  return (
    <div className={styles.selection}>
      <div
        className={styles.option}
        onClick={() => {
          setmode("learner");
          setusertype("child");
        }}
      >
        <p> I'm a </p>
        <h1> Learner</h1>
      </div>
      <div
        className={styles.option}
        onClick={() => {
          setusertype("parent");
          setmode("parent");
        }}
      >
        <p> I'm a </p>
        <h1> Parent</h1>
      </div>
    </div>
  );
}

export default AuthSelection;
